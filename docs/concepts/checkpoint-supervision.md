---
sidebar_position: 8
---

# Checkpoint Supervision

> **Available in Rigour v2.14+** | For long-running agent tasks

Checkpoint Supervision enables Rigour to monitor agent quality during extended execution—essential for frontier models like GPT-5.3-Codex that support "coworking mode" with long-running autonomous tasks.

## The Problem

Traditional Rigour checks run at task completion. But with frontier models executing tasks over 15+ minutes:
- Agent behavior may **degrade over time** (drift)
- Large change sets become **harder to review**
- Early failures waste **accumulated work**

## How It Works

```
Task Start
    ↓
[15 min] → Checkpoint 1 → Score ≥ 80%? → Continue
    ↓                         ↓
[30 min] → Checkpoint 2 → Score < 80%? → Alert + Auto-Save
    ↓
Task Complete → Final Verification
```

## Configuration

```yaml
# rigour.yml
gates:
  checkpoint:
    enabled: true
    interval_minutes: 15
    quality_threshold: 80
    drift_detection: true
    auto_save_on_failure: true
```

| Option | Default | Description |
|:---|:---:|:---|
| `enabled` | `false` | Enable checkpoint supervision |
| `interval_minutes` | `15` | Time between checkpoints |
| `quality_threshold` | `80` | Min quality score to continue |
| `drift_detection` | `true` | Monitor for behavior regression |
| `auto_save_on_failure` | `true` | Save work before aborting |

## MCP Integration

Agents report checkpoints via MCP:

```typescript
await mcp.call("rigour_checkpoint", {
  cwd: "/project",
  progress_pct: 50,
  files_changed: ["src/api/users.ts", "src/api/orders.ts"],
  summary: "Implemented user and order API endpoints"
});

// Response
{
  continue: true,
  quality_score: 85,
  warnings: ["src/api/users.ts exceeds 300 lines"]
}
```

## Drift Detection

Rigour tracks quality scores over time to detect regression:

```
Checkpoint 1: 92% ✓
Checkpoint 2: 88% ✓
Checkpoint 3: 72% ⚠️ DRIFT DETECTED
```

When drift is detected:
1. Agent receives immediate feedback
2. Work is auto-saved
3. Studio shows drift timeline

## Studio Integration

The **Checkpoints** tab in Rigour Studio visualizes:
- Timeline of checkpoint events
- Quality score trends
- Drift detection alerts
- Auto-save recovery points

## Best Practices

1. **Set realistic intervals**: 15 min default works for most tasks
2. **Tune quality threshold**: Lower for exploratory work, higher for production code
3. **Review drift patterns**: Use Studio to identify when/why quality degrades

## See Also

- [Agent Teams](./agent-teams.md) – Multi-agent coordination
- [Configuration Reference](../reference/configuration.md) – Gate configuration
