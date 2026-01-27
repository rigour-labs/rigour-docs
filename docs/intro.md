---
sidebar_position: 1
slug: /
---

# Welcome to Rigour

**The Engineering Handshake for AI Agents** 🎯

Rigour is a high-fidelity code review and supervision platform designed specifically for the age of agentic coding. It acts as the "bridge" between the creative power of AI models and the strict engineering requirements of production-grade codebases.

## The Core Problem: "Vibe Coding"

AI agents are creative tour-de-forces, but they often fall into the **Vibe Coding Trap**—claiming a task is "100% complete" based on narrative, while the technical reality is still broken.

Common failure modes include:
- **Environment Drift**: Agent runs local tools (Ruff, Mypy) that don't match the project's CI requirements.
- **Context Drift**: Agent "guesses" patterns and variable names instead of aligning with the existing project lexicon.
- **Narrative Hallucination**: Agent promises "CI will pass now," but the execution tools still return errors.

**Rigour solves this by providing a deterministic "Technical Firewall" that agents must satisfy before their work is accepted.**

---

## Why Rigour?

- 🛡️ **Universal SME**: Acting as a Subject Matter Expert for **10+ languages** (Go, Rust, Java, Python, C++, and more).
- 🧠 **Architectural Gates**: Enforces SOLID, DRY, and specialized paradigms (OOP, Functional).
- 🔄 **Quality Handshake**: Bridges the gap between **Static structure (SAST)** and **Dynamic performance (DAST/IAST)**.
- 🤝 **Agentic Handshake**: The definitive protocol for reliable AI agent integration.

---

## Two Modes of Operation

Rigour is designed to be used by both Humans (who define the rules) and Agents (who follow them):

1.  **Advisor Mode (MCP)**: For interactive development. The agent proactively asks Rigour for feedback during its task.
2.  **Supervisor Mode (CLI)**: For headless automation. Rigour wraps the agent and strictly enforces a PASS status before finishing.

[Learn about Operating Modes →](/concepts/modes)

---

## 🌟 What's New in v2.0.0 (The Universal SME Release)

Rigour v2.0.0 is a complete reimagining of the platform, moving from a TypeScript-focused linter to a **Universal Engineering Supervisor**.

- **Universal AST Support**: High-fidelity structural parsing for 10+ languages (Go, Rust, Java, Python, C++, etc.).
- **Universal Context Awareness**: Dynamically discovery and enforcement of project-specific patterns.
- **Environment Alignment**: Proactive verification of tool versions and runtime invariants.
- **Cognitive Complexity Engine**: Nesting-aware complexity measurement.
- **Dynamic Quality Handshake**: Requiring high test coverage for complex/high-risk code paths.
- **Interactive Human Reporting**: The new `--interactive` flag for rich terminal visualizations.

---

## Technical Book Structure

This documentation is organized as a technical guide to help you ship faster and safer:

- **[Quick Start](/getting-started/quick-start)**: Your first 100% compliant refactor in 60 seconds.
- **[SME Cookbooks](/examples/sme-cookbooks)**: Expert patterns for specific languages.
- **[Quality Handshake](/examples/quality-handshake)**: Bridging SAST and DAST.
- **[Concepts](/concepts/philosophy)**: The philosophy behind Rigour's "Diagnostic" approach.
- **[CI/CD Handbook](/cli/ci-integration)**: Production gates for enterprise pipelines.

---

## Installation

```bash
# Register globally
npm install -g @rigour-labs/cli

# Run your first check
rigour check --interactive
```
