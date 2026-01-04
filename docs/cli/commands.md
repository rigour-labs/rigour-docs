---
sidebar_position: 1
---

# CLI Commands

Complete reference for all Rigour CLI commands.

## `rigour check`

Validate staged changes against safety rules.

```bash
rigour check [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--ci` | CI mode with strict exit codes |
| `--json` | Output results as JSON |
| `--config <path>` | Custom config file path |
| `--verbose` | Detailed output |

### Examples

```bash
# Basic check
rigour check

# CI pipeline
rigour check --ci --json

# Custom config
rigour check --config ./custom-rigour.yaml
```

---

## `rigour init`

Initialize Rigour in your project.

```bash
rigour init [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--preset <name>` | Use a specific preset |
| `--force` | Overwrite existing config |

### Examples

```bash
# Default initialization
rigour init

# With TypeScript preset
rigour init --preset typescript
```

---

## `rigour explain`

Get detailed explanation of validation results.

```bash
rigour explain [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--fix-packet <path>` | Analyze a specific fix packet |
| `--verbose` | Include AST details |

### Examples

```bash
# Explain last check
rigour explain

# Analyze fix packet
rigour explain --fix-packet ./fix.json
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | All checks passed |
| `1` | Validation failed |
| `2` | Configuration error |
