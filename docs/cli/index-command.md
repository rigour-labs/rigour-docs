---
sidebar_position: 4
---

# CLI: Index Command

Build a semantic index of your codebase patterns for AI-powered search and analysis.

## Overview

The `rigour index` command scans your codebase and builds a searchable index of:
- Functions and their signatures
- Classes and their methods
- Architectural patterns
- Code conventions
- Dependencies and their versions

This index powers the Pattern Index MCP tools (`rigour_find_patterns`, `rigour_detect_staleness`).

## Usage

```bash
# Build the index with default settings
rigour index

# Build with semantic embeddings (slower, more powerful)
rigour index --semantic

# Specify output location
rigour index --output .rigour/pattern-index.json
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `--semantic` | Enable semantic embeddings for natural language search | `false` |
| `--output` | Custom output path for the index file | `.rigour/pattern-index.json` |

## How It Works

1. **Discovery**: Scans your project for code files (respects `.gitignore`).
2. **Parsing**: Extracts functions, classes, and patterns using AST parsing.
3. **Indexing**: Builds a searchable structure with metadata.
4. **Embeddings** (optional): Generates vector embeddings for semantic search.

## Index Structure

The generated index contains:

```json
{
  "version": "1.0.0",
  "generatedAt": "2026-01-28T09:00:00Z",
  "entries": [
    {
      "name": "AuthService.validateToken",
      "type": "function",
      "path": "src/services/auth.ts",
      "signature": "(token: string) => Promise<User>",
      "complexity": 5,
      "embedding": [0.123, 0.456, ...]
    }
  ]
}
```

## Best Practices

1. **Run on CI**: Regenerate the index on each merge to `main`.
2. **Commit the Index**: Include `.rigour/pattern-index.json` in version control.
3. **Use Semantic Mode**: Enable `--semantic` for codebases > 10k LOC.

## Integration with MCP

Once indexed, AI agents can use:
- `rigour_find_patterns` — Search patterns by keyword or semantically.
- `rigour_detect_staleness` — Find outdated or deprecated patterns.

```bash
# Build and use immediately
rigour index --semantic
```
