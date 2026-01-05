# Environment Alignment

**"Works on my machine"** is the most common lie in AI-generated development. Environment Alignment is Rigour's mechanism for ensuring that your agent's local environment is a perfect mirror of your project's technical requirements.

## The Problem: Environment Drift

Imagine your CI pipeline expects **Ruff 0.14.0**. Your AI agent is running **Ruff 0.1.0** locally. 

- The agent claims: *"I have formatted the code and verified it passes."*
- You push to remote.
- CI fails 5 minutes later because the older version of Ruff missed patterns detected by the newer one.

This is **Environment Drift**. It leads to a "Guess and Hope" cycle that kills developer productivity.

## How Rigour Fixes It

Rigour doesn't just run tools; it verifies the **contract** of the tool itself before execution.

### 1. Dynamic Contract Discovery
Rigour parses your project's configuration files to discover the required versions of your tools:
- `pyproject.toml` (Ruff, Mypy, Black)
- `package.json` (Node, Prettier, ESLint)
- `.tool-versions` (Asdf, RTX)

### 2. Pre-flight Verification
Before running any gates, Rigour executes a "Pre-flight Check". If the local environment deviates from the project contract (e.g., wrong version, missing binary), Rigour fails the cycle immediately with a **Fatal Alignment Error**.

## Why It Matters

By enforcing Environment Alignment, Rigour transforms your AI agent from a "creative guesser" into a **deterministic engineer**. It ensures that if a check passes locally on the agent's machine, it **will** pass in CI.

---
*"Rigour turns a claim of victory into a proof of execution."*
