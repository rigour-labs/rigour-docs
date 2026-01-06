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
| `--interactive` | **New**: Rich, interactive terminal output |
| `--config <path>` | Custom config file path |

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

Initialize Rigour in your project. This command creates a `rigour.yml` file and can automatically detect your project's role and coding paradigm.

```bash
npx @rigour-labs/cli init [options]
```

### Options

| Flag | Description |
|------|-------------|
| `--preset <name>` | Explicitly set a **Project Role** (`api`, `ui`, `infra`, `data`) |
| `--paradigm <name>` | Explicitly set a **Coding Paradigm** (`oop`, `functional`) |
| `--force` | Overwrite existing `rigour.yml` config |

### Project Roles (`--preset`)
Roles define the high-level engineering standards and gate thresholds.

| Role | Target | Key Differentiators |
|:---|:---|:---|
| `api` | Backend Services | 400 line limit, strict SOLID enforcement |
| `ui` | Web/Frontends | 300 line limit, JSX-aware complexity |
| `infra` | IaC (Terraform) | Protected `.github/` and CI configs |
| `data` | Data/ML Pipelines | 500 line limit, reproducibility gates |

### Coding Paradigms (`--paradigm`)
Paradigms layer specific AST (Abstract Syntax Tree) rules on top of your role.

| Paradigm | Key Gates |
|:---|:---|
| `oop` | Max inheritance depth (3), Method counts (10/class) |
| `functional` | Max nesting (3), Function length (40 lines) |

### Examples

```bash
# Default initialization (Auto-discovery)
npx @rigour-labs/cli init

# Explicitly use API role with OOP paradigm
npx @rigour-labs/cli init --preset api --paradigm oop
```

### Framework Compatibility (Safe Scaffolding)
Many framework CLI tools (like `create-next-app` or `npm init vite`) require the target directory to be **completely empty**. If you run `rigour init` first, these tools will fail.

**Best Practice**:
1. Run your framework initializer first.
2. Run `rigour init` second to layer your engineering standards on top.

**If you already initialized Rigour**:
Simply move `rigour.yml` and the `docs/` folder aside temporarily, run your framework command, and move them back. AI Agents using Rigour have a built-in workflow to handle this automatically.

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

---

## Technical Reference: The Quality Score

Rigour calculates a **Total Quality Score (0-100)** for every audit run. This score is included in the JSON report and displayed in human-readable summaries.

### How it's calculated:
- **Base Score**: 100
- **Structural Violations**: -5 points per failure (e.g., SME_COGNITIVE_LOAD).
- **Security Violations**: -10 points per failure (e.g., SME_SECURITY_SINK).
- **Dynamic Violations**: -15 points per blind spot (e.g., DYNAMIC_COVERAGE_LOW).

| Code | Meaning | Context |
|:---:|:---|:---|
| `0` | **PASS** | All quality gates were satisfied (Score > Threshold). |
| `1` | **FAIL** | One or more engineering violations were found. |
| `2` | **CONFIG_ERROR** | `rigour.yml` is missing or invalid. |
| `3` | **INTERNAL_ERROR** | Unexpected diagnostic or filesystem failure. |

See the [Exit Codes Guide](/cli/exit-codes) for advanced usage.
