---
title: 'MagicLogger'
coverImage: '/assets/projects/magiclogger-dark-4x-with-subtitle.png'
excerpt: 'A TypeScript logging library with native colors and styles, competitive performance, and zero dependencies.'
date: '2024'
createdDate: '2024'
tags: 'typescript,logging,open-source,library'
ogImage:
  url: '/assets/projects/magiclogger-dark-4x-with-subtitle.png'
---
<a href="https://github.com/manicinc/magiclogger" style="text-align: center" target="_blank" class="md-link">GitHub link</a>

<a href="https://magiclog.io" style="text-align: center" target="_blank" class="md-link">Website / docs link</a>

## Intro / Concepts

After years of wrestling with logging libraries that required separate styling packages or complex configurations just to get colored output, I built MagicLogger, a TypeScript logging library where colors and styles are first-class citizens, not afterthoughts. Admittedly, I didn't do much research in product validation; is this something people cared about or just me? But for me, this was an undertaking well worth doing, to be able to achieve powerful visual clarity and making reading logs more pleasant of an experience. 

It was also something I realized I could try as an truly enterprise-level product, open-source with robust CI / CD and excellent documentation, that had a very reasonable scope compared to many of my other works with heavy ML integrations. I took the experience to shape a learning path that would allow me to demonstrate how I would lead a project to maximum effectiveness with minimal technical debt, simple as that. I also thought I would need to be able to showcase something like this eventually as I continue an IC path to eventually becoming staff-level at an engineering team, and not be stuck in a 10-15 year senior rut.

**MagicLogger** is a zero-dependency TypeScript logging library that delivers:
- Native color and styling support with an intuitive API and themes
- Competitive performance (~90% of Pino's performance)
- Tree-shakable exports for optimal bundle sizes
- Integrated with MAGIC schema for preserving styles across transports
- Multiple transports for streaming, storage, big data services
- Optional extensions like PII redacting

See the full article I wrote on my experiences / design decisions [here](https://manic.agency/blog/tutorials/building-magiclogger).

## Features in Action

### Beautiful Logs by Default
```typescript
import { Logger } from 'magiclogger';

const logger = new Logger();

// Simple, intuitive styling syntax
logger.info('<green.bold>Server started</> on port <yellow>3000</>');
logger.error('<red>Database connection failed:</> <dim>{error}</>', { error });

// Automatic theming with tags
logger.tag(['api', 'auth']).info('User authenticated');
// Output: [API] [AUTH] User authenticated (with themed colors)
```

### The MAGIC Schema
MagicLogger introduces the [MAGIC schema](https://github.com/manicinc/magiclogger/blob/master/docs/magic_schema.md) (MAgicLogger Agnostic Generic Interface for Consistency) - a standardized format that preserves styles across any transport:

```typescript
// A log entry in MAGIC format
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

This allows any consumer - dashboards, SDKs, other loggers - to recreate the exact visual representation.

Libraries like pino focus on low-overhead, recommending pretty printing be disabled in production. But, if we can serve logs from prod *with* styles intact to outer services, then ingest them again original styles and all, this allows for consistency of visuals and styling and formatting from creation to transport to dashboard.

### Performance Without Complexity
```typescript
// Synchronous mode for audit trails (no log loss)
const syncLogger = new Logger({ async: false });
syncLogger.info('Critical audit event'); // ~38K ops/sec

// Async mode for high throughput (default)
const asyncLogger = new Logger({ async: true });
asyncLogger.info('High volume event'); // ~135K ops/sec
```

## Architecture Challenges & Design Decisions

### Challenge 1: Achieving Near-Pino Performance with Zero Dependencies

Pino achieves ~145K ops/sec using [sonic-boom](https://github.com/pinojs/sonic-boom), which employs memory-mapped files and worker threads. I wanted competitive performance without the complexity or native dependencies.

The solution: a ring buffer with microtask batching.

```typescript
class AsyncBuffer {
  private buffer: LogEntry[] = [];
  private writeIndex = 0;
  private readonly maxSize: number;

  constructor(maxSize = 16384) {
    this.maxSize = maxSize;
    // Pre-allocate for zero allocation during logging
    this.buffer = new Array(maxSize);
  }

  push(entry: LogEntry): boolean {
    // Overwrite oldest entry when full - no memory allocation
    this.buffer[this.writeIndex] = entry;
    this.writeIndex = (this.writeIndex + 1) % this.maxSize;
    return true;
  }
}
```

Combined with JavaScript's microtask queue for batching:
```typescript
queueMicrotask(() => this.flush());
```

This achieves ~135K ops/sec (93% of Pino's speed) with:
- Zero dependencies
- No worker thread overhead
- Lower latency (same-thread processing)
- Works in browsers without modification

### Challenge 2: Efficient Style Extraction

The angle-bracket syntax `<green.bold>text</>` needs to be parsed efficiently while maintaining O(n) complexity:

```typescript
export function extractStyles(message: string): ExtractedStyles {
  const styleRanges: StyleRange[] = [];
  const plainParts: string[] = [];
  let plainTextPos = 0;
  
  const regex = /<([^>]+)>([^<]*)<\/>/g;
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(message)) !== null) {
    // Add unstyled text before match
    if (match.index > lastIndex) {
      const plainText = message.slice(lastIndex, match.index);
      plainParts.push(plainText);
      plainTextPos += plainText.length;
    }
    
    // Extract styled content with position tracking
    const styles = match[1].split('.');
    const content = match[2];
    
    styleRanges.push({
      start: plainTextPos,
      end: plainTextPos + content.length,
      styles
    });
    
    plainParts.push(content);
    plainTextPos += content.length;
    lastIndex = regex.lastIndex;
  }
  
  return { plainText: plainParts.join(''), styles: styleRanges };
}
```

Key optimizations:
- Single-pass processing with regex finite automata
- Array accumulation instead of string concatenation
- Negated character classes prevent backtracking
- Pre-declared variables minimize allocations

### Challenge 3: Tree-Shaking and Module Resolution

Supporting CommonJS, ESM, browsers, and bundlers required careful package.json configuration:

```json
{
  "exports": {
    ".": {
      "browser": {
        "types": "./dist/index.d.ts",
        "default": "./dist/browser/index.js"
      },
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./transports/console": {
      // Separate entry for tree-shaking
    }
  }
}
```

With tsup configuration for optimal builds:
```typescript
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'transports/console': 'src/transports/console.ts',
    // Multiple entries enable tree-shaking
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  treeshake: true,
  platform: 'neutral',
  target: 'es2022'
});
```

Result: Core logger is 38KB gzipped, with transports adding only what you use.

### Challenge 4: Balancing Features and Performance

Every feature has a cost. The solution: make expensive features opt-in extensions:

```typescript
const logger = new Logger({
  // Minimal core for speed
  useColors: false,
  useTimestamp: false,
  
  // Opt into what you need
  extensions: [
    new RateLimiter({ maxPerSecond: 1000 }),
    new Redactor({ patterns: [/password/gi] }),
    new Sampler({ rate: 0.1 }) // Sample 10% in production
  ]
});
```

This keeps the fast path fast while enabling rich functionality when needed.

## CI/CD and Quality Automation

The project enforces quality through comprehensive automation:

- **80% test coverage** with 2000+ tests
- **Multi-platform CI** testing on Windows, Linux, macOS across multiple Node versions
- **Automated PR workflows** including labeling, summarization, and security scanning
- **Performance benchmarks** on every commit comparing against Winston, Pino, and Bunyan
- **Bundle size tracking** with automatic documentation updates

```yaml
# Example: Automatic PR labeling based on changed files
name: Auto Label
on: pull_request
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v4
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
          configuration-path: .github/labeler.yml
```

## AI-Assisted Development Insights

MagicLogger was developed with AI pair programming assistance (mainly Copilot, Claude Code). Some observations:

**The Good:** AI excelled at generating comprehensive test suites, writing documentation, and implementing well-defined algorithms. The 2000+ tests would have taken months to write manually.

**The Tricky:** AI sometimes suggests (how often it is depends on how well-structured your messages are it seems) architecturally unsound solutions, or ones that are just flat out incompatible with an existing codebase, that sound plausible.

An actual example from Claude Opus:

> **Claude**: "You should consider moving the async implementation to a worker thread for better performance isolation for batching logs in your AsyncLogger implementation.."

This suggestion is overkill for a logger where serialization between worker threads would actually decrease performance. Being I/O bound, logging done still in a single-threaded loop through [microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) is a clean and light implementation. 

Logging is batched and flushed at the (async) logger level sending to transport **and** again at the transport level, allowing configurations and overrides per transport. This design is necessary (and the two-step batching more robust) since S3 buckets may require different optimizations than Elasticsearch.

**The Takeaway:** AI accelerated development by at least 2x (a significant bit more), but required constant oversight, which is obvious, but what is a lot more unsuspecting (seemingly) is how confident a LLM will be in being *wrong* on something it was able to implement just a few messages before. The **scariest** part is how a developer can lead a LLM astray, as it's prone to agreeing with a user, with just the slightest typo or slipup in naming convention / idea. It's so easy to bias a LLM into settling on the wrong decision or abstraction, and it's even easier to fall into lazy habits of not checking in every single change and edit done with AI coding. 

## Demo & Examples

Try MagicLogger yourself:

```bash
# Install
npm install magiclogger

# Basic usage
import { Logger } from 'magiclogger';

const logger = new Logger();
logger.info('<green>Success!</> Operation completed in <yellow>{time}ms</>', 
  { time: 42 });

# Advanced configuration
const logger = new Logger({
  async: true,
  transport: [
    new ConsoleTransport({ colors: true }),
    new FileTransport({ path: 'app.log' }),
    new HttpTransport({ endpoint: 'https://logs.example.com' })
  ],
  theme: 'cyberpunk'
});

# With context and tags
logger
  .context({ requestId: '123', userId: 'abc' })
  .tag(['api', 'critical'])
  .error('Database connection failed');
```

View the full documentation at [magiclog.io](https://magiclog.io) or explore the [GitHub repository](https://github.com/manicinc/magiclogger).