# Presets & Roles

In Rigour v2.0.0, we distinguish between **Project Roles** (which define gate thresholds) and **Language Support** (which is now universal and automatic).

## Project Roles (`preset`)

The `preset` field defines the "personality" of your project. Each role comes with tailored SME thresholds for complexity, line counts, and security.

### `api` (Backend Services)
Optimized for high-reliability backend logic.
- **Complexity Limit**: 10
- **Security Sinks**: Strict (eval/exec banned)
- **Primary Goal**: Reliability and maintainable business logic.

### `ui` (Web/React/Next.js)
Optimized for components and user interfaces.
- **Complexity Limit**: 15 (Allows for nested JSX)
- **Max Function Lines**: 60
- **Primary Goal**: Component modularity and hook safety.

### `infra` (Terraform/CDK/IaC)
Optimized for infrastructure as code.
- **Safe Paths**: Strict protection of `.github` and CI configs.
- **Primary Goal**: Preventing accidental infrastructure destruction.

---

## Universal Language Support
Unlike v1.x, you no longer need to "enable" language presets. Rigour's **Universal SME Engine** automatically detects and supervises:

- **Web**: TypeScript, JavaScript, React
- **Systems**: Go, Rust, C, C++
- **Enterprise**: Java, C#
- **Scripting**: Python, Ruby, PHP, Kotlin, Swift

---

## How it works

Rigour combines your **Role** (thresholds) with your **Language** (syntax-aware queries) to provide expert-level supervision.

```yaml
# rigour.yml
preset: api    # Use API thresholds
paradigm: oop  # Enforce object-oriented best practices
```

Rigour will then automatically apply Go-specific error handling checks if it sees `.go` files, and Python-specific mutable default checks for `.py` files, both using the `api` complexity limits.
