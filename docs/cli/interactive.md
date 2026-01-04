---
sidebar_position: 3
---

# Interactive Tools

Rigour includes interactive commands and flags to help you set up and troubleshoot your project's engineering standards.

## `rigour check --interactive`

The "Human Mode" of Rigour. It provides rich, colorful terminal output designed for manual code reviews and local debugging.

```bash
npx @rigour-labs/cli check --interactive
```

### Key Features:
- **Visual Callouts**: Important violations are highlighted with expert hints.
- **Trace Visualization**: Shows the exact logic path (e.g., nesting levels) that triggered a failure.
- **Immediate Resolution**: Provides actionable "Next Steps" for every violation.

---
## `rigour setup`

The automated project bootstrap command.

```bash
npx @rigour-labs/cli setup
```

### What it does:
1.  **Environment Check**: Verifies Node.js, Git, and filesystem permissions.
2.  **Paradigm Detection**: Analyzes your code to detect if you are using OOP, Functional, or procedural patterns.
3.  **Config Generation**: Creates a `rigour.yml` tailored to your stack.
4.  **Handshake Verification**: Ensures that local agents (like Cursor or your shell) can correctly call Rigour tools.

---

## `rigour guide`

Interactive troubleshooting and documentation assistant.

```bash
npx @rigour-labs/cli guide
```

### Features:
- **Violation Help**: Paste a failure ID to get a deep-dive explanation and refactoring examples.
- **Config Helper**: Helps you tune thresholds (like complexity or file lines) using natural language.
- **Best Practices**: Provides tailored advice based on your project's specific preset and paradigm.
