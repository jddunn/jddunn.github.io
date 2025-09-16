---
title: 'tenets'
coverImage: '/assets/projects/tenets/tenets_dark_icon.png'
excerpt: 'Using NLP and semantic understanding with embeddings and similarity to automatically aggregate context from any folder / repo to feed into a prompt.'
date: '2025-09-02'
createdDate: '2025-09-02'
tags: 'python,llms,ai,dev-tools'
# author:
#   name: JJ Kasper
#   picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/projects/tenets/tenets_dark_icon.png'
---
<a href="https://github.com/jddunn/tenets" style="text-align: center" target="_blank" class="md-link">GitHub link</a>

<a href="https://tenets.dev" style="text-align: center" target="_blank" class="md-link">Website / docs link</a>

# Building tenets: Intelligent Context Aggregation for AI Pair Programming

**GitHub: [github.com/jddunn/tenets](https://github.com/jddunn/tenets)**  
**Website: [tenets.dev](https://tenets.dev)**

## The Problem with AI Code Assistants

I work often with AI pair programming tools - CoPilot Chat, Cursor, Claude Code, aider. They all have access to your Git repos and CLI, with full permissions to run commands like `ls` and `grep`. But here's what actually happens:

You give a specific prompt: "fix authentication bug in login handler"

The LLM searches for... *that exact text*. Same capitalization, same order. When that fails, it tries synonyms it picks on its own. This is both costly (more LLM calls = more expensive API usage) and unpredictable.

**tenets** is a Python library that intelligently navigates repos to match, analyze, summarize, and aggregate the most relevant context based on speed, accuracy, or token limits. It uses deterministic algorithms (regex, BM25, cosine similarity) with optional ML embeddings for semantic understanding.

None of tenets's functionality costs API credits - all processing is done locally. There are optional LLM integrations for summarizing, but the recommended route is using the built-in [summarizer algorithms](https://github.com/jddunn/tenets/blob/master/tenets/core/summarizer/strategies.py) first.

## Features in Action

### Context Building
When you run `tenets distill "add mistral api to summarizer"`, tenets analyzes your codebase:

![Analyzing and ranking relevant files](/assets/projects/tenets/context-building-1.png)

![Building optimized context with intelligent summarization](/assets/projects/tenets/context-building-2.png)

### File Ranking
`tenets rank "fix summarizing truncation bug" --tree`

![File ranking visualization](/assets/projects/tenets/rank.png)

### Code Analysis & Quality Metrics
`tenets examine . --complexity --hotspots --ownership`

![Comprehensive code analysis with actionable metrics](/assets/projects/tenets/code-analysis.png)

![Code quality dashboard](/assets/projects/tenets/quality.png)

### Session Management
Sessions maintain context across multiple interactions:

![Creating a session and adding project-specific tenets](/assets/projects/tenets/sessions-1.png)

![Managing and instilling guiding principles](/assets/projects/tenets/sessions-2.png)

![Building context with session-aware tenets applied](/assets/projects/tenets/sessions-3.png)

### Team Velocity & Visualization

![Team velocity metrics and development trends](/assets/projects/tenets/velocity.png)

![Interactive D3.js dependency graph visualization](/assets/projects/tenets/visualization.png)

## Technical Design: Why BM25 Over TF-IDF

BM25 is a probabilistic ranking algorithm that scores documents for relevancy. Since code files vary from 10 to 10,000+ lines, length shouldn't bias relevance. BM25 adds term saturation (diminishing returns for repeated terms) and document length normalization.

For each term:
```
score = IDF(term) × [TF × (k1 + 1)] / [TF + k1 × (1 - b + b × docLength/avgDocLength)]
```

Code is inherently redundant. A test file with 50 instances of `assert response.status == 200` shouldn't dominate searches for "response". BM25's term saturation prevents this.

We use sparse representations to cut memory by 10x:
```python
# BM25: Stores raw tokens, calculates scores on-the-fly
doc_tokens = ["Summarizer", "summary", "summarize", "tenets", ...]
doc_tf = Counter(doc_tokens)  # Sparse: {'Summarizer': 3, 'summary': 5, ...}

# Sparse vector comparison for tf-idf:
def sparse_cosine_similarity(vec1, vec2):
    common = set(vec1.keys()) & set(vec2.keys())
    dot_product = sum(vec1[t] * vec2[t] for t in common)
    norm1 = math.sqrt(sum(v**2 for v in vec1.values()))
    norm2 = math.sqrt(sum(v**2 for v in vec2.values()))
    return dot_product / (norm1 * norm2)
```

No stemming or lemmatization - the difference between `summary()` method and `Summary()` class matters in code.

## RAKE vs YAKE: Keyword Extraction Without a Corpus

| Algorithm | Speed | Quality | Memory | Python 3.13 | How It Works |
|-----------|-------|---------|---------|-------------|--------------|
| **RAKE** | Fast | Good | Minimal | ✅ Yes | Degree/frequency scoring |
| **YAKE** | Moderate | Better | Low | ❌ No | Statistical features + position |
| **TF-IDF** | Fast | Basic | Medium | ✅ Yes | Needs corpus |

RAKE is primary because it's simpler, predictable, and has no external dependencies beyond stopwords.

RAKE analyzes word co-occurrence to find multi-word phrases:
```python
text = "Python web framework Django handles authentication"
# Split by stopwords → candidate phrases
candidates = ["Python web framework Django", "handles authentication"]

# Calculate word scores (degree/frequency)
# "Python" appears with 3 other words (degree=4), appears once (freq=1)
# Score = 4/1 = 4.0

# Score phrases (sum of word scores)
"Python web framework Django" = 4.0 + 4.0 + 4.0 + 4.0 = 16.0
```

BM25 can't extract keywords from a single prompt because it needs corpus statistics. RAKE/YAKE work on single documents by analyzing internal structure without needing a corpus.

## Multi-Signal Ranking

tenets combines 10 different factors with configurable weights:

```python
class RankingFactors:
    keyword_match: float      # 0.20 - Direct keyword presence
    bm25_score: float        # 0.25 - BM25 relevance (primary)
    path_relevance: float    # 0.15 - Path/filename matching
    import_centrality: float # 0.10 - How often file is imported
    git_recency: float       # 0.05 - Recent changes
    git_frequency: float     # 0.05 - Change frequency
    semantic_similarity: float # 0.10 - Embedding similarity (if ML)
    code_patterns: float     # 0.05 - Domain patterns
    complexity_relevance: float # 0.03 - Cyclomatic complexity
    ast_relevance: float     # 0.02 - AST structure matching
```

Import centrality identifies core abstractions:
```python
def calculate_import_centrality(file, import_graph):
    imported_by = sum(1 for deps in import_graph.values() if file in deps)
    imports_others = len(import_graph.get(file, set()))
    
    # Weight incoming more - being imported signals importance
    centrality = (imported_by * 0.7 + imports_others * 0.3) / total_edges
    
    # Logarithmic scaling to prevent dominant nodes
    return min(1.0, math.log(1 + centrality * 10) / 3)
```

## Architecture Challenge: CLI + Python API

Building a code intelligence platform needs to be responsive without circular imports. The naive approach fails:

```python
# Initial approach - looks clean, but circular import hell
from tenets import Tenets

@app.command()
def distill(prompt: str):
    tenets = Tenets()  # Imports EVERYTHING
    return tenets.distill(prompt)
```

### Solution: Lazy Loading with `__getattr__`

Python 3.7+ enables proper lazy loading without breaking conventions:

```python
# tenets/__init__.py
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
        globals()[name] = attr  # Cache for future
        return attr
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")

# Usage remains clean:
from tenets import Distiller  # No import yet
d = Distiller()  # NOW it imports
```

### Command-Specific Import Isolation

The CLI only imports what each command needs:

```python
# app.py - Conditional command loading
import sys as _sys
if len(_sys.argv) > 1 and _sys.argv[1] in ["distill", "instill"]:
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

## Key Innovations

### Import Condensing

Large files with dozens of imports waste precious tokens. We intelligently condense:

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

Saves hundreds of tokens per file while preserving essential dependency information.

### Streaming Architecture

Stream results as they become available instead of waiting:

```python
def scan_and_analyze(self, path: Path):
    """Stream files as they're discovered and analyzed"""
    with Progress() as progress:
        scan_task = progress.add_task("Scanning", total=None)
        
        for file_batch in self.scanner.scan_parallel(path, batch_size=50):
            # Process batch while next batch is being discovered
            results = self.analyze_batch(file_batch)
            
            for result in results:
                yield result
                progress.advance(scan_task)
```

### Multi-Tier Caching

The caching system evolved through iterations:

1. **Memory-only** (v0.1): Fast but limited
2. **SQLite-backed** (v0.2): Persistent but slower  
3. **Hybrid multi-tier** (v0.3+): Memory for hot, SQLite for warm, disk for cold

```python
class HybridCache:
    def __init__(self):
        self.memory = {}  # Hot: <100ms
        self.sqlite = SQLiteCache()  # Warm: <500ms
        self.disk = DiskCache()  # Cold: <2s
        
    def get(self, key):
        if key in self.memory:
            return self.memory[key]
        
        if value := self.sqlite.get(key):
            self.memory[key] = value  # Promote to hot
            return value
            
        if value := self.disk.get(key):
            self.sqlite.set(key, value)  # Promote to warm
            return value
```

## Usage Examples

### Basic Context Building
```bash
# Intelligent context extraction
tenets distill "implement OAuth2 authentication"

# With optimizations
tenets distill "implement caching layer" \
  --remove-comments \
  --condense \
  --max-tokens 8000 \
  --include-tests

# Focus on specific patterns
tenets distill "refactor authentication" \
  --glob "**/*auth*.py" \
  --exclude "tests/*"
```

### Code Quality Analysis
```bash
# Full examination
tenets examine . \
  --complexity \
  --hotspots \
  --ownership \
  --show-details \
  --format json > metrics.json

# Track momentum
tenets momentum \
  --team \
  --since "last month" \
  --detailed
```

### Visualization
```bash
# Interactive dependency graph
tenets viz deps --format html --output deps.html

# Complexity heatmap
tenets viz complexity --format svg --output complexity.svg

# Export session history
tenets session export payment-integration --format markdown
```

## Takeaways

Performance is more than the right data structures - it's understanding your application's full lifecycle. The lazy loading architecture combined with aggressive caching, intelligent fallbacks, and streaming multiprocessing allows **tenets** to perform at scale. The `tenets tenet add` command starts in ~1.2 seconds while the heaviest `distill` command lazily loads ML imports only when needed.

The future of AI pair programming isn't about throwing more compute at the problem - it's about being intelligent with context selection and deterministic where it counts.

**Install:** `pip install tenets`  
**Docs:** [tenets.dev](https://tenets.dev)  
**GitHub:** [github.com/jddunn/tenets](https://github.com/jddunn/tenets)