---
slug: /
---
# Rigour

**Deterministic quality gates that force AI agents to write production-grade code.**

Rigour sits between your AI agent and the codebase — catching hallucinated imports, hardcoded secrets, and floating promises **the instant they're written**, not after CI fails.

> Zero cloud. Zero telemetry. Fully local. MIT licensed.

---

## See It In Action

![Rigour Demo](/img/demo.gif)

```bash
npx @rigour-labs/cli demo --cinematic
```

Watch an AI agent write flawed code, Rigour hooks catch each issue **in real time**, then the agent self-corrects — score jumps from **35 → 91**.

---

## Quick Start (3 Commands)

```bash
npx @rigour-labs/cli init          # auto-detects your stack + IDE
npx @rigour-labs/cli check         # run all quality gates
npx @rigour-labs/cli hooks init    # install real-time hooks
```

---

## Real-Time Hooks

Hooks run **inside your AI tool** and catch issues before files are even saved:

| Tool | Hook Location | Trigger |
|------|--------------|---------|
| **Claude Code** | `.claude/settings.json` | Every file write |
| **Cursor** | `.cursor/hooks.json` | On save |
| **Cline** | `.cline/hooks.json` | On file change |
| **Windsurf** | `.windsurf/hooks.json` | On save |

---

## OWASP LLM Top 10 Coverage

| # | Risk | Coverage |
|---|------|----------|
| 1 | Injection Flaws | **Strong** |
| 2 | Broken Authentication | **Strong** |
| 3 | Sensitive Data Exposure | **Strong** |
| 4 | Hallucinated Dependencies | **Strong** |
| 5 | Improper Error Handling | **Strong** |
| 6 | Unsafe Output Handling | **Strong** |
| 7 | Denial of Service (ReDoS) | **Strong** |
| 8 | Missing Input Validation | **Strong** |
| 9 | Overly Permissive Code | **Strong** |
| 10 | Insufficient Code Quality | **Strong** |

---

## Key Features

*   **Real-Time Hooks**: Catch issues the instant AI writes code — before CI, before review.
*   **AI Drift Detection**: Hallucinated imports, floating promises, context window artifacts.
*   **25+ Security Patterns**: SQL injection, XSS, CORS wildcards, ReDoS, hardcoded secrets with CWE IDs.
*   **Multi-Agent Governance**: Scope conflict detection and verified handoffs for agent teams.
*   **Industry Presets**: HIPAA, SOC2, FedRAMP compliance gates in one command.
*   **Score Trending**: Track quality over time with exportable audit reports.
*   **Peer-Reviewed Research**: [Zenodo whitepaper DOI:10.5281/zenodo.18673564](https://doi.org/10.5281/zenodo.18673564).

---

## "Local Honest" Governance

*   **No Login Required**: Start governing in 60 seconds without creating an account.
*   **Zero-Telemetry**: Your source code and command history never leave your machine.
*   **Air-Gapped Sync**: The "Local Bridge" between your IDE and Studio happens entirely on your local filesystem.

*This isn't just a feature — it's our trust moat.*

---

## Where to Go Next?

- **[Getting Started](/getting-started)**: Installation and setup.
- **[Real-Time Hooks](/concepts/hooks)**: Deep dive into hooks for all AI tools.
- **[OWASP Coverage](/concepts/owasp-coverage)**: Full mapping of OWASP risks to Rigour gates.
- **[CLI Commands](/cli/commands)**: Full command reference.
- **[Governance Studio](/concepts/governance-studio)**: Visual dashboard.

*Rigour makes Vibe Coding a thing of the past.*
