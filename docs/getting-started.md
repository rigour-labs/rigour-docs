# Getting Started

Rigour is designed to be set up in under 60 seconds. You can run it directly with `npx` (no install required) or install it globally.

---

## 1. Installation

### The Zero-Install Way (Recommended)
You don't need to install anything. Just run:
```bash
npx @rigour-labs/cli --help
```

### Global Installation
```bash
npm install -g @rigour-labs/cli
```

---

## 2. Project Setup (The 3 Commands)

Run these in your project root to start governing your AI agents:

### 1. Initialize
Align Rigour with your project's technology stack.
```bash
npx @rigour-labs/cli init
```

### 2. Build the Index
Create a semantic map of your code so AI agents can "reason" about your architecture.
```bash
npx @rigour-labs/cli index --semantic
```

### 3. Launch Studio
Start the visual dashboard to monitor AI tool calls in real-time.
```bash
npx @rigour-labs/cli studio
```

---

## 3. Fast Verification

To see Rigour in action immediately:

1. Create a "messy" file `bad.py`:
   ```python
   def compute(a, b, c, d, e, f, g, h, i, j):
       # Too many parameters!
       pass
   ```
2. Run a check:
   ```bash
   npx @rigour-labs/cli check
   ```
3. **Result**: Rigour will flag the complexity violation and offer a "Fix Packet" for your AI agent to follow.

---

## Next Steps
- **[CLI Commands](/cli/commands)**: Full reference of all options.
- **[Governance Studio](/concepts/governance-studio)**: How to use the visual control room.
- **[MCP Server](/mcp/mcp-server)**: Connecting Rigour directly to Cursor or Claude Code.
