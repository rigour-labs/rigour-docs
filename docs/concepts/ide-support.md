# Full IDE Support

Rigour CLI supports all major AI coding assistants out of the box. Run `rigour init` to automatically generate configuration files for your detected IDE.

## Supported IDEs

| IDE/Tool | Config Location | Format |
|----------|----------------|--------|
| **Cursor** | `.cursor/rules/rigour.mdc` | MDC with frontmatter |
| **Cline** | `.clinerules` | Markdown |
| **Claude Code** | `CLAUDE.md` | Markdown |
| **Gemini Code Assist** | `.gemini/styleguide.md` | Markdown |
| **OpenAI Codex / Aider** | `AGENTS.md` | Universal standard |
| **Windsurf** | `.windsurfrules` | Markdown |
| **VS Code** | `docs/AGENT_INSTRUCTIONS.md` | Markdown |

## Usage

### Auto-detection

```bash
npx @rigour-labs/cli init
```

Rigour auto-detects your IDE based on:
- Existing config files (`.cursor/`, `.vscode/`, etc.)
- Environment variables
- Project markers

### Target Specific IDE

```bash
npx @rigour-labs/cli init --ide cursor
npx @rigour-labs/cli init --ide claude
npx @rigour-labs/cli init --ide gemini
npx @rigour-labs/cli init --ide codex
npx @rigour-labs/cli init --ide windsurf
```

### Generate All Configs

```bash
npx @rigour-labs/cli init --ide all
```

This creates config files for all supported IDEs, useful for teams with mixed tooling.

## AGENTS.md - The Universal Standard

`AGENTS.md` is emerging as the universal format for AI coding assistants. It's used by:
- OpenAI Codex CLI
- Aider
- Many other AI tools

Rigour always generates `docs/AGENT_INSTRUCTIONS.md` as a universal fallback, and `AGENTS.md` when using Codex mode.

## What Gets Generated

Each IDE config file includes:
- Quality gate enforcement rules
- Code quality standards
- Debugging best practices
- Collaboration guidelines
- Rigour CLI commands

## Claude Code Setup

Claude Code reads project context from `CLAUDE.md`. Rigour generates a comprehensive file including:

```markdown
# CLAUDE.md - Project Instructions for Claude Code

This project uses Rigour for quality gates.

## Commands

\`\`\`bash
# Verify quality gates
npx @rigour-labs/cli check
\`\`\`
```

## Gemini Code Assist Setup

Gemini reads from `.gemini/styleguide.md`:

```markdown
# Gemini Code Assist Style Guide

This project uses Rigour for quality gates.

## Required Before Completion

Always run `npx @rigour-labs/cli check` before marking any task complete.
```
