---
sidebar_position: 2
---

# Fix Packet

The standard format for AI-generated code changes.

## Overview

A Fix Packet is a JSON structure that describes a set of file changes. It's the universal format Rigour uses to validate AI agent output.

## Schema

```json
{
  "version": "2",
  "description": "Add user authentication",
  "files": [
    {
      "path": "src/auth.ts",
      "action": "create",
      "content": "export function login() { ... }"
    },
    {
      "path": "src/index.ts",
      "action": "modify",
      "diff": "@@ -1,3 +1,4 @@\n+import { login } from './auth';\n ..."
    }
  ]
}
```

## File Actions

| Action | Description |
|--------|-------------|
| `create` | Create a new file |
| `modify` | Modify existing file |
| `delete` | Delete a file |
| `rename` | Rename/move a file |

## Fields

### `version`
Schema version. Currently `"2"`.

### `description`
Human-readable description of the changes.

### `files`
Array of file operations.

### `files[].path`
Relative path to the file.

### `files[].action`
One of: `create`, `modify`, `delete`, `rename`.

### `files[].content`
Full file content (for `create` or full replacement).

### `files[].diff`
Unified diff format (for `modify`).

## Validation

Rigour validates fix packets against:

- ✓ Protected paths
- ✓ File count limits
- ✓ AST validity (for code files)
- ✓ Dangerous patterns
