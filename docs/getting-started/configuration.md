# Configuration

Customize Rigour for your project with `rigour.yml`.

## Minimal Configuration

Create a `rigour.yml` in your project root. Rigour uses sensible defaults, but a basic config helps define your project's identity:

```yaml
# rigour.yml
version: 1
preset: api      # api, ui, infra, or data
paradigm: oop    # oop, functional, or minimal

# Quality Gates
gates:
  max_file_lines: 500
  ast:
    complexity: 10
    max_params: 5
```

## Configuration Core

### 1. Safety Rails
Prevent AI agents from touching critical files.

```yaml
gates:
  safety:
    protected_paths:
      - ".github/**"
      - "rigour.yml"
      - "*.lock"
    max_files_changed_per_cycle: 10
```

### 2. Universal AST SME
Enable structural analysis for your specific language. Rigour automatically detects your language, but you can tune the expert logic:

```yaml
gates:
  ast:
    complexity: 10      # Max Cognitive Load
    max_function_lines: 50
```

### 3. Quality Handshake (SAST+DAST)
Bridge the gap between code structure and tests.

```yaml
gates:
  coverage:
    risk_adjusted: true # Requires high coverage for complex code
```

## Next Steps

- **[Full Reference](/reference/configuration)** - Complete schema specification.
- **[SME Cookbooks](/examples/sme-cookbooks)** - Advanced patterns for Go, Python, and Java.
- **[CLI Commands](/cli/commands)** - See all available commands.
