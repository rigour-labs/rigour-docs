# SME Best Practices (Cookbook)

Rigour isn't just a linter; it's an **Engineering Subject Matter Expert (SME)**. These examples show how Rigour enforces professional standards across ecosystems.

## Cloud-Native Go SME
Rigour enforces strict concurrency safety and error handling patterns for Go.

```yaml
# rigour.yml
gates:
  ast:
    complexity: 8
    max_params: 4
  rules:
    - id: GO_ERROR_CHECK
      pattern: "if err != nil"
      enforce: mandatory
```

### What Rigour Catches:
1. **Missing Error Checks**: Flags any function call returning `error` that isn't immediately followed by `if err != nil`.
2. **Unsafe Sinks**: Identifies usage of `os.exec` or `unsafe` pointers in sensitive modules.
3. **Cognitive Complexity**: Flags deeply nested `select` or `for` loops that increase technical debt.

---

## Data Engineering Python SME
Enforce high-quality, bug-free Python patterns for data pipelines.

```yaml
# rigour.yml
paradigm: functional
gates:
  ast:
    complexity: 10
```

---

## 🚀 Live Execution Trace: Catching Blunders

Watch how Rigour's SME supervisors intercept the `blunders.go` and `blunders.py` files in real-time.

### 1. The Headless Supervisor Loop
Run Rigour in your test suite directory to see the SME in action.

```bash
$ npx rigour check --interactive
```

#### Step 1: Scanning Go Architecture
> **[SME_BEST_PRACTICE]** Ecosystem anti-pattern detected
> **File**: `go/blunders.go:L5` 
> **Logic**: Function `handleRequest` calls `fetchData` but ignores the `error` return.
> **Expert Hint**: Mandatory error checking: Enforce `if err != nil` after every fallible call.

#### Step 2: Evaluating Python Safety
> **[SME_SECURITY_SINK]** Unsafe function call detected: `eval(code)`
> **File**: `python/blunders.py:L2`
> **Logic**: Dynamic execution detected. This bypasses structural validation.
> **Expert Hint**: Avoid using shell execution or eval. Use safe alternatives like `ast.literal_eval`.

#### Step 3: Measuring Cognitive Load
> **[SME_COGNITIVE_LOAD]** Method `complexNestedLogic` is too complex (14)
> **File**: `go/blunders.go:L16`
> **Logic**: 4-level nesting (if > if > if > for) detected.
> **Expert Hint**: Flatten logical branches and extract nested loops into focused sub-methods.

---

## Technical Contract Summary
When you adopt Rigour, you aren't just adding a linter; you are adding a **Project SME** that guards your production intent.
