# Forward Testing Reference

Use `tests/behavioral-scenarios.md` as the evaluator catalog and `tests/forward-test-plan.md` as the execution contract. Run each scenario in an isolated temporary project with no live production access.

The evaluator receives the packaged skill, minimum raw project artifacts, and the scenario prompt. Do not provide expected behavior, suspected defects, or prior conclusions. Capture response, changed files, artifacts, commands, evidence grades, and result.

Evaluate acceptance and scope behavior, not exact wording. Use `PASS`, `FAIL`, or `INCONCLUSIVE`. A failure must cite observed behavior and the relevant rule. Change the skill only for a demonstrated failure or ambiguity, then rerun the affected and neighboring scenario.

The repository scripts validate catalog and plan coverage. `scripts/run-forward-tests.mjs` performs isolated setup and invokes an explicitly supplied evaluator command. It does not simulate an LLM or claim behavioral success without an evaluator.
