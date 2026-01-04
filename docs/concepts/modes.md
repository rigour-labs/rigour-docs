---
sidebar_position: 4
---

# Advisor vs. Supervisor

Rigour operates in two distinct modes depending on how you integrate it into your workflow.

## 1. Advisor Mode (MCP)

In **Advisor Mode**, Rigour acts as a high-fidelity consultant for your AI agent.

- **Role**: Pre-flight Validator.
- **Trigger**: The agent proactively calls Rigour tools (e.g., `rigour_check`) to verify its work.
- **UX**: Seamlessly integrated into IDEs like **Cursor** or **Cline**.
- **Philosophy**: Agent-driven. The agent asks: *"Is this code good enough to commit?"*

### When to use:
- Interactive development in an IDE.
- Complex refactors where the agent needs frequent feedback before finishing a turn.

---

## 2. Supervisor Mode (CLI Loop)

In **Supervisor Mode**, Rigour acts as the "governor" of the entire process.

- **Role**: Iterative Controller.
- **Trigger**: You run `rigour run -- <agent-command>`.
- **UX**: Terminal-based, wrapping agents like **Claude Code**.
- **Philosophy**: Tool-driven. Rigour says: *"You are not finished until these gates pass. Here is what you failed."*

### When to use:
- Headless automation or CI/CD pipelines.
- Terminal-based coding agents.
- Ensuring 100% compliance without manual re-prompting.

---

## Comparison Summary

| Feature | Advisor (MCP) | Supervisor (CLI) |
|:---|:---|:---|
| **Primary Tool** | `@rigour-labs/mcp` | `@rigour-labs/cli` |
| **Control Flow** | Agent calls Rigour | Rigour wraps Agent |
| **UX** | VS Code / JetBrains / Desktop | Terminal / Shell |
| **Feedback** | Interactive Response | Loop Iterations |
| **Example Agent** | Cursor, Cline, Gemini Desktop | Claude Code, Shell Agents |
