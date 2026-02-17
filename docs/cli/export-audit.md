---
sidebar_position: 6
---

# Export Audit

Generate a compliance audit package from the last quality gate check. The artifact compliance officers hand to auditors.

```bash
rigour export-audit [options]
```

## Options

| Flag | Default | Description |
|:-----|:--------|:------------|
| `-f, --format <type>` | `json` | Output format: `json` or `md` |
| `-o, --output <path>` | Auto | Custom output file path |
| `--run` | `false` | Run a fresh `rigour check` before exporting |

## Examples

```bash
# Export JSON audit package (default)
rigour export-audit

# Export human-readable Markdown report
rigour export-audit --format md

# Run fresh check, then export
rigour export-audit --run

# Custom output path
rigour export-audit -o compliance/audit-2025-Q1.json
```

---

## JSON Schema

The JSON audit package includes:

```json
{
  "schema_version": "1.0.0",
  "metadata": {
    "project": "my-app",
    "rigour_version": "2.0.0",
    "timestamp": "2025-06-15T10:30:00.000Z",
    "preset": "healthcare",
    "generated_by": "rigour export-audit"
  },
  "summary": {
    "status": "FAIL",
    "score": 72,
    "ai_health_score": 65,
    "structural_score": 80,
    "total_violations": 8
  },
  "severity_breakdown": {
    "critical": 0, "high": 2, "medium": 4, "low": 2, "info": 0
  },
  "provenance_breakdown": {
    "ai-drift": 3, "traditional": 3, "security": 2, "governance": 0
  },
  "gate_results": [...],
  "violations": [...],
  "score_trend": {
    "direction": "improving",
    "delta": 5.2,
    "recent_average": 72,
    "previous_average": 67
  },
  "recent_history": [...]
}
```

---

## Markdown Report

The `--format md` option generates a human-readable report with:

- Summary table (status, scores, violation count)
- Severity and provenance breakdowns
- Gate results table (pass/fail per gate)
- Detailed violation list with severity, files, and hints
- Score trend analysis (if history exists)

---

## CI Integration

```yaml
# GitHub Actions
- name: Export audit
  run: |
    npx rigour check --ci
    npx rigour export-audit --format json -o audit-report.json

- name: Upload audit artifact
  uses: actions/upload-artifact@v4
  with:
    name: rigour-audit
    path: audit-report.json
```

---

## Score Trending

The audit package includes score trend data when history exists. See [Score Trending](/concepts/score-trending) for details on how scores are tracked over time.
