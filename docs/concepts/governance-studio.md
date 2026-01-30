---
sidebar_position: 11
---

# HITL: Human-in-the-Loop Governance

The core philosophy of Rigour is that AI should be **empowered but audited**. While automation is essential for speed, critical architectural and security decisions require a human handshake.

## 🛡️ Why Human-in-the-Loop?

In a "Vibe Coding" workflow, AI agents can generate massive amounts of code in seconds. Without a governance layer, this speed often comes at the cost of:
1.  **Technical Debt**: AI choosing the "easiest" path over the "right" architectural path.
2.  **Gate Violations**: Agents ignoring project-specific constraints (e.g., forbidden dependencies).
3.  **Security Risks**: Subtle bugs that pass traditional linting but violate high-level safety rules.

Rigour HITL turns the developer into a **Governor** rather than a janitor.

---

## 🏗️ The Governance Studio

The [Rigour Studio](/cli/commands#rigour-studio) is the primary interface for HITL interactions.

### 1. Real-Time Shadowing
As you work in Cursor, Windsurf, or with Claude Code, Rigour shadows every interaction. Tool calls stream into the Audit Trail, allowing you to monitor the AI's internal "thought process" and actions.

### 2. High-Fidelity Auditing
When an AI agent proposes a change that triggers a Quality Gate violation, Rigour flags it with a **"Report"** badge. 
- Clicking the badge opens the **Governance View**.
- You see exactly which files changed and why they violated your standards (e.g., "SME_COGNITIVE_LOAD: Method `validate` exceeds 400 lines").

### 3. Arbitration Controls
The Studio provides two primary arbitration actions:
- **✅ Approve (Override)**: You acknowledge the violation but decide it's acceptable for the current context. Rigour logs this override, satisfying the audit trail.
- **❌ Reject**: You block the change. The AI agent will receive feedback that the action was rejected by a human, forcing it to rethink its approach.

---

## 🎯 Best Practices for Governors

1.  **Trust but Verify**: Keep the Studio open on a second monitor while vibe coding. 
2.  **Audit the "Red"**: Prioritize reviewing events with red status or report badges.
3.  **Log Your Decisions**: Use the "Approve" button rather than manually editing files to clear violations; this maintains a formal governance record in `.rigour/events.jsonl`.
4.  **Refine Your Rules**: If you find yourself constantly "Approving" the same type of violation, consider adjusting your `rigour.yml` thresholds.

---

## 🔒 Local-First, Always
Governance data, file diffs, and arbitration logs never leave your machine. Rigour Studio is a local-first application, ensuring that your architectural secrets and code remain private.
