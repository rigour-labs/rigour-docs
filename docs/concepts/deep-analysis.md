---
sidebar_position: 6
---

# Deep Analysis (LLM-Powered)

Rigour's Deep Analysis extends traditional AST-based quality checking with LLM-powered semantic interpretation. It analyzes code against 40+ quality categories organized by engineering discipline, verifies findings through AST validation, and supports multi-agent parallel analysis on cloud.

## Three-Step Pipeline

Deep Analysis operates in three distinct phases:

1. **AST Extraction**: Parse code into Abstract Syntax Trees and extract structural facts
2. **LLM Interpretation**: Send facts to an LLM with domain-specific prompts for semantic analysis
3. **AST Verification**: Cross-check LLM findings against the AST to drop hallucinations

This verification loop ensures every finding is grounded in verifiable code structure.

---

## 40+ Finding Categories

Deep Analysis organizes its checks across 9 engineering domains:

### SOLID Principles
- Single Responsibility Principle (SRP) violations
- Open/Closed Principle (OCP) violations
- Liskov Substitution Principle (LSP) violations
- Interface Segregation Principle (ISP) violations
- Dependency Inversion Principle (DIP) violations

### Design Patterns
- Factory pattern candidates
- Strategy pattern misapplications
- Observer pattern violations
- Decorator pattern opportunities
- Singleton pattern abuse
- Adapter pattern gaps

### DRY Principle
- Duplicated logic blocks
- Repeated error handling
- Copied test fixtures
- Redundant validation logic

### Error Handling
- Missing error context
- Silent exception swallowing
- Unrecovered panics
- Insufficient error propagation
- Async error leaks

### Concurrency
- Race condition patterns
- Deadlock potentials
- Goroutine leaks
- Channel misuse (Go)
- Thread safety violations (Java, C#)

### Testing
- Untested code paths
- Mock/stub misuse
- Test coverage gaps
- Flaky test patterns
- Insufficient test isolation

### Architecture
- Circular dependencies
- Leaky abstractions
- Mixed concerns in modules
- Boundary violations
- Layer skipping

### Language Idioms
- Go-specific: error checking patterns, goroutine management
- TypeScript-specific: type assertion abuse, async/await patterns
- Python-specific: mutable defaults, comprehension efficiency
- Rust-specific: unwrap/expect usage, lifetime annotations

### Performance
- N+1 query patterns
- Inefficient algorithms
- Memory leaks
- Unnecessary allocations
- Blocking operations

### Code Smells
- Long methods
- Complex conditionals
- Feature envy
- Data clumps
- Inappropriate intimacy

---

## Language-Specific Support

Deep Analysis has specialized support for language idioms and AST structures:

| Language | Deep Analysis Support | Key Idioms | Status |
|:---|:---|:---|:---|
| **Go** | Full | Structs, interfaces, goroutines, error checking | ✅ Production |
| **TypeScript/JavaScript** | Full | Async/await, type assertions, promises | ✅ Production |
| **Python** | Full | Comprehensions, decorators, async, context managers | ✅ Production |
| **Rust** | Full | Ownership, lifetimes, pattern matching | ✅ Production |
| **Java** | Full | Classes, interfaces, generics, streams | ✅ Production |
| **C#** | Full | LINQ, async/await, properties, attributes | ✅ Production |
| **C/C++** | Full | Pointers, memory management, templates | ✅ Production |
| **Ruby** | Full | Blocks, metaprogramming, duck typing | ✅ Production |
| **PHP** | Full | Namespaces, traits, magic methods | ✅ Production |
| **Swift** | Full | Optionals, closures, protocol-oriented design | ✅ Production |
| **Kotlin** | Full | Extension functions, coroutines, null safety | ✅ Production |

---

## Configuration

Enable and configure Deep Analysis via `rigour.yml`:

```yaml
gates:
  deep:
    enabled: true
    provider: anthropic          # or 'openai', 'local'
    model: claude-opus-4-6       # LLM to use for analysis
    agents: 4                     # Parallel agents (cloud only)
    checks:                       # Categories to analyze
      - solid_principles
      - design_patterns
      - dry_principle
      - error_handling
      - concurrency
      - testing
      - architecture
      - language_idioms
      - performance
      - code_smells
    maxTokens: 4000             # Max tokens per analysis
    temperature: 0.3            # Lower = more deterministic
    timeoutMs: 30000            # Timeout per check
```

### Default Configuration

If not specified, Deep Analysis uses:
```yaml
gates:
  deep:
    enabled: false              # Disabled by default (requires setup)
    provider: anthropic
    model: claude-opus-4-6
    agents: 1                   # Single agent for local
    checks: [all categories]
    maxTokens: 4000
    temperature: 0.3
    timeoutMs: 30000
```

---

## CLI Flags

Run Deep Analysis with these flags:

```bash
# Enable deep analysis
npx rigour check --deep

# Specify provider
npx rigour check --deep --provider anthropic

# Use specific model
npx rigour check --deep --model claude-opus-4-6

# Enable parallel agents (cloud only)
npx rigour check --deep --agents 4
```

| Flag | Description | Example |
|:---|:---|:---|
| `--deep` | Enable LLM-powered deep analysis | `npx rigour check --deep` |
| `--provider <name>` | Deep analysis provider: `anthropic`, `openai`, `local` | `--provider openai` |
| `--agents <n>` | Number of parallel analysis agents (cloud only) | `--agents 4` |
| `--model <name>` | Override model for deep analysis | `--model gpt-4` |

---

## API Keys Configuration

Store API keys in `~/.rigour/settings.json`:

```json
{
  "anthropic_api_key": "sk-ant-...",
  "openai_api_key": "sk-...",
  "local_api_endpoint": "http://localhost:8000"
}
```

### Setup with `rigour setup`

```bash
# Check configuration status
rigour setup

# Set API key interactively
rigour setup

# View configured providers
rigour setup --show-keys
```

The `rigour setup` command validates:
- Installation status and CLI version
- API keys and provider readiness
- Deep analysis configuration
- Quick setup commands for missing pieces

---

## Multi-Agent Parallel Analysis

On cloud deployments, Deep Analysis can use multiple agents working in parallel:

```bash
# Use 4 parallel agents (cloud only)
npx rigour check --deep --agents 4
```

### How It Works
1. **Partition**: Code is logically divided across `n` agents
2. **Analyze**: Each agent analyzes its partition independently
3. **Aggregate**: Results are merged and deduplicated
4. **Verify**: AST verification filters hallucinations from all agents
5. **Report**: Combined findings are presented with confidence scores

Parallel analysis requires:
- `gates.deep.agents > 1` in config or `--agents N` CLI flag
- Cloud deployment (local analysis uses single agent)
- Sufficient API quota for `N` parallel requests

### Performance
- With 4 agents: ~2-3x speedup (not linear due to coordination overhead)
- Each agent processes independently, reducing total wall-clock time
- Ideal for large codebases (10k+ LOC)

---

## Hallucination Prevention

Every LLM finding goes through **AST Verification**:

```
LLM Finding → AST Query → Confirmed? → Report Finding
                  ↓
               Not Found
                  ↓
              Drop Finding
```

When an LLM claims a finding:
1. **Extract Finding**: Parse LLM response for location and claim
2. **Query AST**: Search the actual AST for the claim
3. **Verify Match**: If AST confirms it, report the finding
4. **Drop if Unverified**: If no AST evidence, discard silently

This ensures findings are "grounded" — verified against the actual code structure.

### Example

An LLM might claim: "Function `processOrder()` violates SRP by handling both payment and shipping."

Rigour verifies:
- Find function `processOrder()`
- Scan for payment-related operations
- Scan for shipping-related operations
- If both found → Report finding
- If only one found → Drop claim

---

## Example Output

Running Deep Analysis produces detailed findings:

```
Deep Analysis Report
====================

SOLID Principles
├─ SRP Violation (High)
│  ├─ File: src/services/OrderProcessor.ts:42
│  ├─ Issue: Function 'processOrder' handles payment, shipping, and notifications
│  ├─ Impact: Hard to test, high maintenance cost
│  └─ Fix: Extract shipping and notification logic into separate services
│
└─ DIP Violation (Medium)
   ├─ File: src/api/UserHandler.go:15
   ├─ Issue: Directly depends on concrete Database type instead of interface
   ├─ Impact: Difficult to test with mocks
   └─ Fix: Inject UserRepository interface instead

Design Patterns
├─ Factory Pattern Candidate (Info)
│  ├─ File: src/validators/ValidatorFactory.ts:8
│  ├─ Pattern: Multiple object creation logic, could use Factory
│  └─ Benefit: Centralize object creation, easier to maintain

Error Handling
├─ Missing Error Context (High)
│  ├─ File: src/services/PaymentService.py:56
│  ├─ Issue: Exception caught and re-raised without context
│  ├─ Impact: Hard to debug in production
│  └─ Fix: Add context with wraperrors or exception chaining

Concurrency
├─ Goroutine Leak (High)
│  ├─ File: src/workers/background.go:89
│  ├─ Issue: Goroutine started but no cleanup mechanism
│  ├─ Impact: Resource leak under load
│  └─ Fix: Use context.Context for cancellation, implement cleanup

Testing
├─ Low Coverage Area (Medium)
│  ├─ File: src/middleware/auth.ts:12-45
│  ├─ Coverage: 32% (below target of 80%)
│  └─ Fix: Add tests for happy path and edge cases
```

---

## Integration with Traditional Gates

Deep Analysis works alongside traditional gates:

| Gate Type | What It Checks | Verification |
|:---|:---|:---|
| **Traditional (AST)** | File size, complexity, parameter count | Direct AST analysis |
| **Security** | SQL injection, XSS, hardcoded secrets | Pattern matching + regex |
| **Deep Analysis** | SOLID, design patterns, idioms | LLM + AST verification |

A code audit runs:
1. Traditional gates (fast, deterministic)
2. Security gates (pattern-based)
3. Deep analysis (LLM-based, verified)
4. Final scoring combines all results

---

## Cost Considerations

Deep Analysis incurs API costs (varies by provider):

### Anthropic (Claude)
- Input: ~$0.003 per 1M tokens
- Output: ~$0.015 per 1M tokens
- Typical cost: $0.01-0.05 per file analyzed

### OpenAI (GPT-4)
- Input: ~$0.03 per 1M tokens
- Output: ~$0.06 per 1M tokens
- Typical cost: $0.10-0.30 per file analyzed

### Optimization Tips
- Disable Deep Analysis for generated code
- Configure `gates.deep.checks` to analyze only needed categories
- Use lower `temperature` for cheaper tokens (more deterministic)
- Enable multi-agent analysis only for large repos (parallelism amortizes cost)

---

## Enabling Deep Analysis

### Step 1: Install Rigour
```bash
npm install -g @rigour-labs/cli
```

### Step 2: Set API Key
```bash
# Interactive setup
rigour setup

# Or manually
echo '{"anthropic_api_key":"sk-ant-..."}' > ~/.rigour/settings.json
```

### Step 3: Enable in Config
```yaml
# rigour.yml
gates:
  deep:
    enabled: true
    provider: anthropic
```

### Step 4: Run
```bash
npx rigour check --deep
```

---

## Next Steps

- **[Configuration Reference](/reference/configuration)**: All `gates.deep` options
- **[AI-Native Gates](/concepts/ai-gates)**: How LLM gates differ from traditional checks
- **[CLI Commands](/cli/commands)**: Detailed flag documentation
- **[Getting Started](/getting-started)**: Setup walkthrough including Deep Analysis
