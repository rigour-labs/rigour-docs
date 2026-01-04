---
sidebar_position: 2
---

# Fix Packet (V2)

The high-fidelity communication bridge between Rigour and an AI agent.

## Overview

Unlike a traditional diff or patch, a **Rigour Fix Packet** is a **Diagnostic Format**. It does not provide the solution; instead, it provides the agent with structured, prioritized metadata about engineering violations that must be resolved to achieve a `PASS` state.

## Schema (V2)

```json
{
  "version": 2,
  "goal": "Achieve PASS state for all quality gates",
  "violations": [
    {
      "id": "ast-complexity",
      "gate": "ast",
      "severity": "high",
      "title": "Complexity Cap Exceeded",
      "details": "Function 'processData' has cyclomatic complexity of 15 (max: 10).",
      "files": ["src/parser.ts"],
      "metrics": {
        "current": 15,
        "max": 10
      },
      "instructions": [
        "Extract nested logic into a separate utility function.",
        "Replace the switch statement with a lookup table or polymorphic behavior."
      ]
    }
  ],
  "constraints": {
    "no_new_deps": true,
    "max_files_changed": 10,
    "protected_paths": [".github/**", "docs/**"]
  }
}
```

## Why Diagnostics over Patches?

Rigour follows a **Stateless** loop philosophy:
1. **Autonomy**: We trust the agent's ability to refactor. We simply provide the "Engineering Specs" it violated.
2. **Safety**: By providing violations rather than code, we ensure the agent remains responsible for the final implementation.
3. **Precision**: High-fidelity metrics (like exact complexity scores) help agents make surgical fixes rather than "guess-and-check" refactoring.

## Key Components

### `violations[]`
A list of specific gate failures. Each violation includes:
- **`details`**: Context-specific error message.
- **`instructions`**: Heuristic-based advice on how to resolve the issue.
- **`metrics`**: The raw data (e.g., line counts) that triggered the failure.

### `constraints`
Safety rails that the agent MUST respect during the refactoring process (e.g., not touching `docs/` or adding new `package.json` dependencies).

## Usage
Agents retrieve the latest Fix Packet by calling `rigour_get_fix_packet` (MCP) or by running `rigour explain` (CLI).
