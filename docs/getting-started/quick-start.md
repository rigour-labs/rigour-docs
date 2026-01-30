---
sidebar_position: 2
---

# Quick Start

Get your first AI code review running in 60 seconds. Rigour ensures that code meets your standards before it is even committed.

---

## 1. Initialize Rigour

```bash
npx @rigour-labs/cli init
```

This generates a `rigour.yml` file in your root with standard industry defaults for safety and complexity.

:::tip Framework Harmony
If you plan to use a scaffolding tool like `create-next-app` or `npm init vite`, please run it **before** `rigour init`. These tools often require a completely empty directory to function correctly.
:::

---

## 2. See it in Action (The Fail-Fix Loop)

Let's simulate a common AI mistake: a "God Function" with too many parameters.

### Step A: Introduce a Violation
Create a file `bad.js` with an overly complex signature:
```javascript
function processOrder(id, user, items, discount, shipping, tax, payment, analytics) {
  // Too many params!
}
```

### Step B: Run the Audit
```bash
npx @rigour-labs/cli check
```

**Output:**
```text
✘ FAIL - Quality gate violations found.

[AST_MAX_PARAMS] Function 'processOrder' has 8 parameters (max: 5)
  Details: High parameter count detected in bad.js
  Hint: Reduce number of parameters or use an options object.
```

### Step C: Fix and Re-Audit
Refactor the function to use an options object:
```javascript
function processOrder({ id, user, items, ...meta }) {
  // Balanced signature!
}
```

Run `npx @rigour-labs/cli check` again:
```text
✔ PASS - All quality gates satisfied.
```

---

## 3. Polyglot Power: Checking Go Architecture
Rigour isn't just for JavaScript. It acts as an SME for 10+ languages.

### Step A: Cognitive Complexity in Go
Create `logic.go` with deep nesting:
```go
func Handle(a, b bool) {
  if a {
    if b {
      for i := 0; i < 10; i++ { fmt.Println(i) }
    }
  }
}
```

### Step B: Run the Audit
```bash
$ npx rigour check --interactive
```

**Output:**
> **[SME_COGNITIVE_LOAD]** Method 'Handle' has high cognitive load (12)
> **Hint**: Flatten logical branches and extract nested loops.

---

## 4. Deploy a Supervisor Loop

For headless agents (like Claude Code), use `rigour run` to automate the entire fix-cycle:

```bash
npx @rigour-labs/cli run -- claude "refactor my auth logic"
```

Rigour will execute the agent, check the output, and if gates fail, it will automatically give the agent the **Fix Packet** and request a second pass.

---

## 5. Launch the Studio (Zero-Config Dashboard)

The Studio is your "Mission Control." It bundles real-time shadowing, pattern discovery, and HITL governance into a single interface with **no setup required**.

```bash
npx @rigour-labs/cli studio
```

✔ **Ready-to-Run**: No dashboard to configure, no database to setup.
✔ **Live Shadowing**: See AI tool calls and file changes in real-time.
✔ **HITL Arbitration**: Approve or Reject AI decisions directly from the UI.

---

## Next Steps

- **[Rigour Studio Guide](/cli/commands#rigour-studio)** - Full details on the governance control room.
- **[SME Cookbooks](/examples/sme-cookbooks)** - Advanced patterns for Go, Python, and Java.
- **[Quality Handshake](/examples/quality-handshake)** - Bridging Static and Dynamic analysis.
- **[Configuration](/reference/configuration)** - Tune gates for your project.
