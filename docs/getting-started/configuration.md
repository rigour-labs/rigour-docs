---
sidebar_position: 3
---

# Configuration

Customize Rigour for your project with `.rigour.yaml`.

## Configuration File

Create `.rigour.yaml` in your project root:

```yaml
# .rigour.yaml
version: "2"

# Protected paths that AI should never modify
protected_paths:
  - ".env*"
  - "*.lock"
  - ".git/**"
  - "node_modules/**"

# Maximum files that can be changed in one fix
max_files_touched: 10

# Language-specific settings
presets:
  - typescript
  - react

# Custom AST gates
gates:
  - no-eval
  - no-process-env-write
```

## Configuration Options

### `protected_paths`

Glob patterns for files that should never be modified by AI agents.

```yaml
protected_paths:
  - ".env*"           # Environment files
  - "package-lock.json"  # Lock files
  - "**/*.min.js"     # Minified files
```

### `max_files_touched`

Maximum number of files that can be changed in a single fix packet.

```yaml
max_files_touched: 10  # Default: 10
```

### `presets`

Enable language-specific validation rules.

```yaml
presets:
  - typescript    # TypeScript AST validation
  - react         # React-specific patterns
  - python        # Python syntax checking
```

### `gates`

Custom validation gates for your project.

```yaml
gates:
  - no-eval           # Block eval() usage
  - no-console-log    # No console.log in production
```

## Environment Variables

Override config via environment:

```bash
RIGOUR_MAX_FILES=5 rigour check
```

## Next Steps

- [CLI Commands](/cli/commands) - See all available commands
- [Presets](/concepts/presets) - Learn about language presets
