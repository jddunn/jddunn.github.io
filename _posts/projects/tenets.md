---
title: 'tenets'
coverImage: '/assets/projects/tenets_dark_icon.png'
excerpt: 'Using NLP and semantic understanding with embeddings and similarity to automatically aggregate context from any folder / repo to feed into a prompt.'
date: '2025'
createdDate: '2025'
tags: 'python,llms,ai,dev-tools'
# author:
#   name: JJ Kasper
#   picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/projects/tenets_dark_icon.png'
---
<a href="https://github.com/jddunn/tenets" style="text-align: center" target="_blank" class="md-link">GitHub link</a>

<a href="https://tenets.dev" style="text-align: center" target="_blank" class="md-link">Website / docs link</a>

## Intro / Concepts

I work often with AI tools, especially pair programming ones, such as CoPilot Chat, Cursor, TraeAI, Claude Code, and aider. I have my favorites picked in CoPilot and Claude Code, but even so it's clear they have a lot of flaws in LLM tooling and function calling.

CoPilot, Claude, and seemingly every other CLI and AI tool can hook right into your Git repos / CLI, and can be given full permissions to access commands like `ls`, `grep`, etc. which they use in turn to find relevant file matches.

One of the worst but understandable interactions with LLMs is when you give a very specific clear and defined prompt (because it needs to be), and the agent goes off and searches for *that same exact text*, same order capitalization and all, with grep, then if that's not found, the LLM chooses some synonyms etc. on its own or similar phrases, and goes from there. 

Not only is this more costly (more processing is more LLM calls, and unless the IDEs enforce routing then lesser tasks won't be offloaded to a lesser LLM, so it's still `Opus 4.1` running all the time, the most expensive model available), it's *also* unpredictable. This is non-deterministic, though this is in some ways it can be a feature one exclusive to LLM calling; however, so can determinism be a feature by design.

**tenets** is a Python library that intelligently navigate a repo or directory of files to match, analyze, summarize, aggregate, and format optimally the most relevant context (adjustable with granular config settings), all based on speed and accuracy or token limits desired, and whether to include semantic embeddings and heavier ML dependencies, or to simply stick with regex, tf-idf analysis, and fast cosine similarity matching. Tenets also makes use of all its file ranking and scanning tools building on top of it with a suite of visualization and metrics tracking for coding quality, which I believe is currently one of the most underutilized fields in developer experience / tools.

None of tenets's functionality costs any $ or API credits as all processing and model analysis is done locally. There is optional LLM integrations for summarizing context, but the more recommended route is to try to use any of the current [summarizer](https://github.com/jddunn/tenets/blob/master/tenets/core/summarizer/strategies.py) algorithms first.

## Features in Action

### Context Building
When you run:

`tenets distill "add mistral api to summarizer"` 

tenets analyzes your codebase to find and rank the most relevant files:

![Context building - Analyzing files](/assets/projects/tenets/context-building-1.png)
*Analyzing and ranking relevant files based on your query*

![Context building - Building context](/assets/projects/tenets/context-building-2.png)
*Building optimized context with intelligent summarization*

### File Ranking
You can also rank files without building full context using:

`tenets rank "fix summarizing truncation bug" --tree`

![Context building - Building context](/assets/projects/tenets/rank.png)

### Code Analysis & Quality Metrics
Tenets provides comprehensive code analysis:

`tenets examine . --complexity --hotspots --ownership`

![Code analysis](/assets/projects/tenets/code-analysis.png)
*Comprehensive code analysis with actionable metrics*

![Quality metrics](/assets/projects/tenets/quality.png)
*Code quality dashboard with improvement suggestions*

### Session Management

Sessions allow you to maintain context across multiple interactions:

![Sessions - Creating session](/assets/projects/tenets/sessions-1.png)
*Creating a session and adding project-specific tenets*

![Sessions - Managing tenets](/assets/projects/tenets/sessions-2.png)
*Managing and instilling guiding principles for consistent development*

![Sessions - Building context](/assets/projects/tenets/sessions-3.png)
*Building context with session-aware tenets applied*

### Team Velocity & Visualization
Track development momentum and visualize your codebase:

![Velocity metrics](/assets/projects/tenets/velocity.png)
*Team velocity metrics and development trends*

![Dependency visualization](/assets/projects/tenets/visualization.png)
*Interactive D3.js dependency graph visualization*

## Architecture Challenges & Design Decisions

While many ML-oriented and text analysis libraries don't really have to bother with smart module structure and abstractions (outside of avoiding circular imports), building a *code intelligence* platform needs to be responsive in all the right places.

We can't for example just make a straightforward CLI like this:

```python
# Initial naive approach - looks clean, but...
from tenets import Tenets

@app.command()
def distill(prompt: str):
    tenets = Tenets()
    return tenets.distill(prompt)
```

Since the `Tenets` class is the central hub and needed access to all subsystems - the distiller, instiller, analyzers, rankers, and crucially, the NLP pipeline, embedding it in a CLI would be tricky without running into circular imports.

This required rethinking and retooling of the import strategy across multiple layers.

### Lazy Loading, Command Isolation

Python 3.7+ has `__getattr__` at the module level, enabling proper lazy loading without breaking conventions:

```python
# tenets/__init__.py - Standard lazy loading pattern
_LAZY_IMPORTS = {
    'Distiller': 'tenets.core.distiller.Distiller',
    'Instiller': 'tenets.core.instiller.Instiller',
    'CodeAnalyzer': 'tenets.core.analysis.analyzer.CodeAnalyzer',
}

def __getattr__(name):
    """Lazy import heavy components on first access."""
    if name in _LAZY_IMPORTS:
        import importlib
        module_path, attr_name = _LAZY_IMPORTS[name].rsplit('.', 1)
        module = importlib.import_module(module_path)
        attr = getattr(module, attr_name)
        globals()[name] = attr  # Cache for future access
        return attr
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

# Usage remains clean and pythonic:
from tenets import Distiller  # No import happens yet
d = Distiller()  # NOW the real class is imported and instantiated
```

This approach maintains fast startup times while following Python conventions - classes look like classes, `isinstance()` works correctly, and IDEs understand the code structure.

For type hints, we can combine `TYPE_CHECKING` with `__all__` to get the best of both worlds:

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    # Type checkers see the real imports
    from tenets.core.distiller import Distiller
    from tenets.models.context import ContextResult
    
# Define what's available for import
__all__ = ['Distiller', 'Instiller', 'CodeAnalyzer', 'ContextResult']

# The __getattr__ handles runtime imports lazily
```

### Command-Specific Import Isolation

The CLI only imports what each command actually needs:

```python
# app.py - Conditional command loading
import sys as _sys
if len(_sys.argv) > 1 and _sys.argv[1] in ["distill", "instill"]:
    # Only import heavy commands if they're being called
    from tenets.cli.commands.distill import distill
    app.command()(distill)
else:
    # Lightweight placeholder for help text
    @app.command(name="distill")
    def distill_placeholder(ctx: typer.Context, prompt: str):
        """Distill relevant context from codebase."""
        from tenets.cli.commands.distill import distill
        return ctx.invoke(distill, prompt=prompt)
```

### Minimal Managers for Simple Operations

For commands that didn't need the full framework, we created minimal implementations for the Manager with the same base methods:

```python
class MinimalTenetManager:
    """Direct SQLite access without importing the entire framework"""
    def __init__(self):
        self.db_path = Path.home() / ".tenets" / "tenets.db"
        # Just SQLite, no NLP, no ML, no config cascade
    
    def add_tenet(self, tenet):
        # Direct SQL, no ORM, no validation framework
        conn = sqlite3.connect(self.db_path)
        conn.execute("INSERT INTO tenets ...", tenet.to_tuple())
```

### Python 3.13 Compatibility

YAKE, our secondary keyword extraction library, had an infinite loop bug on Python 3.13. Rather than wait for upstream fixes, we implement a runtime version check and graceful fallback:

```python
# Smart compatibility handling
if sys.version_info[:2] >= (3, 13):
    YAKE_AVAILABLE = False
    logger.warning("YAKE disabled on Python 3.13+ due to compatibility issues")
else:
    try:
        import yake
        YAKE_AVAILABLE = True
    except ImportError:
        YAKE_AVAILABLE = False

# Fallback chain: RAKE → YAKE → TF-IDF → Frequency
```

### Summarizing imports and file structure

One immediate value innovation came from dealing with large files. When aggregating context, files with dozens of imports would waste precious tokens. To combat this, we intelligently condense imports into human-readable (and LLM-readable) summaries:

```python
# Instead of:
import os
import sys
import json
import yaml
from pathlib import Path
from typing import Dict, List, Optional
from collections import Counter, defaultdict
# ... 20 more lines

# We generate:
# Imports: 27 total
# Dependencies: os, sys, json, yaml, pathlib, typing, collections
# Local imports: 3
```

This seemingly simple optimization saves hundreds of tokens per file while preserving the essential information about dependencies.

### Performance Architecture Insights

The streaming architecture was crucial for perceived performance. Rather than waiting for all files to be analyzed, we stream results as they become available:

```python
def scan_and_analyze(self, path: Path):
    """Stream files as they're discovered and analyzed"""
    with Progress() as progress:
        scan_task = progress.add_task("Scanning", total=None)
        
        for file_batch in self.scanner.scan_parallel(path, batch_size=50):
            # Process batch while next batch is being discovered
            results = self.analyze_batch(file_batch)
            
            # Stream to user immediately
            for result in results:
                yield result
                progress.advance(scan_task)
```

### Caching Strategy Evolution

The caching system evolved through several iterations:

1. **Memory-only** (v0.1): Fast but limited, lost on restart
2. **SQLite-backed** (v0.2): Persistent but slower for hot paths
3. **Hybrid multi-tier** (v0.3+): Memory for hot data, SQLite for warm, disk for cold

```python
class HybridCache:
    def __init__(self):
        self.memory = {}  # Hot: <100ms access
        self.sqlite = SQLiteCache()  # Warm: <500ms access  
        self.disk = DiskCache()  # Cold: <2s access
        
    def get(self, key):
        # Waterfall through cache tiers
        if key in self.memory:
            return self.memory[key]
        
        if value := self.sqlite.get(key):
            self.memory[key] = value  # Promote to hot
            return value
            
        if value := self.disk.get(key):
            self.sqlite.set(key, value)  # Promote to warm
            return value
```

The final architecture achieves sub-second startup for simple commands while maintaining the full power of ML-based code intelligence when needed. The `tenets tenet add` command now starts in ~1.2 seconds as is reasonable given its session / file checking whereas before it was taking additional time for certain unused ML dependencies, and the heaviest `distill` command lazily loads all ML imports.

## Learning & Takeaways

Performance is more than the right data structures, it's understanding the full lifecycle of your application, from import time to execution to how results get formatted and returned. The lazy loading architecture combined with aggressive caching and intelligent fallbacks, multiprocessing for scanning and analysis done in streaming batches, allows **tenets** to perform at scale. The advantages any Golang or low-level lib that would have to invoke HTTP and other calls to work with the much greater data analysis ecosystem in Python of course don't outweigh the cost of working around the GIL and relatively slower speed.

## Demo & Examples

You can see **tenets** in action on the [website](https://tenets.dev), or try it yourself:

```bash
# Install
pip install tenets

# Basic usage - intelligent context extraction
tenets distill "implement OAuth2 authentication"

# Examine code quality
tenets examine --complexity --ownership

# Track development momentum
tenets momentum --period week

# Visualize your codebase
tenets viz --output graph.html
```

#### Advanced Context Building
```bash
# Build context with specific optimizations
tenets distill "implement caching layer" \
  --remove-comments \        # Strip comments for cleaner context
  --condense \               # Use aggressive summarization
  --max-tokens 8000 \        # Limit to specific token count
  --include-tests           # Include test files in context

# Focus on specific file patterns
tenets distill "refactor authentication" \
  --glob "**/*auth*.py" \
  --exclude "tests/*"
```

#### Code Quality Analysis
```bash
# Full examination with all metrics
tenets examine . \
  --complexity \             # Cyclomatic complexity
  --hotspots \              # Frequently changed files
  --ownership \             # Code ownership distribution
  --show-details \          # Detailed breakdowns
  --format json > metrics.json

# Track momentum over time
tenets momentum \
  --team \                  # Team-wide metrics
  --since "last month" \    # Time period
  --detailed               # Include individual contributions
```

#### Visualization and Reporting
```bash
# Generate interactive dependency graph
tenets viz deps --format html --output deps.html

# Create complexity heatmap
tenets viz complexity --format svg --output complexity.svg

# Export session history
tenets session export payment-integration --format markdown
```
