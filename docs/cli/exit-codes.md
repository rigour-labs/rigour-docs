---
sidebar_position: 2
---

# Exit Codes

Rigour uses standardized exit codes to enable seamless integration with CI/CD pipelines and shell scripts.

## Reference Table

| Code | Meaning | Context |
|:---:|:---|:---|
| `0` | **PASS** | All quality gates were satisfied. |
| `1` | **FAIL** | One or more engineering violations were found. |
| `2` | **CONFIG_ERROR** | `rigour.yml` is missing or contains schema errors. |
| `3` | **INTERNAL_ERROR** | An unexpected crash or filesystem error occurred. |

## Usage in CI/CD

### Simple Pass/Fail
In most CI environments, any non-zero exit code will trigger a build failure.

```bash
# This will fail the pipeline if quality gates are violated
npx @rigour-labs/cli check --ci
```

### Advanced Automation
For custom automation scripts, you can differentiate between a "logical failure" (violation) and a "system failure" (config error).

```bash
npx @rigour-labs/cli check --ci
STATUS=$?

if [ $STATUS -eq 0 ]; then
  echo "Ship it! 🚀"
elif [ $STATUS -eq 1 ]; then
  echo "Engineering standards not met. Fix violations."
  exit 1
elif [ $STATUS -eq 2 ]; then
  echo "Misconfigured project. Check rigour.yml."
  exit 1
else
  echo "Something went wrong in the machine."
  exit 1
fi
```
