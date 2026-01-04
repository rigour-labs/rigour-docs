---
sidebar_position: 5
---

# AI Workflows: Copilot & PRs

Rigour is the "Engineering Handshake" between AI agents and your codebase. It ensures that regardless of which AI tool you use, the output adheres to your project's standards.

## 🤝 Workflow 1: GitHub Copilot (Advisor)

GitHub Copilot is excellent at suggesting code, but it doesn't always know your project's specific engineering constraints (like complexity limits or forbidden dependencies).

In this workflow, Rigour acts as a **Local Validator**:

1.  **Generate**: Use GitHub Copilot to write a function or refactor a module.
2.  **Audit**: Before committing, run `npx @rigour-labs/cli check`.
3.  **Refine**: If Rigour identifies a violation (e.g., "Complexity too high"), use Copilot to fix it:
    - *Prompt*: "Copilot, Rigour says this function is too complex. Refactor it to reduce cyclomatic complexity by extracting the logic into a helper."
4.  **Verify**: Run `rigour check` again to ensure a `PASS` state.

---

## 🛡️ Workflow 2: Automated PR Reviews (Supervisor)

Rigour can act as an **Automated Technical Reviewer** in your pull request pipeline. This ensures that only high-quality code reaches human review.

### The Pull Request Pipeline:
1.  **Submit PR**: A developer (human or AI) submits a pull request.
2.  **CI Audit**: Rigour runs automatically in GitHub Actions using `--ci --json` flags.
3.  **Standardized Feedback**:
    - **PASS**: The PR is marked as technically compliant. Humans can focus on business logic.
    - **FAIL**: Rigour blocks the merge and provides a `rigour-fix-packet.json`.
4.  **Self-Healing**: If an agent is handling the PR (like Claude Code), it can read the diagnostic packet and submit a fix commit automatically.

### Why use Rigour in PRs?
- **Consistent standards**: Enforce the same rules across the entire team.
- **Save human time**: Don't waste senior developers' time pointing out complexity issues or "missing tests" violations that Rigour can catch in milliseconds.
- **Safe delegation**: Feel confident delegating large refactors to AI because Rigour acts as the safety rail.

---

## 🎯 Pro-Tip: The "Rigour-First" mindset

When working with any AI, mention Rigour in your project instructions (e.g., in `.cursorrules` or `.clinerules`):

> "Always verify changes using `rigour_check`. If violations occur, read the Fix Packet and resolve them before finalizing the task."
