---
title: "Building MagicLogger and MAGIC: A Universal Logging Standard for Color"
excerpt: "One developer's journey into building a feature-rich colorful logging library and why."
author: "Johnny Dunn"
category: "tutorials"
tags: ["typescript", "open-source", "library", "logging", "featured"]
image: "/assets/blog/tutorials/building-magiclogger/magiclogger-primary-no-subtitle-transparent-4x.png"
date: '2025-08-31'
createdDate: '2025-08-31'
featured: true
---

# Building MagicLogger and MAGIC: A Universal Logging Standard for Color

**GitHub link: [https://github.com/manicinc/magiclogger](https://github.com/manicinc/magiclogger)**

See the full article link [here](https://manic.agency/blog/building-magiclogger-and-magic).

MagicLogger is a TypeScript logging library based on a simple personal need: making logging visually clear and beautiful **even in production dashboards**. After years of wrestling with libraries that required separate styling packages or complex configurations just for colored output, I wanted something where colors and styles were first-class citizens.

This goes against the grain—most production loggers strip colors for performance. But I'm making different assumptions:

- Storage is cheap, a few extra KB rarely matters in web apps
- Production logs often need human reading
- Visual clarity means better debugging experiences
- Good design might mean fewer logs overall (we never talk about designing log messages for readability!)

> This is built for users who meticulously plan color-coordinated dev logs like art, and want to see that in production environments too.

MagicLogger is optimized enough to compete with pino (~90% of its speed) while being reasonably larger (~40kb vs pino's 25kb). Built for small teams managing many services where beautiful aggregated log streams are worth the trade-off.

## The Problem: Colors Are an Afterthought

Industry standard libraries make coloring unnecessarily complex. Winston requires multiple packages and loses colors in file transports. Pino deliberately excludes colors from production, requiring pino-pretty (which adds 600KB!) just for development. Even then, you can't style parts of messages—the entire line is one color.

MagicLogger's approach:

```javascript
// MAGICLOGGER - colors preserved everywhere
import { Logger } from 'magiclogger';
const logger = new Logger();

logger.error('<red.bold>CRITICAL:</> Database <yellow>MongoDB</> unreachable');
// Console: Beautifully styled
// File: {"message": "CRITICAL: Database MongoDB unreachable", 
//        "styles": [[0, 9, "red.bold"], [19, 26, "yellow"]]}
// Dashboard: Can reconstruct exact styling using MAGIC schema
```

We're not just adding colors—we're preserving the **semantic meaning** of those colors throughout your entire logging pipeline.

## The MAGIC Schema

The [MAGIC schema](https://github.com/manicinc/magiclogger/blob/master/docs/magic_schema.md) (MagicLog Agnostic Generic Interface for Consistency) is an open format that enables seamless preservation of styles:

```typescript
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "info",
  "message": "Server started on port 3000",
  "styles": [
    { "start": 0, "end": 14, "styles": ["green", "bold"] },
    { "start": 23, "end": 27, "styles": ["yellow"] }
  ],
  "context": { "service": "api-gateway" },
  "tags": ["server", "startup"]
}
```

Any consumer—dashboards, SDKs, other loggers—can recreate the exact visual representation anywhere.

## Making It Fast

### Style Extraction in O(n)

The angle-bracket syntax needs efficient parsing:

```typescript
export function extractStyles(message: string): ExtractedStyles {
  const styleRanges: StyleRange[] = [];
  const plainParts: string[] = [];
  let plainTextPos = 0;
  
  const regex = /<([^>]+)>([^<]*)<\/>/g;
  let match;
  
  while ((match = regex.exec(message)) !== null) {
    // Single-pass processing with regex finite automata
    const styles = match[1].split('.');
    const content = match[2];
    
    styleRanges.push({
      start: plainTextPos,
      end: plainTextPos + content.length,
      styles
    });
    
    plainParts.push(content);
    plainTextPos += content.length;
  }
  
  return { plainText: plainParts.join(''), styles: styleRanges };
}
```

Optimizations: single-pass processing, negated character classes prevent backtracking, array accumulation instead of string concatenation.

### The Ring Buffer Advantage

While Pino uses worker threads (adding communication overhead), MagicLogger uses a ring buffer with microtask batching:

```typescript
class AsyncBuffer {
  private buffer: LogEntry[] = [];
  private writeIndex = 0;
  private readonly maxSize: number;

  constructor(maxSize = 16384) {
    this.maxSize = maxSize;
    this.buffer = new Array(maxSize); // Pre-allocate
  }

  push(entry: LogEntry): boolean {
    // Overwrite oldest when full - O(1), no allocations
    this.buffer[this.writeIndex] = entry;
    this.writeIndex = (this.writeIndex + 1) % this.maxSize;
    return true;
  }
}

// Batch using microtasks - faster than setTimeout
queueMicrotask(() => this.flush());
```

This achieves ~238K ops/sec (93% of Pino's speed) with zero dependencies and works everywhere including browsers.

### Performance Results

```
=== BENCHMARK RESULTS ===
Synchronous Performance:
  MagicLogger: 50,316 ops/sec
  Winston: 108,775 ops/sec
  Pino: 97,743 ops/sec

Asynchronous Performance:
  MagicLogger: 238,199 ops/sec
  Pino: 255,949 ops/sec
  Winston: 114,647 ops/sec
```

### Bundle Sizes

| Export | Size | Gzipped |
|--------|------|---------|
| Core | 180 KB | 38 KB |
| Core + Console | 185 KB | 39 KB |
| Browser Bundle | 139 KB | 35 KB |

Tree-shaking means you only pay for what you use. Import just the core logger without transports and save on bundle size.

## Architecture Decisions

**Zero dependencies**: Everything is built from scratch—no chalk, no external color libraries. This keeps the package lean and eliminates supply chain risks.

**Dual implementations**: Synchronous mode (~50K ops/sec) for audit trails where no log can be lost. Asynchronous mode (~238K ops/sec) for high-throughput with predictable log dropping (overwrites oldest).

**Browser-first**: Unlike Pino's Node-specific optimizations, MagicLogger works identically in browsers without polyfills or modifications.

**Extensible by design**: Core stays fast, expensive features are opt-in:

```typescript
const logger = new Logger({
  extensions: [
    new RateLimiter({ maxPerSecond: 1000 }),
    new Redactor({ patterns: [/password/gi] }),
    new Sampler({ rate: 0.1 }) // Sample 10% in production
  ]
});
```

## CI/CD Excellence

The project maintains [80% test coverage](https://coveralls.io/github/manicinc/magiclogger?branch=master) with 2000+ tests. Every push triggers:

- Multi-platform testing (Windows, Linux, macOS)
- Performance benchmarks against Winston/Pino/Bunyan
- Security scanning with Trivy
- Automated PR labeling and summarization
- Bundle size tracking

GitHub Actions handles everything from auto-formatting to release drafting. The documentation at [magiclog.io](https://magiclog.io/docs) auto-generates from JSDoc comments using TypeDoc.

## AI Coding: Exponential Development and Failure

MagicLogger was developed with AI pair programming (Claude, GPT-4, early GPT-5 previews). The acceleration was real—probably 2-2.5x faster than solo development. The 2000+ tests alone would've taken months to write manually.

But AI can confidently suggest terrible ideas. An actual Claude suggestion:

> "You should consider moving the async implementation to a worker thread for better performance isolation..."

This is architecturally wrong—serialization overhead between threads would decrease performance for a logging library. The scariest part isn't the bad suggestions, it's how easily you can lead an LLM astray with a typo or wrong assumption, and it'll confidently build on that mistake.

Key insight: AI accelerates development dramatically but requires constant architectural oversight. It excels at well-defined tasks (tests, docs, algorithms) but struggles with system design decisions.

## Try It Yourself

```bash
npm install magiclogger
```

```typescript
import { Logger } from 'magiclogger';

const logger = new Logger();

// Beautiful logs with inline styling
logger.info('<green>Success!</> Operation completed in <yellow>{time}ms</>', 
  { time: 42 });

// With context and hierarchical tags
logger
  .context({ requestId: '123' })
  .tag(['api', 'auth'])
  .error('Authentication failed');

// Multiple transports with independent batching
const logger = new Logger({
  transports: [
    new ConsoleTransport({ colors: true }),
    new FileTransport({ path: 'app.log' }),
    new HttpTransport({ 
      endpoint: 'https://logs.example.com',
      batchSize: 100 
    })
  ]
});
```

MagicLogger proves you don't need to sacrifice visual clarity for performance. Sometimes the right solution is making different trade-offs than everyone else.

**Links:** [GitHub](https://github.com/manicinc/magiclogger) | [Documentation](https://magiclog.io) | [NPM](https://www.npmjs.com/package/magiclogger)