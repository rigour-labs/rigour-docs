# Memory Persistence Tools

Rigour's MCP server includes tools for context memory persistence - solving the common problem of AI agents losing context and not following user instructions across sessions.

## The Problem

AI coding assistants often:
- Forget user preferences between sessions
- Lose track of project-specific conventions
- Repeat mistakes they were told to avoid
- Fail to follow critical instructions

## The Solution

Rigour provides three MCP tools for persistent memory:

### `rigour_remember`

Store instructions that persist across sessions:

```json
{
  "name": "rigour_remember",
  "arguments": {
    "cwd": "/path/to/project",
    "key": "coding_style",
    "value": "Always use TypeScript with strict mode. Prefer async/await over callbacks."
  }
}
```

### `rigour_recall`

Retrieve stored instructions at the start of each session:

```json
{
  "name": "rigour_recall",
  "arguments": {
    "cwd": "/path/to/project"
  }
}
```

This returns all stored memories. Pass a `key` to retrieve a specific memory.

### `rigour_forget`

Remove a stored memory:

```json
{
  "name": "rigour_forget",
  "arguments": {
    "cwd": "/path/to/project",
    "key": "deprecated_instruction"
  }
}
```

## Storage Location

Memories are stored in `.rigour/memory.json` within your project directory. This file is automatically gitignored when you run `rigour init`.

## Best Practices

1. **Start sessions with recall**: Always call `rigour_recall` at the start of a new session
2. **Use meaningful keys**: `user_preferences`, `coding_conventions`, `critical_warnings`
3. **Keep values concise**: Store actionable instructions, not verbose explanations
4. **Clean up**: Use `rigour_forget` to remove outdated instructions

## Example Workflow

```
User: "Remember that I prefer functional programming patterns"

Agent: *calls rigour_remember with key="coding_style"*

--- New session ---

Agent: *calls rigour_recall*
Agent: "I see you prefer functional programming patterns. I'll use that approach."
```
