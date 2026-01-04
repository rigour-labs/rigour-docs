---
sidebar_position: 2
---

# Quick Start

Get your first AI code review running in 60 seconds.

## Initialize Rigour

```bash
npx rigour init
```

This creates a `.rigour.yaml` configuration file with sensible defaults.

## Run Your First Check

```bash
npx rigour check
```

Rigour will analyze your staged changes and validate them against safety rules.

## Example Output

```bash
✓ No protected paths modified
✓ AST validation passed
✓ File count within limits (3/10)
✓ No dangerous patterns detected

All checks passed! 🎉
```

## What Gets Checked?

| Check | Description |
|-------|-------------|
| Protected Paths | Ensures critical files aren't modified |
| AST Validation | Verifies syntax is correct |
| File Limits | Prevents runaway changes |
| Pattern Detection | Catches dangerous code patterns |

## Integrate with AI Agents

Rigour works seamlessly with AI coding agents:

```bash
# In your agent's workflow
rigour check --ci --json
```

The `--ci` flag enables strict mode with non-zero exit codes on failure.

## Next Steps

- [Configuration](/getting-started/configuration) - Customize Rigour for your project
- [CLI Commands](/cli/commands) - Explore all available commands
