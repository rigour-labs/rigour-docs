---
sidebar_position: 3
---

# AST Gates: Technical Reference

Syntax-aware validation for code quality. Rigour uses high-fidelity AST parsing to enforce standards that regular regex-based linters often miss.

## The Parsing Engine
Rigour uses different high-performance parsers depending on your project's `paradigm` and language:
- **TypeScript/React**: `@typescript-eslint/parser` (Type-aware)
- **JavaScript**: `@babel/parser`
- **Python**: `tree-sitter-python`

---

## Safety Rails (Core)

### `complexity`
**Check Logic**: Calculates Cyclomatic Complexity (number of independent paths) for every function.
- **Fail Condition**: Any single function's complexity > `gates.ast.complexity`.
- **Primary Goal**: Prevent "God Functions" that agents tend to generate during large refactors.

### `max_params`
**Check Logic**: Counts arguments in function declarations.
- **Fail Condition**: Parameter count > `gates.ast.max_params`.
- **Primary Goal**: Enforce dependency injection or object-based configuration over long argument lists.

### `max_function_lines`
**Check Logic**: Counts physical lines of code (excluding comments) within a function body.
- **Fail Condition**: Function depth > `gates.ast.max_function_lines`.

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
