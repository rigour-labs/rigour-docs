---
sidebar_position: 4
---

# Presets

Language-specific validation bundles.

## What Are Presets?

Presets are pre-configured bundles of validation rules optimized for specific languages and frameworks.

## Available Presets

### `typescript`

TypeScript/JavaScript projects.

**Includes:**
- TypeScript AST validation
- Import/export checking
- Type-aware gates

```yaml
presets:
  - typescript
```

### `react`

React/Next.js applications.

**Includes:**
- JSX validation
- Hook rules checking
- Component patterns

```yaml
presets:
  - react
```

### `python`

Python projects.

**Includes:**
- Python AST validation
- Import checking
- PEP 8 basics

```yaml
presets:
  - python
```

### `node`

Node.js backend projects.

**Includes:**
- CommonJS/ESM validation
- Security gates (no-eval, etc.)
- File system protection

```yaml
presets:
  - node
```

## Combining Presets

Use multiple presets together:

```yaml
presets:
  - typescript
  - react
  - node
```

## Auto-Detection

Rigour can auto-detect which presets to use based on your project:

```bash
npx @rigour-labs/cli init
```

This scans `package.json`, file extensions, and project structure to suggest the best configuration.
