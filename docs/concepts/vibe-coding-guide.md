---
sidebar_position: 12
---

# Guide: Vibe Coding Test Drive

This guide walks you through the 3 "Aha!" moments of Rigour v2. Use these steps to verify that your AI governance is fully operational.

## 1. Launch the Studio
Launch the dashboard from your project root:
```bash
rigour studio
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser. This is your "Control Room."

---

## 2. Testing the "Aha!" Moments

### A. Semantic Search (Natural Language Pattern Discovery)
1. Go to the **Pattern Index** tab in the Studio.
2. Ensure you have run `rigour index --semantic` at least once.
3. Toggle the **"AI Search"** button.
4. **Try this**: Type a question about your architecture, e.g., *"How do we handle user authentication?"* or *"Where are the database connection strings?"*
5. **Result**: Rigour should find the relevant classes and methods across all supported languages (Python, Go, TS, etc.) instantly.

### B. Live Shadowing & HITL Arbitration
1. Open your IDE (Cursor, VS Code, or Claude Code).
2. Ask the AI to make a change that intentionally violates a gate, for example:
   - *"Add a 500-line function to the main controller."*
   - *"Add a hardcoded secret or a forbidden dependency."*
3. Watch the **Audit Trail** in the Studio. A red **"Report"** badge will appear in real-time.
4. Click the badge to open the **Governance View**.
5. **Arbitrate**: Audit the code diff and click **"Approve (Override)"** or **"Reject"**.

### C. Memory Bank Visualization
1. Ask your AI agent to store a project-specific memory:
   - *"Store a memory that we are migrating our caching from Redis to Memcached."*
2. Go to the **Memory Bank** tab in the Studio.
3. **Result**: You should see the memory entry appear with its timestamp and value, providing a visual record of the AI's persistent context.

---

## 🎯 Pro-Tip: The Governor Mindset
The Studio isn't just a log; it's an **Arbitration Engine**. By using the **Approve/Reject** buttons, you are formally training the AI on your project's engineering boundaries.
