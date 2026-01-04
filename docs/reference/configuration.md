---
sidebar_position: 1
---

# Configuration Reference

Complete reference for `.rigour.yaml` configuration.

## Full Example

```yaml
# .rigour.yaml
version: "2"

# Files AI should never modify
protected_paths:
  - ".env*"
  - "*.lock"
  - ".git/**"
  - "node_modules/**"
  - "dist/**"

# Maximum files per change
max_files_touched: 10

# Language presets
presets:
  - typescript
  - react

# AST validation gates
gates:
  - no-eval
  - no-process-env-write

# Custom rules (advanced)
rules:
  require_tests: true
  max_line_length: 120
```

## Options Reference

### `version`

**Type:** `string`  
**Default:** `"2"`

Schema version for the config file.

---

### `protected_paths`

**Type:** `string[]`  
**Default:** `[".env*", "*.lock", ".git/**"]`

Glob patterns for files that cannot be modified.

---

### `max_files_touched`

**Type:** `number`  
**Default:** `10`

Maximum files that can be changed in one fix packet.

---

### `presets`

**Type:** `string[]`  
**Default:** `[]`

Language presets to enable. Options: `typescript`, `react`, `python`, `node`.

---

### `gates`

**Type:** `string[]`  
**Default:** `[]`

AST gates to enable. See [AST Gates](/concepts/ast-gates).

---

### `rules`

**Type:** `object`  
**Default:** `{}`

Custom validation rules.

| Rule | Type | Description |
|------|------|-------------|
| `require_tests` | `boolean` | Require test file changes |
| `max_line_length` | `number` | Max line length |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RIGOUR_CONFIG` | Custom config path |
| `RIGOUR_MAX_FILES` | Override max_files_touched |
| `RIGOUR_CI` | Enable CI mode |
