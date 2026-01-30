# Governance Studio

The visual "Mission Control" for your AI engineering workflows. The Studio provides real-time observability and human-in-the-loop (HITL) governance with zero configuration.

---

## ⚡ Quick Launch
```bash
npx @rigour-labs/cli studio
```
*Studio runs locally at `http://localhost:3000`.*

---

## 🔦 Real-Time Shadowing
Watch every decision your AI agent makes in a live audit trail.
- **Audit Log**: Stream tool calls and file changes as they happen.
- **Transparency**: See the AI's internal "thought process" and tool outputs.

## 🛡️ Human-in-the-Loop (HITL) 
Don't just watch—govern.
- **Violation Alerts**: Red badges flag any AI move that breaks your project rules.
- **Arbitration**: Approve (Override) or Reject changes directly from the UI.
-  **Seamless Sync**: Decisions are sent back to the agent in real-time.

## 🧠 Pattern Discovery
Search and reason about your codebase using AI search.
- **Semantic Mode**: Ask questions in natural language like *"How is the database initialized?"*
- **Pattern Index**: A consolidated view of all classes, methods, and architectural patterns.

## 💾 Engineering Memory
A persistent whiteboard for your project's architectural decisions.
- **MCP Memory**: Store decisions (e.g., *"We use ChromaDB for local dev"*) that survive across different AI chat sessions.
- **Visual Bank**: Review and manage your project's technical context in a clean interface.

---

## 🔒 Private by Design
Rigour Studio is **local-first**. Your code, audit logs, and decisions never leave your machine.
