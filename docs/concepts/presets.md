# Presets, Roles & Paradigms

Rigour uses a hierarchical configuration system that combines **Project Roles**, **Coding Paradigms**, and **Universal Standards** to provide expert-level supervision with zero initial configuration.

## The Hierarchy of Rigour

When you run an audit, Rigour assembles your quality gates in this order:
1.  **Universal Config**: Base standards (e.g., forbidding `TODO`s, base complexity).
2.  **Project Role (`preset`)**: Industry-standard thresholds for your project type (API, UI, etc.).
3.  **Coding Paradigm (`paradigm`)**: Language-agnostic structural rules (OOP, Functional).
4.  **Local Overrides**: Your project's specific `rigour.yml` settings.

---

## Universal Standards (`UNIVERSAL_CONFIG`)

Every Rigour project starts with these "hygiene" gates:

| Gate | Default Value | Description |
|:---|:---:|:---|
| `max_file_lines` | `500` | Maximum allowed lines per file |
| `forbid_todos` | `true` | Prevents merging code with `TODO` markers |
| `forbid_fixme` | `true` | Prevents merging code with `FIXME` markers |
| `max_files_changed` | `10` | Safety rail for AI agent "explosions" |

---

## Project Roles (`preset`)

Roles define the "personality" of your project. They are detected by the existence of specific files or dependencies.

### `api` (Backend Services)
Optimized for high-reliability, maintainable backend logic.
- **Detection**: `express`, `nestjs`, `go.mod`, `requirements.txt`, `pyproject.toml`, `main.go`.
- **Thresholds**:
  - `max_file_lines`: `400`
- **Required Docs**: `docs/SPEC.md`, `docs/ARCH.md`, `README.md`
- **Roadmap**: Service layer enforcement (Controllers → Services).

### `ui` (Web/React/Next.js)
Optimized for component-based modularity and JSX complexity.
- **Detection**: `react`, `next`, `vue`, `svelte`, `tailwind.config.js`, `vite.config.ts`.
- **Thresholds**:
  - `max_file_lines`: `300`
- **Required Docs**: `docs/SPEC.md`, `docs/ARCH.md`, `README.md`
- **Roadmap**: Prop-drilling detection (Max depth 5).

### `infra` (IaC/DevOps)
Focuses on safety and preventing accidental infrastructure destruction.
- **Detection**: `Dockerfile`, `docker-compose.yml`, `main.tf`, `k8s/`, `helm/`, `ansible/`.
- **Thresholds**:
  - `max_file_lines`: `300`
- **Required Docs**: `docs/RUNBOOK.md`, `docs/ARCH.md`, `README.md`

### `data` (Data/ML Pipelines)
Optimized for reproducibility and pipeline clarity.
- **Detection**: `ipynb`, `spark`, `pandas`, `dbt_project.yml`, `data/`.
- **Thresholds**:
  - `max_file_lines`: `500`
- **Required Docs**: `docs/DATA_DICTIONARY.md`, `docs/PIPELINE.md`, `README.md`
- **Roadmap**: Stochastic determinism (seed enforcement) and PII leak detection.

---

## Coding Paradigms (`paradigm`)

Paradigms apply syntax-aware AST rules. Rigour scans your source code content to detect the dominant paradigm.

### `oop` (Object-Oriented)
- **Patterns**: `class`, `interface`, `extends`, `constructor`, `private`, `public`.
- **AST Gates**:
  - **Complexity**: `10`
  - **Max Methods**: `10` per class
  - **Max Params**: `5` per method
  - **Inheritance Depth**: `3`
  - **Class Dependencies**: `5`

### `functional`
- **Patterns**: `export const`, `reduce(`, `.pipe(`, `compose(`, `curry(`, `readonly`.
- **AST Gates**:
  - **Complexity**: `8`
  - **Max Functions**: `15` per file
  - **Max Params**: `4` per function
  - **Max Nesting**: `3`
  - **Function Lines**: `40`

---

## Auto-Discovery

The `rigour init` command performs a deep scan of your environment:
1.  **Dependency Scan**: Checks `package.json`, `go.mod`, etc., for Role markers.
2.  **Filesystem Scan**: Looks for config files (e.g., `Dockerfile`) for Role markers.
3.  **Content Heuristics**: Samples top source files to detect coding patterns (e.g., heavy use of `class` vs. `const`) to assign a Paradigm.

To override discovery:
```bash
rigour init --preset api --paradigm oop
```
