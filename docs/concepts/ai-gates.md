---
sidebar_position: 5
---

# AI-Native Gates

Rigour v2.17+ introduces AI-specific quality gates that detect patterns unique to AI-generated code. These gates work alongside traditional structural checks to provide a complete quality picture.

## Two-Score System

Every audit now produces two specialized scores in addition to the overall score:

| Score | What It Measures |
|:------|:-----------------|
| **ai_health_score** | Quality of AI-generated patterns: hallucinated imports, unhandled promises, async safety |
| **structural_score** | Traditional engineering quality: complexity, file size, documentation, security |

### CLI Output

```
✘ FAIL - Quality gate violations found.

Score: 72/100 | AI Health: 65/100 | Structural: 80/100
```

This separation helps teams understand whether quality issues come from AI drift or from traditional engineering debt.

---

## Provenance Tags

Every violation is tagged with a provenance category that indicates its origin:

| Tag | Description | Example Gates |
|:----|:------------|:--------------|
| `ai-drift` | Issues specific to AI-generated code | Hallucinated imports, promise safety |
| `traditional` | Standard engineering violations | File size, complexity, TODOs |
| `security` | Security vulnerability patterns | SQL injection, XSS, hardcoded secrets |
| `governance` | Process and governance violations | Missing docs, checkpoint failures |

Provenance tags appear in CLI output, fix packets, and audit reports.

---

## Severity-Weighted Scoring

Violations are weighted by severity when calculating scores:

| Severity | Point Deduction |
|:---------|:----------------|
| Critical | -20 points |
| High | -10 points |
| Medium | -5 points |
| Low | -2 points |
| Info | 0 points |

---

## Promise Safety Gate

Detects unhandled promises, missing error boundaries, and unsafe async patterns across 6 languages.

### Supported Languages

| Language | Patterns Detected |
|:---------|:-----------------|
| **JavaScript/TypeScript** | Missing `.catch()`, unhandled promise rejections, floating promises |
| **Python** | Missing `try/except` around `await`, bare `asyncio.create_task()` |
| **Go** | Unchecked goroutine errors, missing `errgroup` patterns |
| **Ruby** | Unrescued threads, missing `ensure` blocks |
| **C#** | Fire-and-forget `async void`, missing `ConfigureAwait` |
| **Java** | Uncaught `CompletableFuture` exceptions, missing `exceptionally()` |

### Configuration

```yaml
gates:
  promise_safety:
    enabled: true
    severity: high
```

---

## Hallucinated Imports Gate

Detects import statements that reference packages not present in the project's dependency manifest. This is one of the most common AI coding mistakes — the model "hallucinating" a package that doesn't exist.

### Supported Ecosystems

| Language | Manifest File | Import Pattern |
|:---------|:-------------|:--------------|
| **JavaScript/TypeScript** | `package.json` | `import ... from`, `require()` |
| **Python** | `requirements.txt`, `pyproject.toml` | `import`, `from ... import` |
| **Go** | `go.mod` | `import "..."` |
| **Ruby** | `Gemfile` | `require`, `gem` |
| **C#** | `*.csproj` | `using` |
| **Java** | `pom.xml`, `build.gradle` | `import` |

### Configuration

```yaml
gates:
  hallucinated_imports:
    enabled: true
    severity: critical
```

---

## Enabling AI Gates

All AI-native gates are **enabled by default** when you run `rigour init`. They are part of the Universal Config that every project inherits.

To disable a specific gate:

```yaml
gates:
  promise_safety:
    enabled: false
  hallucinated_imports:
    enabled: false
```
