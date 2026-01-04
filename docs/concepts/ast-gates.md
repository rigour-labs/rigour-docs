---
sidebar_position: 3
---

# AST Gates: Technical Reference

Syntax-aware validation for code quality. Rigour uses high-fidelity AST parsing to enforce standards that regular regex-based linters often miss.

## Language Support: Full Parity

Rigour is truly technology-agnostic. We use a hybrid validation engine that combines native structural analysis with universal parsing.

### AST-Aware Languages
Rigour provides high-fidelity structural checks (Complexity, Nesting, Params) for all major enterprise languages:

| Ecosystem | Language | Parser | Status |
|:---|:---|:---|:---|
| **Web** | TypeScript, JS, React | `typescript` API | ✅ Production |
| **Backend** | Python, Go, Rust | `tree-sitter` (WASM) | ✅ Production |
| **Enterprise** | Java, C#, C, C++ | `tree-sitter` (WASM) | ✅ Production |
| **Mobile/Script** | Swift, Kotlin, Ruby, PHP | `tree-sitter` (WASM) | ✅ Production |

> [!TIP]
> **Total Agnosticism**: If your language isn't on the list, you can still use [Custom Command Gates](/reference/configuration#custom-command-gates-agnosticism) to wrap any third-party linter or compiler into the Rigour supervisor loop.

---

## Safety Rails (Core)

### `complexity`
- **ID**: `SME_COGNITIVE_LOAD` (Universal) or `AST_COMPLEXITY` (TS/JS)
- **Check Logic**: Calculates Cognitive Complexity (Cyclomatic + Nesting).
- **Fail Condition**: Any single function's complexity > `gates.ast.complexity`.
- **Primary Goal**: Prevent "God Functions" that agents tend to generate during large refactors.

### `max_params`
- **ID**: `AST_MAX_PARAMS`
- **Check Logic**: Counts arguments in function declarations.
- **Fail Condition**: Parameter count > `gates.ast.max_params`.
- **Primary Goal**: Enforce dependency injection or object-based configuration over long argument lists.

### `max_function_lines`
- **ID**: `AST_MAX_FUNCTION_LINES`
- **Check Logic**: Counts physical lines of code.
- **Fail Condition**: Function depth > `gates.ast.max_function_lines`.

---

## SME Intelligence Gates (Universal)

Rigour's Universal AST engine (powered by Tree-sitter WASM) implements advanced Subject Matter Expert (SME) logic across 10+ languages.

### Cognitive Complexity 🧠
Unlike simple Cyclomatic complexity, Cognitive complexity measures how hard code is for a human (or an AI agent) to understand.
- **Logic**: Base Cyclomatic score + (Nesting Depth * 2).
- **Benefit**: Discriminates against deeply nested code (callback hell, nested if/else) that increases technical debt.

### Security Sinks 🛡️
Proactively identifies code that introduces security vulnerabilities.
- **Python**: Detects `eval()`, `exec()`, and `os.system()`.
- **Go**: Flags usage of the `unsafe` package and shell execution.
- **Rust**: Identifies `unsafe` blocks that bypass the borrow checker.
- **Java**: Flags native method declarations and `Runtime.exec()`.

### Ecosystem Best Practices (SME)
Enforces language-specific professional standards:
- **Go Mandatory Errors**: Ensures `err` returned from functions is actually checked.
- **Python Defaults**: Flags mutable default arguments (e.g., `def list(a=[])`).
- **Rust Reliability**: Discourages the use of `.unwrap()` in favor of safe error handling.
- **Java Hygiene**: Detects empty `catch` blocks (exception swallowing).

---

## The Quality Handshake (SAST+DAST)
Rigour provides a **double-check** loop. High-complexity files are automatically required to have higher dynamic test coverage. See the [Quality Handshake guide](/examples/quality-handshake).

---

## Security & Hygiene

### `no-eval`
**Banned Nodes**: `CallExpression` where callee is `eval` or `new Function`.

### `no-process-env-write`
**Banned Nodes**: `AssignmentExpression` targeting `process.env`.
- **Reason**: Modification of environment variables at runtime is a side-effect that creates unpredictable agent behavior.

### `no-fs-write-sync`
**Banned Nodes**: `fs.writeFileSync`, `fs.appendFileSync`, etc.
- **Goal**: Force agents to use async patterns which are more compatible with Rigour’s snapshotting engine.

---

## Advanced: Logic Extraction
Rigour's AST engine is designed specifically to help agents **refactor**. 

When a `complexity` gate fails, Rigour doesn't just say "Fix it." The Fix Packet contains instructions like:
> "Function 'processOrder' is too complex. Extract the 'TaxCalculation' block into a separate function to lower the score."
