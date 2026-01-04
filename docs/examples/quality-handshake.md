# The Quality Handshake (SAST + DAST)

A truly production-ready supervisor understands that **Structure (Static)** and **Behavior (Dynamic)** must be verified together. Rigour bridges this gap by cross-referencing AST analysis with runtime test coverage.

## The SME Double-Key Logic
Rigour's `CoverageGate` implements a "Double-Key" verification system:

| Structural Risk (Static) | Required Coverage (Dynamic) | Rationale |
| :--- | :--- | :--- |
| **Simple** (Complexity < 5) | > 50% | Basic validation is sufficient for simple logic. |
| **Complex** (Complexity > 10) | > 80% | Complex branches MUST be proven at runtime. |
| **Critical** (Safety Gate Path) | > 95% | Security-sensitive paths require near-total coverage. |

## 🚀 Live Trace: The Quality Handshake
Watch how Rigour cross-references the `blunders.go` AST with the `lcov.info` dynamic report.

```bash
$ npx rigour check
```

#### Step 1: Identifying "Blind Spots"
Rigour detects that `go/blunders.go` has a **SME_COGNITIVE_LOAD** failure (Complexity: 14).

#### Step 2: Verifying Dynamic Proof
Rigour checks the `lcov.info` and finds:
- File `go/blunders.go` has only **20.00%** coverage.

#### Step 3: Triggering the Handshake Failure
> **[DYNAMIC_COVERAGE_LOW]** Low coverage for high-risk file: `go/blunders.go`
> 
> **Details**: Current coverage: 20%. Required: 80% due to structural risk (Complexity: 14).
> 
> **SME Insight**: You are deploying complex logic without runtime validation. This is a "Blind Spot" refactor.
> 
> **Resolution**: Add unit tests for the nested conditions in `complexNestedLogic`.

---

## Unified Quality Dashboard
Rigour synthesizes these results into a single score:

```json
{
  "status": "FAIL",
  "score": 42.5,
  "summary": {
    "structural_health": "FAIL (3 violations)",
    "test_confidence": "FAIL (1 blind spot)",
    "runtime_resilience": "PASS"
  }
}
```
