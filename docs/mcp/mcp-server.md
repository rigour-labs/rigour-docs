---
sidebar_position: 1
---

# MCP Server

Integrate Rigour with AI agents via Model Context Protocol (MCP).

## Overview

Rigour provides an MCP server that allows AI coding agents to validate their changes before finalizing a task. Unlike traditional linters, Rigour is designed to be consumed by agents to enforce engineering standards.

## Installation

```bash
npx @rigour-labs/mcp
```
Or install globally:
```bash
npm install -g @rigour-labs/mcp
```

## Configuration

Add Rigour to your MCP client configuration (e.g., Claude Desktop or Cursor):

```json
{
  "mcpServers": {
    "rigour": {
      "command": "npx",
      "args": ["-y", "@rigour-labs/mcp"]
    }
  }
}
```

## Available Tools

The MCP server exposes tools for validation and project reasoning.

### `rigour_check`

Runs the full suite of Rigour quality gates on the current project state.

**Arguments:**
- `cwd` (optional): Absolute path to the project root.

### `rigour_explain`

Provides a human-readable explanation of why the last quality gate check failed.

**Arguments:**
- `cwd` (optional): Absolute path to the project root.

### `rigour_status`

A lightweight PASS/FAIL check that returns structured JSON. Ideal for agent polling.

**Arguments:**
- `cwd` (optional): Absolute path to the project root.

### `rigour_get_fix_packet`

Retrieves the prioritized **Fix Packet (Diagnostic)** containing actionable instructions for the agent to resolve quality gate violations.

### `rigour_list_gates` & `rigour_get_config`

Utility tools that allow the agent to inspect active gates and the project's `rigour.yml` configuration.

## The Stateless Workflow

Rigour's MCP tools operate on the **current filesystem state**. Agents should follow this loop:

1.  **Work**: Apply changes to the codebase.
2.  **Audit**: Call `rigour_check` or `rigour_status`.
3.  **Refine**: If failures occur, call `rigour_get_fix_packet` or `rigour_explain` once to get instructions.
4.  **Repeat**: Resolve the issues and audit again until `PASS`.

## Best Practices

1. **Audit Before Done**: Never claim a task is complete without a `PASS` status from Rigour.
2. **Read the Packet**: Use `rigour_get_fix_packet` to understand *how* to refactor (e.g., extracting functions to reduce complexity).
3. **Reason about Rules**: Use `rigour_get_config` to understand project-specific constraints like protected paths or forbidden dependencies.
