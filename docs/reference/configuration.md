---
sidebar_position: 1
---

# Configuration Reference

Complete reference for `rigour.yml` configuration.

## Full Example

```yaml
# rigour.yml
version: 1

# Project meta
preset: api
paradigm: oop

# Performance & UI commands
commands:
  format: "npm run format"
  test: "npm test"

# Quality Gates
gates:
  max_file_lines: 500
  forbid_todos: true
  
  # AST Gates
  ast:
    complexity: 10
    max_params: 5
    
  # Safety Rails
  safety:
    max_files_changed_per_cycle: 10
    protected_paths:
      - ".github/**"
      - "docs/**"
      - "rigour.yml"
```

## Options Reference

### `version`

**Type:** `number`  
**Default:** `1`

Schema version for the config file.

---

### `gates.safety.protected_paths`

**Type:** `string[]`  
**Default:** `[".github/**", "docs/**", "rigour.yml"]`

Glob patterns for files that cannot be modified by the agent.

---

### `gates.safety.max_files_changed_per_cycle`

**Type:** `number`  
**Default:** `10`

Maximum number of files that can be changed in a single agent turn before Rigour aborts.

---

### `preset`

**Type:** `string`  
**Options:** `api`, `ui`, `infra`, `data`

Project-level preset that defines default gate thresholds.

---

### `gates.ast`

**Type:** `object`

Configures syntax-aware gates.

| Option | Default | Description |
|:---|:---:|:---|
| `complexity` | `10` | Cyclomatic complexity limit |
| `max_params` | `5` | Max arguments per function |
| `max_function_lines` | `50` | Max lines per function |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RIGOUR_CI` | Enable CI mode (strict exit codes) |
| `RIGOUR_JSON` | Output report as JSON |
