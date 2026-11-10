---
title: 'full-stack-eval-harness'
excerpt: 'LLM eval harness for testing prompts, RAG and model performance.'
date: '2026-11-09'
createdDate: '2026-02-06'
tags: 'typescript,llms,ai,evals,rag'
---

<a href="https://github.com/jddunn/full-stack-eval-harness" style="text-align: center" target="_blank" rel="noopener" class="md-link">GitHub</a>

Tests LLM prompts against datasets with configurable graders, runs experiments and compares results.

- Prompts are markdown files in families, datasets are CSV, graders are YAML.
- Graders cover faithfulness, LLM-as-judge rubrics, semantic similarity, exact-match, contains, regex and json-schema.
- Prompt variants run side by side on one dataset with an A/B comparison endpoint.
- RAG candidates can call different retrieval services and be graded on the same dataset.
