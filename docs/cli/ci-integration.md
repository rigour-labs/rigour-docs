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
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install -g @rigour-labs/cli
      - run: rigour check --ci
## Advanced CI Patterns

### 🦊 GitLab CI/CD
Rigour integrates natively with GitLab's job system. Ensure you use the `node:20` image or higher.

```yaml
# .gitlab-ci.yml
rigour-audit:
  stage: test
  image: node:20
  script:
    - npm ci
    - npx rigour check --ci --json > rigour-report.json || true
    - # Fail the job if the status is FAIL in the JSON
    - if [ "$(grep -o '"status":"FAIL"' rigour-report.json)" ]; then exit 1; fi
  artifacts:
    when: always
    paths:
      - rigour-report.json
      - rigour-fix-packet.json
```

### 🏗️ Jenkins (Pipeline)
For Jenkins, we recommend using the `sh` step with a return status check.

```groovy
pipeline {
    agent any
    stages {
        stage('Rigour Audit') {
            steps {
                script {
                    def status = sh(script: "npx rigour check --ci", returnStatus: true)
                    if (status == 1) {
                        unstable("Rigour: Engineering violations found.")
                    } else if (status > 1) {
                        error("Rigour: System/Config error occurred.")
                    }
                }
            }
        }
    }
}
```

---

## Mechanical Review: Parsing the Report

When running in `--json` mode, Rigour produces a rich diagnostic object. You can use `jq` to create custom CI dashboard messages.

### Example: Count failures per file
```bash
cat rigour-report.json | jq '.failures | group_by(.files[0]) | map({file: .[0].files[0], count: length})'
```

### Example: Extract all hints for a Slack notification
```bash
cat rigour-report.json | jq -r '.failures[] | "🚨 \(.title): \(.hint)"'
```

---

## Security: The "Snapshot Guard"
In a shared CI environment, Rigour verifies the **Integrity of the Change**.
- **`max_files_changed_per_cycle`**: If a PR touches more than 10 files (default), Rigour identifies this as "high-risk" and requires manual override or refactoring.
- **`protected_paths`**: Rigour prevents AI agents from modifying sensitive CI infrastructure files (like `.github/` or `rigour.yml` itself), even if the agent has filesystem access.
