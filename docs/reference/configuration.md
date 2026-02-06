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

### `ignore`

**Type:** `string[]`  
**Default:** Auto-detected based on preset

Glob patterns for files/directories to exclude from quality checks. When you run `rigour init`, this is automatically populated based on your project type.

```yaml
ignore:
  - ".git/**"
  - "node_modules/**"
  - "venv/**"
  - "__pycache__/**"
  - "*.pyc"
```

> [!TIP]
> The scanner always ignores `node_modules/**`, `dist/**`, `.git/**` at runtime even if not listed. Explicit ignores in the config are useful for project-specific patterns.

---

### `architecture.boundaries`

**Type:** `array`  
**Description:** Enforce strict layering rules by forbidding specific import paths based on the file's location.

```yaml
gates:
  architecture:
    boundaries:
      - from: "src/api/**"
        to: "src/ui/**"
        mode: "deny"
      - from: "packages/core/**"
        to: "packages/cli/**"
        mode: "deny"
```

| Property | Description |
|:---|:---|
| `from` | Glob pattern representing the source file(s). |
| `to` | Glob pattern representing the forbidden import/path. |
| `mode` | Currently only `deny` is supported for strict isolation. |

**How it works**: Rigour's AST engine scans your import declarations. If a file matching the `from` pattern attempts to import a module matching the `to` pattern, the audit fails. This is essential for preventing circular dependencies and leaky abstractions in large monorepos.

---

### `gates.dependencies.forbid`

**Type:** `string[]`  
**Description:** Prevent specific third-party packages from being added to your project.

```yaml
gates:
  dependencies:
    forbid:
      - "lodash" # Use native ES6 instead
      - "axios"  # Use fetch
```

---

### `gates.ast`

**Type:** `object`
**Description:** Configures syntax-aware gates for code quality.

| Option | Default | Description |
|:---|:---:|:---|
| `complexity` | `10` | **SME Logic**: Cognitive complexity limit (cyclomatic + nesting depth). |
| `max_methods` | `10` | Max methods allowed per class. |
| `max_params` | `5` | Max arguments allowed per function signature. |
| `max_function_lines` | `50` | Max lines of code per function body. |

---

### `gates.coverage`
**Description**: Enables the "Quality Handshake" between static structural risks and dynamic runtime coverage.

| Option | Type | Description |
|:---|:---:|:---|
| `risk_adjusted` | `boolean` | If true, complex files (complexity > 10) require >80% coverage. |

---

### `gates.agent_team` (v2.14+)
**Description**: Configures multi-agent governance for frontier models (Opus 4.6, GPT-5.3).

```yaml
gates:
  agent_team:
    enabled: true
    max_concurrent_agents: 3
    cross_agent_pattern_check: true
    handoff_verification: true
    task_ownership: strict
```

| Option | Default | Description |
|:---|:---:|:---|
| `enabled` | `false` | Enable multi-agent governance. |
| `max_concurrent_agents` | `3` | Maximum agents in a session. |
| `cross_agent_pattern_check` | `true` | Detect conflicting patterns across agents. |
| `handoff_verification` | `true` | Verify context at agent handoffs. |
| `task_ownership` | `strict` | `strict` = 1 agent/file, `collaborative` = overlap OK. |

---

### `gates.checkpoint` (v2.14+)
**Description**: Configures checkpoint supervision for long-running agent tasks.

```yaml
gates:
  checkpoint:
    enabled: true
    interval_minutes: 15
    quality_threshold: 80
    drift_detection: true
```

| Option | Default | Description |
|:---|:---:|:---|
| `enabled` | `false` | Enable checkpoint supervision. |
| `interval_minutes` | `15` | Time between checkpoint checks. |
| `quality_threshold` | `80` | Minimum score to continue (0-100). |
| `drift_detection` | `true` | Monitor for quality regression over time. |
| `auto_save_on_failure` | `true` | Save work before aborting on failure. |

---

### `gates.security.patterns` (v2.14+)
**Description**: Configures pattern-based security vulnerability detection.

```yaml
gates:
  security:
    patterns:
      enabled: true
      sql_injection: true
      xss: true
      path_traversal: true
      hardcoded_secrets: true
      insecure_randomness: true
    block_on_severity: high
```

| Option | Default | Description |
|:---|:---:|:---|
| `enabled` | `false` | Enable security pattern scanning. |
| `sql_injection` | `true` | Detect SQL injection patterns. |
| `xss` | `true` | Detect XSS vulnerabilities. |
| `path_traversal` | `true` | Detect path traversal attacks. |
| `hardcoded_secrets` | `true` | Detect hardcoded API keys/passwords. |
| `insecure_randomness` | `true` | Detect insecure random number usage. |
| `block_on_severity` | `high` | Block commits on this severity or above (`critical`, `high`, `medium`). |

---

## Universal Language Support
Rigour provides built-in, syntax-aware AST analysis for:
**TypeScript, JavaScript, Go, Rust, Python, Java, C#, C, C++, PHP, Swift, and Kotlin.**

---

## Custom Command Gates (Agnosticism)

The most powerful feature of Rigour is its ability to wrap **any** third-party tool as a first-class quality gate. Use this to extend Rigour beyond its built-in SME logic:

```yaml
commands:
  # Wrap security scanners
  security: "trivy fs ."
  
  # Wrap custom domain rules
  custom: "./scripts/my-logic.sh"
```

### The "Universal Handshake"
When you define a command:
1.  **Execution**: Rigour runs the command in your project's `cwd`.
2.  **Validation**: If the command exits with **Code 0**, it `PASSES`. If it exits with any other code, it `FAILS`.
3.  **Feedback**: The `stderr` or `stdout` from your tool is automatically captured and placed into the **Fix Packet**.
4.  **Refinement**: AI agents will read your tool's raw output and attempt to fix the code to make the gate pass.

This allows you to bring your existing enterprise toolchain into the Rigour supervisor loop.
