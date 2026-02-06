---
sidebar_position: 7
---

# Agent Teams

> **Available in Rigour v2.14+** | Requires Opus 4.6/GPT-5.3+ frontier models

Agent Teams enable Rigour to supervise multiple AI agents working together on the same codebase—a capability unlocked by frontier models like Claude Opus 4.6 (agent teams) and GPT-5.3-Codex (coworking mode).

## Why Agent Team Governance?

Traditional Rigour supervision assumes a single agent making changes. With frontier models now supporting:
- **Agent Teams** (Opus 4.6): Multiple agents collaborating with specialized roles
- **Coworking Mode** (GPT-5.3): Real-time steering during long-running tasks

New failure modes emerge:
- Cross-agent pattern conflicts
- Task ownership violations
- Handoff context loss
- Duplicate work detection failures

## Configuration

```yaml
# rigour.yml
gates:
  agent_team:
    enabled: true
    max_concurrent_agents: 3
    cross_agent_pattern_check: true
    handoff_verification: true
    task_ownership: strict  # or "collaborative"
```

| Option | Default | Description |
|:---|:---:|:---|
| `enabled` | `false` | Enable multi-agent governance |
| `max_concurrent_agents` | `3` | Max agents in a session |
| `cross_agent_pattern_check` | `true` | Detect conflicting patterns |
| `handoff_verification` | `true` | Verify context at handoffs |
| `task_ownership` | `strict` | `strict` = 1 agent per file, `collaborative` = allow overlap |

## MCP Integration

Register agents via MCP:

```typescript
// Agent A registers
await mcp.call("rigour_agent_register", {
  cwd: "/project",
  agent_id: "agent-a",
  task_scope: ["src/api/**"]
});

// Agent B registers
await mcp.call("rigour_agent_register", {
  cwd: "/project",
  agent_id: "agent-b", 
  task_scope: ["src/ui/**"]
});
```

## Task Ownership Models

### Strict Mode (Default)

Each agent owns specific files/directories. Rigour blocks:
- Any agent editing files outside their scope
- Multiple agents claiming the same scope

**Best for**: Parallel development, clear separation of concerns

### Collaborative Mode

Agents can overlap with conflict resolution:
- Rigour detects conflicting changes
- Prompts for human arbitration via Studio

**Best for**: Pair programming, complex refactoring

## Cross-Agent Pattern Detection

Rigour detects when agents introduce conflicting patterns:

```
⛔ AGENT TEAM CONFLICT DETECTED

Agent A (src/api/users.ts):
  - Using: camelCase naming
  - Pattern: async/await

Agent B (src/api/orders.ts):
  - Using: snake_case naming  ← CONFLICT
  - Pattern: async/await      ✓ OK
```

## See Also

- [Checkpoint Supervision](./checkpoint-supervision.md) – Long-running task monitoring
- [MCP Server](../mcp/mcp-server.md) – Agent registration tools
