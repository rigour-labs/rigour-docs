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

## 5. Deep Analysis (Optional)

Deep Analysis uses LLM interpretation to check code against 40+ quality categories (SOLID, design patterns, concurrency, architecture). Enable it for advanced semantic analysis:

### Step 1: Check System Readiness

```bash
rigour setup
```

This displays your installation status, API key configuration, and deep analysis readiness.

### Step 2: Configure API Key

```bash
# Interactive configuration
rigour setup --configure anthropic

# Or manually create settings file
echo '{"anthropic_api_key":"sk-ant-..."}' > ~/.rigour/settings.json
```

Get your API key from the [Anthropic Console](https://console.anthropic.com).

### Step 3: Enable in Configuration

Edit your `rigour.yml`:

```yaml
gates:
  deep:
    enabled: true
    provider: anthropic
    model: claude-opus-4-6
    checks:
      - solid_principles
      - design_patterns
      - error_handling
      - concurrency
      - testing
      - architecture
      - language_idioms
      - performance
      - code_smells
```

### Step 4: Run Deep Analysis

```bash
# Run with deep analysis enabled
npx rigour check --deep

# Or use specific provider/model
npx rigour check --deep --provider anthropic --model claude-opus-4-6
```

Deep Analysis findings are verified against the AST to eliminate hallucinations. See [Deep Analysis](/concepts/deep-analysis) for full documentation.

---

## Next Steps
- **[Real-Time Hooks](/concepts/hooks)**: Set up hooks for Claude, Cursor, Cline, or Windsurf.
- **[CLI Commands](/cli/commands)**: Full reference of all options.
- **[OWASP Coverage](/concepts/owasp-coverage)**: See how Rigour covers all 10 OWASP LLM risks.
- **[Deep Analysis](/concepts/deep-analysis)**: Enable LLM-powered semantic analysis of 40+ code quality categories.
- **[Governance Studio](/concepts/governance-studio)**: How to use the visual control room.
- **[MCP Server](/mcp/mcp-server)**: Connecting Rigour directly to Cursor or Claude Code.
