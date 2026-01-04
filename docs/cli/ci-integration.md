---
sidebar_position: 2
---

# CI Integration

Integrate Rigour into your CI/CD pipeline.

## GitHub Actions

```yaml
# .github/workflows/rigour.yml
name: Rigour Check

on:
  pull_request:
    branches: [main]

jobs:
  rigour:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Rigour
        run: npx rigour check --ci --json
```

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
