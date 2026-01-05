AI agents often fall into the trap of **"Vibe Coding"**—writing code that looks correct but ignores the existing patterns, standards, and lexicon of your specific project. This is a form of **Context Drift**.

Rigour's **Universal Context Awareness Engine** prevents this by dynamically mining your codebase to build a "Golden Record" of established patterns.

## The Problem: "Guess and Hope" (Vibe Coding)

The most common frustration with AI agents is the **narrative vs. reality** gap. An agent will confidently state: *"I have fixed the type errors and reformatted the code. You can push now."*

But in reality:
- **MyPy/Lint** is still fails with 13 errors.
- **Context Drift**: The agent used a variable name that doesn't exist or doesn't follow project standards.
- **CI Failures**: You lose 10 minutes waiting for a CI pipeline that was doomed from the start.

Rigour acts as the **firewall** between the agent's creative guesses and your project's technical reality.

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
