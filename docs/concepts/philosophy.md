---
sidebar_position: 1
---

# Philosophy

The no-bullshit approach to AI code review.

## The Problem

AI coding agents are powerful, but they can also be dangerous. They might:

- Modify files they shouldn't touch
- Introduce security vulnerabilities
- Make changes that break your build
- Touch too many files at once

## The Rigour Solution

Rigour acts as a **safety layer** between AI agents and your codebase. It validates every change before it's applied.

### Core Principles

#### 1. Trust, But Verify

AI agents are helpful. But every change should be validated before it touches production code.

#### 2. Fail Fast

Catch problems immediately, not after code is merged.

#### 3. Zero Config by Default

Rigour works out of the box with sensible defaults. Configure only what you need.

#### 4. Transparency

Every validation result includes clear explanations. No black boxes.

## How It Works

```
AI Agent → Fix Packet → Rigour → ✓ or ✗ → Apply or Reject
```

1. **AI generates changes** as a "Fix Packet"
2. **Rigour validates** against safety rules
3. **Pass?** Changes get applied
4. **Fail?** Agent gets feedback to try again

## No Bullshit Means

- **No telemetry** - Your code stays private
- **No cloud dependency** - Runs entirely local
- **No complex setup** - One command to start
- **No false promises** - We catch what we can, honestly
