---
title: "Building MagicLogger and MAGIC: A Universal Logging Standard for Color"
excerpt: "One developer's journey into building a feature-rich colorful logging library and why."
author: "Johnny Dunn"
category: "tutorials"
tags: ["typescript", "open-source", "library", "logging", "featured"]
image: "/assets/blog/tutorials/building-magiclogger/magiclogger-primary-no-subtitle-transparent-4x.png"
featured: true
---

# Building MagicLogger and MAGIC: A Universal Logging Standard for Color

<a href="https://github.com/manicinc/magiclogger" style="text-align: center" target="_blank" class="md-link">GitHub link</a>

<a href="https://magiclog.io" style="text-align: center" target="_blank" class="md-link">Website / docs link</a>

![MagicLogger Terminal demo|size=large|align=center|effect=glow|border=gradient|caption=MagicLogger Terminal demo](/assets/blog/tutorials/building-magiclogger/magiclogger-terminal-demo.gif)

## Intro / Concepts

I've been remaking high-level loggers for years, like in [Restless](https://github.com/jddunn/restless/blob/master/restless/components/utils/logger.py). The problem? Production logs lose all their color and visual hierarchy the moment they leave the console.

MagicLogger solves this with the **MAGIC schema** - a universal standard that preserves text styling across any transport or platform. When you mark something as `<red.bold>CRITICAL</>`, that semantic meaning survives serialization, network transport, and storage.

This goes against conventional wisdom. Using MagicLogger means accepting:
- Storage is cheap - a few extra KB for style metadata won't break the bank
- Production logs require human analysis, and visual hierarchy dramatically improves debugging
- Well-designed logs mean sending fewer logs overall

MagicLogger achieves competitive performance with Pino (184K ops/sec plain, 164K styled) using sonic-boom for file I/O while being reasonably larger (~40kb vs pino's 25kb).

> Built for developers who craft color-coordinated logs like art and want that experience in production.

## Features in Action

### Style Preservation Across Transports

Traditional loggers lose colors immediately:

```javascript
// Winston - colors only in console
logger.info(`User ${chalk.cyan('john@example.com')} logged in`);
// File output: "User john@example.com logged in" (no color!)

// Pino - no colors at all without pino-pretty (200KB extra!)
logger.info('Server started'); 
// Output: {"level":30,"time":1234567890,"msg":"Server started"}

// MAGICLOGGER - preserves everything
logger.error('<red.bold>CRITICAL:</> Database <yellow>MongoDB</> unreachable');
// Console: Beautifully styled
// File: {"message": "CRITICAL: Database MongoDB unreachable", 
//        "styles": [[0, 9, "red.bold"], [19, 26, "yellow"]]}
// Dashboard: Can reconstruct exact styling
```

### The MAGIC Schema

The [MAGIC schema](https://github.com/manicinc/magiclogger/blob/master/docs/magic_schema.md) separates content from presentation:

```typescript
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "info",
  "message": "Server started on port 3000",  // Plain text
  "styles": [
    [0, 14, "green.bold"],     // Style ranges
    [23, 27, "yellow"]
  ],
  "context": {
    "service": "api-gateway",
    "version": "2.1.0"
  },
  "trace": {
    "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
    "spanId": "00f067aa0ba902b7"
  }
}
```

### Performance Results

```
=== BENCHMARK RESULTS (20K iterations, real file I/O) ===
Asynchronous:
  MagicLogger:          184,196 ops/sec
  MagicLogger (Styled): 163,853 ops/sec  // Only 11% overhead!
  Pino:                 145,998 ops/sec
  Pino (Pretty):        122,875 ops/sec

Synchronous:
  MagicLogger:          115,250 ops/sec
  Winston (Styled):     101,924 ops/sec
  MagicLogger (Styled):  17,087 ops/sec  // Needs optimizing, but this use case is rare
```

MagicLogger's styled async (164K ops/sec) outperforms Pino's pretty mode (123K ops/sec).

## Architecture Challenges & Design Decisions

### The Style Extraction Algorithm

Extracting styles from `<red.bold>text</>` syntax efficiently was crucial:

```typescript
export function extractStyles(message: string): ExtractedStyles {
  const plainParts: string[] = [];
  const styleRanges: StyleRange[] = [];
  let plainTextPos = 0;
  
  const regex = /<([^>]+)>([^<]*)<\/>/g;  // Negated classes prevent backtracking
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(message)) !== null) {
    // Add plain text before match
    if (match.index > lastIndex) {
      const plainText = message.slice(lastIndex, match.index);
      plainParts.push(plainText);
      plainTextPos += plainText.length;
    }
    
    // Extract styled content
    const styles = match[1].split('.');
    const content = match[2];
    
    if (content) {
      styleRanges.push({
        start: plainTextPos,
        end: plainTextPos + content.length,
        styles
      });
      plainParts.push(content);
      plainTextPos += content.length;
    }
    
    lastIndex = regex.lastIndex;
  }
  
  // Remaining plain text
  if (lastIndex < message.length) {
    plainParts.push(message.slice(lastIndex));
  }
  
  return {
    plainText: plainParts.join(''),
    styles: styleRanges
  };
}
```

This achieves O(n) complexity through single-pass processing, array accumulation instead of string concatenation, and dual position tracking (input with tags vs output without).

### Ring Buffer for Predictable Memory

![Conceptual rendering of a circular buffer|size=medium|align=center|effect=glow|border=gradient|caption=Circular buffer - Wikipedia](https://upload.wikimedia.org/wikipedia/commons/b/b7/Circular_buffer.svg)

```typescript
export class AsyncBuffer {
  private buffer: LogEntry[] = [];
  private writeIndex = 0;
  private readonly maxSize: number;

  push(entry: LogEntry): boolean {
    if (this.size < this.maxSize) {
      this.buffer[this.writeIndex] = entry;
      this.writeIndex = (this.writeIndex + 1) % this.maxSize;
      this.size++;
      return true;
    } else {
      // Overwrite oldest entry - predictable behavior
      this.buffer[this.writeIndex] = entry;
      this.writeIndex = (this.writeIndex + 1) % this.maxSize;
      this.droppedCount++;
      return false;
    }
  }
}
```

Fixed capacity means no memory growth, O(1) writes, and predictable behavior under pressure.

### Transport-Level Batching (The AI Confusion)

Here's where even Claude Opus got confused:

> **Claude**: "You should optimize the AsyncLogger's batching mechanism with exponential backoff - when the batch fills up quickly, exponentially increase the batch size to reduce flush frequency and improve throughput..."

This sounds smart but it's architecturally wrong. Batching shouldn't even BE in the AsyncLogger - it belongs at the transport level. Different transports need completely different strategies:

- **Console**: No batching - immediate output
- **File**: sonic-boom's 4KB internal buffer  
- **HTTP**: Batch 100 logs or flush every 5 seconds
- **S3**: 10,000 logs compressed

Having ANY batching logic in AsyncLogger forces every transport into the same behavior. After correcting Claude, it immediately agreed - showing how subtle these architectural decisions are.

![Claude had the AsyncLogger architecture wrong|size=large|align=center|effect=glow|border=gradient|caption=Claude getting the batching architecture wrong](/assets/blog/tutorials/building-magiclogger/claude-getting-it-wrong.png)

## Learning & Takeaways

### Testing at Scale
We maintain [80% test coverage](https://coveralls.io/github/manicinc/magiclogger?branch=master) (enforced at 70%) with over 2000 tests. For comparison, [winston has 69%](https://coveralls.io/github/manicinc/winston?branch=master). Being TypeScript with full types is a huge differentiator.

### CI/CD Lessons
I burned through my GitHub Actions credits testing on 4 Node versions across Windows, Linux, and Mac. Worth it for confidence, expensive for learning.

![Automated GitHub actions for labelling|size=large|align=center|effect=glow|border=gradient|caption=Automated PR labelling and organization](/assets/blog/tutorials/building-magiclogger/pr-auto-labelling.png)

![Security checking with Trivy|size=large|align=center|effect=glow|border=gradient|caption=Security auditing with Trivy API](/assets/blog/tutorials/building-magiclogger/security-ci.png)

### Documentation as First-Class
We enforce JSDoc (Google style) and generate docs with TypeDoc:

![Auto-generated documentation|size=large|align=center|effect=glow|border=gradient|caption=Documentation from JSDoc docstrings](/assets/blog/tutorials/building-magiclogger/magiclogger-docs-screenshot.png)

### AI Acceleration & Pitfalls
MagicLogger took 9 months part-time with heavy AI pair programming (Claude, GPT-4). The acceleration was real - probably 2-2.5x faster. But AI also introduces subtle bugs that sound right but aren't, like the batching confusion above.

![Sourcery PR analysis|size=large|align=center|effect=glow|border=gradient|caption=Sourcery providing comprehensive PR analysis](/assets/blog/tutorials/building-magiclogger/sourcery-pr-async-good-review.png)

Software is a profession where techno-babble can sound right while being architecturally unsound. AI models trained on this code perpetuate these patterns.

MagicLogger was built out of personal desires / needs and as an experiment to best figure out how to build large-scale OSS with AI pair programming tools, like Claude and Cursor.
