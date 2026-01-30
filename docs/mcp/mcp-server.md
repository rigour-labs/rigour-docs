# MCP Server

Connect Rigour directly to your AI agents (Cursor, Claude Code, etc.) to enforce quality standards in real-time.

---

## ⚡ Quick Start

```bash
npx -y @rigour-labs/mcp
```

---

## 🔌 Integration Recipes

### 🤖 Claude Code
```bash
claude mcp add rigour npx -y @rigour-labs/mcp
```

### 🖱️ Cursor
1. Go to **Settings > Features > MCP**.
2. **+ Add New MCP Server**:
   - **Name**: `Rigour`
   - **Type**: `command`
   - **Command**: `npx -y @rigour-labs/mcp`

### 🛠️ Cline / Roo Code
Add this to your `cline_mcp_settings.json`:
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

---

## 🛠️ Essential Tools

Once connected, your AI agent will automatically use these tools:

| Tool | Purpose |
|:---|:---|
| `rigour_check` | Runs all quality gates on your code. |
| `rigour_run` | **Interceptable** command execution (e.g., tests, deploys). |
| `rigour_find_patterns` | Semantic search for codebase patterns. |
| `rigour_remember` | Persist architectural decisions in memory. |
| `rigour_recall` | Retrieve stored engineering context. |
| `rigour_get_fix_packet` | Get precise refactoring instructions on failure. |

---

## 🛡️ Interception (HITL)

Rigour allows human operators to intercept and arbitrate AI actions in real-time.

### How it works:
1. When an agent calls `rigour_run` to execute a command (like `npm test`), the Control Room **pauses** the execution.
2. A notification appears in the [Rigour Studio](/concepts/governance-studio).
3. The human operator clicks **Approve** or **Reject**.
4. Rigour resumes the agent task with the result of your decision.

*This ensures that no critical commands are run without explicit engineering oversight.*

---

## 💡 Pro Tip
Always keep the [Rigour Studio](/concepts/governance-studio) open on a second monitor while working with MCP agents. It provides a visual audit trail of everything the agent is doing.
