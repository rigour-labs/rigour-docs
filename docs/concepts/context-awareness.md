AI agents often fall into the trap of **"Vibe Coding"**—writing code that looks correct but ignores the existing patterns, standards, and lexicon of your specific project. This is a form of **Context Drift**.

Rigour's **Universal Context Awareness Engine** prevents this by dynamically mining your codebase to build a "Golden Record" of established patterns.

## The Problem: Context Drift

Imagine your project defines a core configuration variable `BASE_URL`. An AI agent, lacking awareness of your specific project standards, might "invent" a secondary variable to solve a local problem:

```javascript
// ❌ Vibe Coding: Agent invents a new pattern
const url = process.env.BASE_URL_PRODUCTION; 
```

Without context awareness, a structural gate would pass this code. But with Rigour's Context Alignment:

1. **Discovery**: Rigour scans your environment files, CI configs, and existing source code.
2. **Anchoring**: It identifies `BASE_URL` as a project-standard "Anchor".
3. **Verification**: When the agent introduces a variation like `BASE_URL_PRODUCTION` or `PROD_BASE_URL`, Rigour flags it as **Context Drift**.

## How it Works

Rigour doesn't rely on hardcoded rules. Instead, it uses **Statistical Normalcy**:

- **Anchor Discovery**: Scans for variables, class naming patterns, and service structures that appear frequently or are defined in "Truth Sources" (like `.env` or `Dockerfile`).
- **Drift Detection**: Flags new code that diverges significantly from discovered anchors.
- **Pattern Collision**: Warns when new names are "too similar" to existing ones but incorrectly formatted.

## Configuration

Context awareness is enabled by default. You can tune it in `rigour.yml`:

```yaml
gates:
  context:
    enabled: true
    sensitivity: 0.8  # Threshold for drift detection
    mining_depth: 100 # Number of files to sample for patterns
```

## Why it Matters

Dynamic context awareness turns Rigour from a simple "linter on steroids" into a **Strategic Quality Gate**. It ensures that as your codebase grows, your AI agents stay anchored to the reality of your project, not the "vibe" of their training data.
