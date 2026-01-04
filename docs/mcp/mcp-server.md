---
sidebar_position: 1
---

# MCP Server

Integrate Rigour with AI agents via Model Context Protocol (MCP).

## Overview

Rigour provides an MCP server that allows AI coding agents to validate their changes before applying them.

## Installation

```bash
npm install -g @rigour/mcp
```

## Configuration

Add Rigour to your MCP client configuration:

```json
{
  "mcpServers": {
    "rigour": {
      "command": "rigour-mcp",
      "args": ["--config", ".rigour.yaml"]
    }
  }
}
```

## Available Tools

The MCP server exposes the following tools:

### `rigour_check`

Validate a fix packet before applying.

```typescript
{
  "name": "rigour_check",
  "arguments": {
    "fix_packet": {
      "files": [
        {
          "path": "src/index.ts",
          "action": "modify",
          "content": "..."
        }
      ]
    }
  }
}
```

### `rigour_explain`

Get detailed feedback on validation results.

```typescript
{
  "name": "rigour_explain",
  "arguments": {
    "validation_id": "abc123"
  }
}
```

## Integration Example

```typescript
// In your AI agent
const result = await mcp.callTool("rigour_check", {
  fix_packet: myChanges
});

if (!result.valid) {
  // Handle validation failure
  console.log(result.errors);
}
```

## Best Practices

1. **Always validate before applying** - Call `rigour_check` before writing files
2. **Handle failures gracefully** - Use `rigour_explain` to understand issues
3. **Respect protected paths** - Don't attempt to modify protected files
