# Getting Started

Rigour is designed to be set up in under 60 seconds. You can run it directly with `npx` (no install required) or install it globally.

---

## See It First

Before installing anything, watch the cinematic demo:

```bash
npx @rigour-labs/cli demo --cinematic
```

![Rigour Demo](/img/demo.gif)

---

## 1. Installation

### The Zero-Install Way (Recommended)
```bash
npx @rigour-labs/cli --help
```

### Global Installation
```bash
npm install -g @rigour-labs/cli
```

---

## 2. Project Setup (3 Commands)

```bash
npx @rigour-labs/cli init          # auto-detects stack, IDE, installs hooks
npx @rigour-labs/cli check         # run all quality gates
npx @rigour-labs/cli hooks init    # install real-time hooks for your AI tool
```

`rigour init` automatically:
- Detects your project role (API, UI, infra, data) and paradigm (OOP, functional)
- Creates IDE-specific config files (Claude, Cursor, Cline, Windsurf, Gemini, Codex)
- Installs real-time hooks for your detected AI tool
- Configures `.gitignore` with Rigour artifacts

---

## 3. Fast Verification

To see Rigour catch real issues immediately:

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

## 4. Demo Modes

Explore all demo modes to see different aspects of Rigour:

```bash
npx @rigour-labs/cli demo                 # default: full gate check
npx @rigour-labs/cli demo --hooks         # hooks simulation only
npx @rigour-labs/cli demo --cinematic     # full cinematic: hooks → gates → fix → score
npx @rigour-labs/cli demo --speed fast    # speed up for quick demos
```

---

## Next Steps
- **[Real-Time Hooks](/concepts/hooks)**: Set up hooks for Claude, Cursor, Cline, or Windsurf.
- **[CLI Commands](/cli/commands)**: Full reference of all options.
- **[OWASP Coverage](/concepts/owasp-coverage)**: See how Rigour covers all 10 OWASP LLM risks.
- **[Governance Studio](/concepts/governance-studio)**: How to use the visual control room.
- **[MCP Server](/mcp/mcp-server)**: Connecting Rigour directly to Cursor or Claude Code.
