---
sidebar_position: 2
---

# Real-Time Hooks

Rigour hooks run **inside your AI coding tool** and catch issues the instant code is written — before files are saved, before CI runs, before code review.

![Rigour Demo](/img/demo.gif)

---

## How Hooks Work

When an AI agent writes code through Claude, Cursor, Cline, or Windsurf, Rigour's hook checker runs automatically on each file write. It performs four fast checks in under 100ms:

1. **File Size** — Blocks files that exceed your configured line limit
2. **Hardcoded Secrets** — Catches API keys, passwords, tokens with 20+ character values
3. **Hallucinated Imports** — Detects packages that don't exist in `node_modules` or the registry
4. **Command Injection** — Flags `exec()`/`spawn()` calls with template literals

---

## Installation

### Automatic (Recommended)

```bash
npx @rigour-labs/cli init
```

When `rigour init` detects your AI tool, it automatically installs hooks. No extra step needed.

### Manual

```bash
npx @rigour-labs/cli hooks init              # auto-detect tool
npx @rigour-labs/cli hooks init --tool claude   # specific tool
npx @rigour-labs/cli hooks init --tool cursor
npx @rigour-labs/cli hooks init --tool cline
npx @rigour-labs/cli hooks init --tool windsurf
```

### Dry Run

Preview what hooks will be installed without writing files:

```bash
npx @rigour-labs/cli hooks init --dry-run
```

---

## Supported Tools

| Tool | Config File | Trigger | Notes |
|------|------------|---------|-------|
| **Claude Code** | `.claude/settings.json` | Every file write | Integrates with Claude's native hook system |
| **Cursor** | `.cursor/hooks.json` | On save | Runs as pre-save hook |
| **Cline** | `.cline/hooks.json` | On file change | Watches file system events |
| **Windsurf** | `.windsurf/hooks.json` | On save | Runs as pre-save hook |

---

## What Hooks Catch

### Hardcoded Secrets (Critical)
```typescript
// BLOCKED by hook:
const API_KEY = "sk-live-4f3c2b1a0987654321abcdef";
```

### Hallucinated Imports (High)
```typescript
// BLOCKED by hook:
import { magicParser } from 'ai-data-magic';  // package doesn't exist
```

### Command Injection (Critical)
```typescript
// BLOCKED by hook:
exec(`rm -rf ${userInput}`);  // template literal in shell command
```

### File Size (Medium)
Files exceeding your configured line limit (default: 300 lines) are flagged before they grow out of control.

---

## Hook Output

When a hook catches an issue, your AI tool sees output like:

```
[rigour/hook] CRITICAL [security-patterns] src/auth.ts:3
  → Possible hardcoded secret or API key

[rigour/hook] HIGH [hallucinated-imports] src/data-loader.ts:2
  → Import 'ai-data-magic' does not resolve to an existing package
```

The AI agent can then self-correct before continuing.

---

## Configuration

Hooks respect your `rigour.yml` configuration. Key settings:

```yaml
gates:
  max_file_lines: 300          # file size limit
  security_patterns:
    enabled: true              # enable/disable security checks
  hallucinated_imports:
    enabled: true              # enable/disable import checks
```

---

## Overwriting Hooks

If hooks already exist, use `--force` to overwrite:

```bash
npx @rigour-labs/cli hooks init --force
```

---

## Next Steps

- **[CLI Commands](/cli/commands)**: Full reference including `hooks init` options.
- **[Security Patterns](/concepts/ai-gates)**: Deep dive into all 25+ vulnerability patterns.
- **[OWASP Coverage](/concepts/owasp-coverage)**: How hooks contribute to OWASP LLM Top 10 coverage.
