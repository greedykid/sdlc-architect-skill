# Project State Reference

Use the repository's existing state file when present. Otherwise create `docs/sdlc/project-state.md` from [templates/project-state.md](../../templates/project-state.md). Keep it small and link to durable requirements, ADRs, tests, and runbooks instead of copying them into state.

## Update rules

Update state when the active phase, increment, risk, open decision, verification result, or next action changes. Do not rewrite it for every code edit. Never store secrets, tokens, customer records, or raw logs in it.

Required fields:

- `State version`, `Updated`, `Mode`, `Phase`, project classification, iteration, and active outcome;
- baseline facts and pre-existing failures;
- active requirement, decision, diagram/contract, test, and operations IDs;
- open decisions and risks with owner and status;
- last verification with evidence grade and result;
- one next action.

State is navigation, not unquestionable truth. Verify it against the repository before continuing. If it contradicts code, tests, or current ADRs, preserve the discrepancy as a finding and resolve it before advancing.

## Continuity protocol

1. Read the state file and identify the recorded next action.
2. Inspect the linked artifacts and current repository baseline.
3. Grade each important state claim as `Verified`, `Inferred`, `Assumed`, or `Unknown`.
4. Continue only the smallest action that is still Ready.
5. Update state with evidence, changed risks, and the next action before handing off.
