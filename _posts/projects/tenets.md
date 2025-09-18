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

I work often with AI pair programming tools - CoPilot Chat, Cursor, Codex, Claude Code, aider, Windsurf (not anymore), etc. They all have access to your Git repos and CLI, with full permissions to run commands like `ls` and `grep`.

An incredibly strange thing with LLMs is you will tell them something very specific, like: "logic in the summarizer is looping twice because the batch processor isn't clearing the processed_chunks, fix it", and then you'll see the tool calling commands running:

```bash
# First attempt - literal string matching
grep -r "batch processor isn't clearing the processed_chunks"
grep -r "looping twice"
```

then maybe:

```bash
# Second attempt - basic word stemming
grep -r "summar\(y\|izer\|ies\|ize\|ization\)"
grep -r "loop\(ing\|ed\|s\)\?\s*twice\|double\|duplicate"
grep -r "clear\(ing\|ed\|s\)\?\s*\(the\s*\)\?\(batch\|chunks\?\|buffer\)"
grep -r "batch\s*process\(or\|er\|ing\)\?"
```

and maybe then:

```bash
# Third attempt - finally looking for actual variable names
grep -r "processed_chunks\|process_chunks\|chunk_process\|chunks_processed"
grep -r "self\.processed_chunks"
```

Usually it'll find it after like 1-2 attempts after the first failed honestly, it's not such a hindrance you find yourself needing to use a new tool. But it's a symptom of a larger issue at play interacting with LLMs.

Imagine you're in a new conversation, and maybe the LLM has full access to your Git repo / codebase; however, they won't go too exploratory in this process. LLMs won't (importantly it's won't not can't) even recursively search the filenames in your directory to build a tree structure to *understand* what the codebase actually looks like, at most it'll look at the imports, aggregate what it thinks is relevant, and calls it complete. At least right now, none of these tools for AI pair programming bother to do it, which to me seems like an obvious initial first step.

(They will find matching files with your query, then trace the imports and methods used and go from there, which works pretty well but is obviously imperfect).

It seems a incredibly weak process for document similarity matching from a NLP engineering perspective, let alone not even thinking about the costs of additional LLM calls, especially when conversations get larger and LLMs start summarizing with more LLMs when extractive summarization algorithms or something like BERT (though BERT's significantly slower) could work.

**tenets** is a Python library that intelligently navigates repos (or any directory of files) to match, analyze, summarize, and aggregate the most relevant context based on speed, accuracy, or token limits. It uses deterministic algorithms (regex, BM25, cosine similarity) with optional ML embeddings for semantic understanding, and extractive summarization as well as optional LLM summarization that takes into account hierarchy in high-level metadata (how many times a function is referenced, how complex a function may be, etc.), imports / dependencies, and other metrics for heuristics for a total of [10 ranking factors](## Multi-Signal Ranking).

None of tenets's functionality costs API credits - all processing is done locally. There are optional LLM integrations for summarizing, but the recommended route is using the built-in [summarizer algorithms](https://github.com/jddunn/tenets/blob/master/tenets/core/summarizer/strategies.py) first.

tenets is able to perform its full `distillation` (aggregation of context, without ML embeddings) functionality on complex repos with hundreds of source files typically in 30-40 seconds, making it usable as a programmatic API for pair programming tools like aider or Claude CLI (which is intended as one of its end goals).

## Features in Action

### Context Building
When you run `tenets distill "add mistral api to summarizer"`, tenets analyzes your codebase:

![Analyzing and ranking relevant files](/assets/projects/tenets/context-building-1.png)

![Building optimized context with intelligent summarization](/assets/projects/tenets/context-building-2.png)

You can also provide GitHub issue or Jira links, and tenets will fetch and extract those contents and consider them in the rankings of the files as well as contents to output as well in the final `distillation`.

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

## Technical Design

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

It's **important** to note that I advertise *thorough* mode in the features of tenets as being the best at exploring and finding relationships between code, not necessarily finding the most accurate context for your prompts. 

Embeddings see `process_batch()` and `handle_batch()` as semantically similar when you may need or want exact matches. 

## Configurable Output: Full Methods vs Smart Truncation

tenets can preserve complete methods or intelligently truncate:

```bash
# Never truncate - full methods only
tenets distill "refactor auth" --no-truncate --preserve-structure

# Smart truncation within token budget
tenets distill "refactor auth" --smart-summary --max-tokens 4000
```

With `--no-truncate`, we select whole methods by relevance:
```python
def extract_methods_smart(file, token_budget):
    methods = parse_ast(file)
    # Score each method
    for method in methods:
        method.score = calculate_relevance(method, query)
        method.tokens = count_tokens(method.body)

    # Greedy selection - highest value first
    selected = []
    remaining_tokens = token_budget
    for method in sorted(methods, key=lambda m: m.score, reverse=True):
        if method.tokens <= remaining_tokens:
            selected.append(method)
            remaining_tokens -= method.tokens
    return selected  # Complete methods only
```

Smart truncation preserves structure while condensing:
```python
def smart_truncate(method, max_tokens):
    # Always keep signature + docstring
    essential = extract_signature(method) + extract_docstring(method)

    # Prioritize: errors > control flow > implementation
    for line in method.body:
        if is_error_handling(line):
            priority = 3
        elif is_control_flow(line):
            priority = 2
        else:
            priority = 1
    # Take highest priority lines within budget
```

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

## Hundreds of Files Searched, Ranked, Analyzed, Aggregated, and Summarized in Seconds

The magic is aggressive parallelization at every stage:

```python
def rank_files_parallel(files, query, workers=8):
    # Phase 1: Build indices (sequential, 2-3s)
    bm25_corpus = BM25Corpus(files)
    import_graph = build_import_graph(files)

    # Phase 2: Parallel factor calculation (2-3s for 500 files)
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = []
        for file in files:
            future = executor.submit(calculate_all_factors,
                                   file, query, bm25_corpus, import_graph)
            futures.append((file, future))

        # Collect as they complete
        ranked = []
        for file, future in futures:
            factors = future.result(timeout=1.0)
            score = compute_weighted_score(factors)
            ranked.append((file, score, factors))

    return sorted(ranked, key=lambda x: x[1], reverse=True)
```

Weights dynamically adjust based on intent:
```python
if intent == "debug":
    weights["git_recency"] *= 2.0     # Recent changes matter
    weights["code_patterns"] *= 1.5   # Error handling patterns
elif intent == "refactor":
    weights["complexity_relevance"] *= 2.0  # Complex code needs refactoring
    weights["import_centrality"] *= 1.5     # Core abstractions
elif intent == "test":
    weights["path_relevance"] *= 2.0  # test/ directories
    weights["ast_relevance"] *= 1.5   # assert statements
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

The import time problem is real - `import transformers` cascades to torch (500ms), numpy (100ms), CUDA (200ms), totaling over 1 second. Our solution: defer until needed.

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

### AST-Aware Summarization

Rather than naive line truncation, we understand code structure:

```python
def summarize_with_ast(file_content, max_tokens):
    tree = ast.parse(file_content)

    # Extract and score structural elements
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            score = calculate_relevance(node, query)
            tokens = estimate_tokens(node)
            # Greedy selection within budget
```

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

## Real-World Performance

On actual codebases:

| Codebase | Files | Lines | Initial | Cached | Full Analysis |
|----------|-------|-------|---------|--------|---------------|
| FastAPI | 487 | 98K | 8.2s | 1.3s | 12.4s |
| Django | 2,841 | 584K | 42.1s | 4.7s | 67.3s |
| Small Project | 73 | 8K | 1.1s | 0.2s | 1.8s |

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

### Advanced Configuration
```bash
# Custom ranking weights
tenets rank "optimize queries" \
  --weight-keyword 0.3 \
  --weight-imports 0.2 \
  --weight-complexity 0.2

# Preserve full methods
tenets distill "understand payment flow" \
  --no-truncate \
  --preserve-structure \
  --include-docstrings
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

### Closing

We're closing in on a future where LLMs are becoming the glue to hold other pieces and services together that fundamentally should be deterministic, even to the point where it can become LLM calls verifying other LLM calls in guardrails or other forms of abstractions.

It seems like being in favor of "cleanliness" or perhaps laziness or just plain intentional design decisions to *not* utilize anything but LLMs for agency when we build and use AI agents, **choosing** to ignore existing, well-documented static solutions in text analysis and natural language processing, is going to be a decision that compounds in slight effects overtime to snowball into something contentious.

The future of AI pair programming isn't about throwing more compute at the problem or simply relying on models to get bigger and better.

**Install:** `pip install tenets`
**Docs:** [tenets.dev](https://tenets.dev)
**GitHub:** [github.com/jddunn/tenets](https://github.com/jddunn/tenets)