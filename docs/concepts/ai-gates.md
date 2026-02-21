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

### Supported Languages (8 ecosystems)

| Language | Stdlib Whitelist | Dependency Manifest | Import Patterns |
|:---------|:----------------|:-------------------|:---------------|
| **JavaScript/TypeScript** | Node.js 22.x builtins (45+ modules) | `package.json` + `node_modules` | `import ... from`, `require()`, `export from` |
| **Python** | 160+ stdlib modules (3.12+) | Local module resolution | `import`, `from ... import` |
| **Go** | 150+ stdlib packages (1.22+) | `go.mod` module path, aliased imports | `import "..."`, `import alias "..."` |
| **Ruby** | 80+ stdlib gems (Ruby 3.3+ MRI) | `Gemfile`, `.gemspec` (`add_dependency`) | `require`, `require_relative` |
| **C# / .NET** | .NET 8 framework + 30+ ecosystem prefixes | `.csproj` NuGet `PackageReference` | `using`, `using static` |
| **Rust** | `std`/`core`/`alloc`/`proc_macro` | `Cargo.toml` (handles `-` → `_`) | `use`, `extern crate`, `pub use` |
| **Java** | `java.*`/`javax.*`/`jakarta.*`/`android.*` | `build.gradle`, `pom.xml` | `import`, `import static` |
| **Kotlin** | `kotlin.*`/`kotlinx.*` + Java interop | `build.gradle.kts` | `import` |

**False-positive avoidance strategy**: For Ruby, C#, Rust, Java, and Kotlin, the gate only flags imports when dependency context exists (Gemfile, .csproj, Cargo.toml, build.gradle). Without a manifest, no assumptions are made.

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

---

## Deep Analysis Gate (LLM-Powered)

Beyond pattern-based AI gates, Rigour v2.20+ introduces **Deep Analysis** — an LLM-powered gate that interprets AST facts to detect semantic issues across 40+ code quality categories.

### How It Differs

| Aspect | Pattern-Based Gates | Deep Analysis |
|:---|:---|:---|
| **What it checks** | Imports, promises, async safety | SOLID, design patterns, concurrency, testing, architecture |
| **Input** | Import statements, Promise chains | Full AST + code structure |
| **Analysis** | Regex + AST pattern matching | LLM semantic interpretation |
| **Verification** | Direct match | AST verification to drop hallucinations |
| **Categories** | 2 main patterns | 40+ findable issues |
| **Cost** | Free | API-based (pay per check) |

### Deep Analysis Categories

Deep Analysis organizes findings across 9 engineering domains:
- **SOLID Principles**: SRP, OCP, LSP, ISP, DIP violations
- **Design Patterns**: Factory, Strategy, Observer, Decorator, Singleton, Adapter
- **DRY Principle**: Duplicated logic, test fixtures, validation
- **Error Handling**: Missing context, silent swallowing, error propagation
- **Concurrency**: Race conditions, deadlocks, goroutine leaks, thread safety
- **Testing**: Untested paths, coverage gaps, flaky tests, isolation issues
- **Architecture**: Circular dependencies, leaky abstractions, layer violations
- **Language Idioms**: Go error checks, TypeScript async/await, Python idioms, Rust unwrap usage
- **Performance**: N+1 patterns, inefficient algorithms, memory leaks

### Language Support

Deep Analysis has specialized support for all major languages:
Go, TypeScript/JavaScript, Python, Rust, Java, C#, C/C++, Ruby, PHP, Swift, Kotlin

### Getting Started

Enable Deep Analysis in your config:

```yaml
gates:
  deep:
    enabled: true
    provider: anthropic
    model: claude-opus-4-6
    checks:
      - solid_principles
      - design_patterns
      - error_handling
      - concurrency
```

Then run:
```bash
rigour check --deep
```

See [Deep Analysis](/concepts/deep-analysis) for complete documentation, configuration options, multi-agent analysis, and cost considerations.
