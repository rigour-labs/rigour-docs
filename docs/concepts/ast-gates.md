---
sidebar_position: 3
---

# AST Gates

Syntax-aware validation for code quality.

## What Are AST Gates?

AST (Abstract Syntax Tree) Gates are validation rules that parse your code and check for specific patterns. Unlike regex-based checks, AST gates understand code structure.

## Built-in Gates

### `no-eval`

Blocks usage of `eval()` and similar dynamic code execution.

```javascript
// ❌ Blocked
eval("console.log('hello')");
new Function("return 1 + 1");

// ✓ Allowed
console.log('hello');
```

### `no-process-env-write`

Prevents modification of `process.env`.

```javascript
// ❌ Blocked
process.env.SECRET = "value";

// ✓ Allowed
const secret = process.env.SECRET;
```

### `no-fs-write-sync`

Blocks synchronous file writes.

```javascript
// ❌ Blocked
fs.writeFileSync('file.txt', data);

// ✓ Allowed
await fs.promises.writeFile('file.txt', data);
```

## Configuring Gates

Enable gates in `.rigour.yaml`:

```yaml
gates:
  - no-eval
  - no-process-env-write
  - no-fs-write-sync
```

## Language Support

| Language | AST Parser |
|----------|------------|
| JavaScript | @babel/parser |
| TypeScript | @typescript-eslint/parser |
| Python | tree-sitter-python |

## Custom Gates

Coming soon: Define your own AST gates with a simple rule DSL.
