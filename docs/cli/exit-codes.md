---
sidebar_position: 2
---

# Exit Codes: Deep Dive

Rigour uses standardized exit codes to enable seamless integration with any orchestration layer (CI/CD, K8s, local git hooks).

## Reference Table

| Code | Status | Meaning | Action Required |
|:---:|:---:|:---|:---|
| `0` | **PASS** | Audits satisfied. | Safe to merge/deploy. |
| `1` | **FAIL** | Engineering violations found. | Agent or human must refactor. |
| `2` | **CONFIG_ERROR** | Invalid `rigour.yml`. | Fix YAML syntax or schema. |
| `3` | **INTERNAL_ERROR** | System/Filesystem crash. | Check permissions or OOM. |

---

## Technical Details

### Code 1: Audit Failure (Expected)
This is a **logical failure**. It indicates that the audit logic worked perfectly but the code quality was insufficient.
- **In CI**: This should block the build.
- **In Loop**: This triggers a refinement cycle in `rigour run`.

### Code 2: Configuration Error
Triggered when the Zod-based configuration parser fails.
- **Common Cause**: Using a string where a number is expected (e.g. `complexity: "high"` instead of `complexity: 10`).
- **Fix**: Run `rigour guide` to validate your configuration interactively.

### Code 3: Internal Error
These are unexpected exceptions (e.g., `EMFILE` for too many open files during AST parsing).
- **Troubleshooting**: If this persistent in CI, ensure your runner has sufficient memory and file handle limits.

---

## Universal Shell Handling

### 🐚 Bash / Zsh (Linux & macOS)
Use `$?` to capture the last exit code.

```bash
npx @rigour-labs/cli check --ci
case $? in
  0) echo "Audit passed!" ;;
  1) echo "Violations detected." && exit 1 ;;
  2) echo "Config is broken." && exit 1 ;;
  *) echo "Unexpected system error." && exit 1 ;;
esac
```

### 🔹 PowerShell (Windows / Azure DevOps)
Use `$LASTEXITCODE` for reliability in Windows environments.

```powershell
npx @rigour-labs/cli check --ci
if ($LASTEXITCODE -eq 0) {
    Write-Host "Rigour PASS" -ForegroundColor Green
} elseif ($LASTEXITCODE -eq 1) {
    Write-Error "Audit Failed: Violations found"
} else {
    Write-Error "System Error ($LASTEXITCODE)"
}
```

---

## Integration Pro-tip: "The Supervisor Pattern"
When building custom wrappers around Rigour, differentiate between Code 1 and Codes 2/3.
- If **Code 1**: Provide the `rigour-fix-packet.json` to the agent.
- If **Code 2/3**: Fail the pipeline immediately without re-invoking the agent, as a system fix is required.
