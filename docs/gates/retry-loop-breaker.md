---
title: Retry Loop Breaker
description: Detects when agents are stuck in retry loops and forces consultation of official documentation
---

# Retry Loop Breaker Gate

The **Retry Loop Breaker** gate detects when an AI agent is stuck in a retry loop—repeatedly failing at the same operation without changing approach—and forces them to consult official documentation before continuing.

> [!NOTE]
> This gate is **enabled by default** and works universally across all operation types, not just specific tools or languages.

## The Problem

When AI agents encounter failures, they often:
1. Retry the same approach
2. Make minor tweaks without understanding the root cause
3. Continue guessing instead of consulting authoritative sources

This leads to **"vibe coding"**—solving problems through trial and error rather than understanding.

## How It Works

1. **Failures are recorded** in `.rigour/state.json` when operations fail
2. **Categories are auto-detected** from error patterns
3. **After N consecutive failures** in the same category, the gate FAILS
4. **The fix packet** instructs the agent to STOP and read official documentation

## Configuration

```yaml
gates:
  retry_loop_breaker:
    enabled: true           # Enable/disable the gate
    max_retries: 3          # Fail after this many consecutive failures
    auto_classify: true     # Auto-detect failure category from error message
    doc_sources:            # Custom documentation URLs per category
      deployment: "https://vercel.com/docs"
      module_resolution: "https://nodejs.org/api/esm.html"
```

## Failure Categories

The gate auto-classifies errors into these categories:

| Category | Error Patterns | Default Doc Hint |
|----------|----------------|------------------|
| `module_resolution` | `ERR_REQUIRE_ESM`, `Cannot find module`, `MODULE_NOT_FOUND` | Node.js ESM docs |
| `deployment` | `FUNCTION_INVOCATION_FAILED`, `Build Failed`, `deploy.*fail` | Platform docs |
| `runtime_error` | `TypeError`, `SyntaxError`, `ReferenceError`, `compilation.*error` | Language docs |
| `network` | `Connection refused`, `ECONNREFUSED`, `timeout`, `ETIMEDOUT` | Network config |
| `permissions` | `Permission denied`, `EACCES`, `EPERM` | File permissions |
| `resources` | `ENOMEM`, `heap out of memory`, `OOM` | Resource limits |
| `general` | Any unclassified error | Relevant docs |

## Example Output

When the gate detects a retry loop:

```json
{
  "id": "retry_loop_breaker",
  "title": "Retry Loop Detected: deployment",
  "details": "Operation 'deployment' has failed 4 times consecutively. Last error: FUNCTION_INVOCATION_FAILED",
  "hint": "STOP RETRYING. You are in a loop. Consult the official documentation: https://vercel.com/docs. Extract the canonical solution pattern and apply it."
}
```

## MCP Integration

For agents using the MCP server, two tools are available:

### `rigour_record_failure`

Record a failure when an operation fails:

```json
{
  "name": "rigour_record_failure",
  "arguments": {
    "cwd": "/path/to/project",
    "error_message": "FUNCTION_INVOCATION_FAILED: Cannot find module",
    "category": "deployment"  // Optional - auto-detected if omitted
  }
}
```

### `rigour_clear_failure`

Clear failure history after successful resolution:

```json
{
  "name": "rigour_clear_failure", 
  "arguments": {
    "cwd": "/path/to/project",
    "category": "deployment"  // Use "all" to clear everything
  }
}
```

## State File

Failure history is stored in `.rigour/state.json`:

```json
{
  "failureHistory": {
    "deployment": {
      "category": "deployment",
      "count": 4,
      "lastError": "FUNCTION_INVOCATION_FAILED",
      "lastTimestamp": "2026-01-06T11:00:00Z"
    }
  }
}
```

> [!TIP]
> Add `.rigour/state.json` to `.gitignore` to prevent committing local failure state.

## Custom Documentation Sources

Override the default documentation hints for specific categories:

```yaml
gates:
  retry_loop_breaker:
    doc_sources:
      deployment: "https://docs.mycompany.com/deployment"
      runtime_error: "https://docs.mycompany.com/debugging"
      module_resolution: "https://docs.mycompany.com/dependencies"
```

## Philosophy

> After N consecutive failures on the same operation category, **STOP GUESSING** and consult official documentation.

This gate enforces the principle that when you're stuck, the answer is almost always in the documentation—not in more guessing.
