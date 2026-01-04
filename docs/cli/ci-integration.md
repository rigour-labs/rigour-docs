```
---
sidebar_position: 2
---

# Production CI/CD Integration

Rigour is designed to be the final gate in your CI/CD pipeline, ensuring that NO code—human or AI—reaches production without passing engineering audits.

## GitHub Actions: The "Rigour Gate"

Add this workflow to your `.github/workflows/rigour.yml` to enforce standards on every PR.

```yaml
name: Rigour Quality Gate
on: [pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
## GitLab CI

```yaml
# .gitlab-ci.yml
rigour:
  image: node:20
  script:
    - npm ci
    - npx rigour check --ci
  only:
    - merge_requests
```

## Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
npx rigour check --ci
```

## CI Flags

| Flag | Purpose |
|------|---------|
| `--ci` | Enables strict mode, non-zero exit on failure |
| `--json` | Machine-readable output for parsing |

## Exit Codes in CI

Rigour uses standard exit codes for CI compatibility:

- **0**: All checks passed ✅
- **1**: Validation failed ❌
- **2**: Configuration error ⚠️
