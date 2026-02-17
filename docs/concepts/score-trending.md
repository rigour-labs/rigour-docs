---
sidebar_position: 7
---

# Score Trending

Rigour v2.17+ tracks quality scores over time, enabling trend analysis and compliance dashboards.

## How It Works

Every time `rigour check` runs, a score entry is appended to `.rigour/score-history.jsonl`. This file uses JSONL (JSON Lines) format — one JSON object per line — to avoid read-modify-write race conditions when multiple agents run checks concurrently.

### Score Entry Format

```json
{
  "timestamp": "2025-06-15T10:30:00.000Z",
  "status": "FAIL",
  "score": 78,
  "ai_health_score": 72,
  "structural_score": 85,
  "failureCount": 5,
  "severity_breakdown": { "high": 1, "medium": 3, "low": 1 },
  "provenance_breakdown": { "ai-drift": 2, "traditional": 2, "security": 1 }
}
```

---

## Trend Detection

After 3+ runs, Rigour calculates a score trend by comparing the average of the last 5 scores against the previous 5 scores.

| Direction | Condition | Meaning |
|:----------|:----------|:--------|
| **Improving** | Delta > +3 | Scores are trending upward |
| **Stable** | Delta between -3 and +3 | Scores are holding steady |
| **Degrading** | Delta < -3 | Scores are trending downward |

### CLI Output

When a trend is available, `rigour check` displays it in the footer:

```
Score Trend: 78 → 82 → 85 → 88 → 92 (improving ↑)
```

---

## History Management

- **Auto-trim:** The history file is automatically trimmed to the last 100 entries on every write.
- **Location:** `.rigour/score-history.jsonl` in the project root.
- **Git:** You may want to add `.rigour/` to `.gitignore` or commit it for team visibility.

---

## Integration with Export Audit

The `rigour export-audit` command includes score trend data in the audit package:

```json
{
  "score_trend": {
    "direction": "improving",
    "delta": 5.2,
    "recent_average": 88,
    "previous_average": 83,
    "last_scores": [82, 85, 88, 90, 92]
  },
  "recent_history": [
    { "timestamp": "...", "score": 92, "status": "PASS" },
    { "timestamp": "...", "score": 90, "status": "PASS" }
  ]
}
```

This provides auditors with a clear picture of quality trajectory, not just a single-point-in-time score.

---

## Why JSONL?

The existing `adaptive-history.json` uses read-modify-write, which has race conditions if two agents run `rigour check` simultaneously. JSONL is append-only — safe for concurrent access without file locking.
