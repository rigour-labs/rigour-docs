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
npx @rigour-labs/cli check

# CI pipeline
npx @rigour-labs/cli check --ci --json

# Custom config
npx @rigour-labs/cli check --config ./custom-rigour.yaml
```

---

## `rigour init`

Initialize Rigour in your project.

```bash
npx @rigour-labs/cli init [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--preset <name>` | Use a specific preset |
| `--force` | Overwrite existing config |

### Examples

```bash
# Default initialization
npx @rigour-labs/cli init

# With TypeScript preset
npx @rigour-labs/cli init --preset typescript
```

---

## `rigour explain`

Get detailed explanation of validation results.

```bash
npx @rigour-labs/cli explain [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--fix-packet <path>` | Analyze a specific fix packet |
| `--verbose` | Include AST details |

### Examples

```bash
# Explain last check
npx @rigour-labs/cli explain

# Analyze fix packet
npx @rigour-labs/cli explain --fix-packet ./fix.json
```

---

## `rigour run`

The **Supervisor Loop**. Executes an AI agent and automatically iterates until quality gates pass.

```bash
npx @rigour-labs/cli run [options] -- <agent-command>
```

### The Iterative Refinement Cycle
When you use `rigour run`, Rigour manages a stateful refinement loop:
1.  **Deploy**: Your agent (e.g., Claude Code) is executed with your prompt.
2.  **Snapshot**: Rigour monitors file changes in real-time.
3.  **Audit**: Quality gates are checked against the resulting state.
4.  **Refine**: If gates fail, Rigour generates a `rigour-fix-packet.json` (Diagnostic) and automatically re-invokes the agent to fix the violations.
5.  **Finish**: The loop exits when all gates `PASS` or the maximum iterations are reached.

### Options

| Flag | Default | Description |
|:---|:---:|:---|
| `--iterations <n>` | `3` | Maximum number of refinement cycles |
| `--fail-fast` | `false` | Terminate instantly on the first violation |

### Safety Rails
`rigour run` prevents "agent explosions" by monitoring the cycle delta. If an agent changes more than `max_files_changed_per_cycle` (set in `rigour.yml`), the loop is instantly aborted.

---

## Technical Reference: Exit Codes

Rigour uses standardized exit codes for reliable CI/CD and automation.

| Code | Meaning | Context |
|:---:|:---|:---|
| `0` | **PASS** | All quality gates were satisfied. |
| `1` | **FAIL** | One or more engineering violations were found. |
| `2` | **CONFIG_ERROR** | `rigour.yml` is missing or invalid. |
| `3` | **INTERNAL_ERROR** | Unexpected diagnostic or filesystem failure. |

See the [Exit Codes Guide](/cli/exit-codes) for advanced usage.
