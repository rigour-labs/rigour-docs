---
sidebar_position: 6
---

# Industry Presets

Rigour v2.17+ ships with compliance-tuned presets for regulated industries. Each preset configures quality gates, security thresholds, and documentation requirements aligned with industry standards.

## Usage

```bash
rigour init --preset healthcare    # HIPAA / FDA / HL7
rigour init --preset fintech       # SOC2 / PCI-DSS / DORA
rigour init --preset government    # FedRAMP / NIST / CMMC
```

---

## Healthcare

**Compliance Alignment:** HIPAA, FDA 21 CFR Part 11, HL7/FHIR

**Detection Markers:** `hl7`, `fhir`, `hipaa`, `medical`, `patient`, `health`, `ehr`, `phi`, `dicom`, `icd-10`, `snomed`

| Gate | Value | Rationale |
|:-----|:------|:----------|
| `max_file_lines` | 300 | Small, auditable modules for PHI handling |
| `required_files` | `COMPLIANCE.md`, `SPEC.md`, `ARCH.md`, `README.md` | Audit trail documentation |
| `security.block_on_severity` | `critical` | Block deployment on critical security findings |
| All AI gates | Enabled | Hallucinated imports, promise safety, drift detection |

### Generated Config

```yaml
preset: healthcare
gates:
  max_file_lines: 300
  required_files:
    - docs/COMPLIANCE.md
    - docs/SPEC.md
    - docs/ARCH.md
    - README.md
  security:
    enabled: true
    block_on_severity: critical
```

---

## Financial Services (Fintech)

**Compliance Alignment:** SOC2 Type II, PCI-DSS, DORA, SOX

**Detection Markers:** `trading`, `payment`, `kyc`, `aml`, `pci`, `transaction`, `ledger`, `banking`, `stripe`, `plaid`, `sox`

| Gate | Value | Rationale |
|:-----|:------|:----------|
| `max_file_lines` | 350 | Moderate size for complex financial logic |
| `required_files` | `AUDIT_LOG.md`, `SPEC.md`, `ARCH.md`, `README.md` | Audit trail for SOC2 compliance |
| `security.block_on_severity` | `high` | Block on high+ severity findings |
| `agent_team.enabled` | `true` | Multi-agent governance for team workflows |

### Generated Config

```yaml
preset: fintech
gates:
  max_file_lines: 350
  required_files:
    - docs/AUDIT_LOG.md
    - docs/SPEC.md
    - docs/ARCH.md
    - README.md
  security:
    enabled: true
    block_on_severity: high
  agent_team:
    enabled: true
    max_agents: 5
    require_handoff: true
```

---

## Government

**Compliance Alignment:** FedRAMP, NIST 800-53, CMMC, FISMA, ITAR

**Detection Markers:** `fedramp`, `nist`, `cmmc`, `federal`, `govcloud`, `il4`, `il5`, `fisma`, `itar`, `cui`

| Gate | Value | Rationale |
|:-----|:------|:----------|
| `max_file_lines` | 250 | Strictest — small, reviewable units |
| `ast.complexity` | 8 | Lower complexity ceiling for auditable code |
| `ast.max_function_lines` | 40 | Short functions for security review |
| `required_files` | `SECURITY.md`, `SPEC.md`, `ARCH.md`, `README.md` | Security documentation required |
| `security.block_on_severity` | `medium` | Block on medium+ (strictest threshold) |
| `agent_team.enabled` | `true` | Full governance controls |
| `checkpoint.enabled` | `true` | Long-running task supervision |

### Generated Config

```yaml
preset: government
gates:
  max_file_lines: 250
  ast:
    complexity: 8
    max_function_lines: 40
  required_files:
    - docs/SECURITY.md
    - docs/SPEC.md
    - docs/ARCH.md
    - README.md
  security:
    enabled: true
    block_on_severity: medium
  agent_team:
    enabled: true
    max_agents: 5
    require_handoff: true
  checkpoint:
    enabled: true
    interval_minutes: 10
    quality_threshold: 85
```

---

## Combining with Paradigms

Industry presets can be combined with coding paradigms:

```bash
rigour init --preset healthcare --paradigm functional
rigour init --preset fintech --paradigm oop
```

The config merge order is: Universal Config → Industry Preset → Paradigm → Local Overrides.

---

## Exporting Audit Reports

After running checks with an industry preset, use `rigour export-audit` to generate compliance-ready reports:

```bash
rigour check
rigour export-audit --format md    # Human-readable Markdown
rigour export-audit --format json  # Structured JSON for tooling
```

See the [Export Audit](/cli/export-audit) command reference for details.
