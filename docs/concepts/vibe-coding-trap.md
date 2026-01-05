# The "Vibe Coding" Trap

**"Vibe Coding"** is when an AI agent claims completion based on its internal narrative rather than external execution. It's the gap between an agent saying *"I'm 100% done"* and your CI pipeline crashing with 13 type errors.

## The Symptoms of Vibe Coding

You know you're stuck in the Vibe Coding Trap when:
- The agent promises "CI will pass now," but it doesn't.
- You spend more time reviewing "hallucinated fixes" than writing code.
- You have to forcefully repeat instructions like "run the tests again" before the agent admits failure.
- The agent guesses variable names based on "vibes" rather than checking the existing project context.

## The Rigour Solution: Execution-Verification

Rigour kills Vibe Coding by injecting a **deterministic firewall** between the agent's output and your codebase.

### Narrative vs. Reality
Rigour ignores what the agent *says* it did. Instead, it measures what the tools *report*:

| Agent Says... | Rigour Checks... | Outcome |
| :--- | :--- | :--- |
| "I've fixed all type errors." | `mypy .` | **FAIL** (13 errors found) |
| "The code is formatted." | `ruff format --check` | **FAIL** (2 files drifted) |
| "I'm using project patterns." | `ContextEngine` | **FAIL** (Redundant variation) |

## The Result: Guaranteed Engineering

When you use Rigour, the agent's definition of "Done" is tethered to your project's technical reality. The agent is forced to cycle through **Fix Packets**—actually running the tools and fixing the errors—until the system returns a hard **PASS**.

No more guessing. No more patience required. **Rigour adds the engineering.**
