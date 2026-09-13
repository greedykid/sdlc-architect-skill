# Iteration Reference

Use an existing issue tracker or backlog format when available. Otherwise use a small repo-native backlog with statuses:

`Candidate` → `Ready` → `In Progress` → `Verification` → `Done`

Also allow `Blocked`, `Superseded`, and `Rejected`. A blocked item must name the blocking decision, owner, and unblock action.

## Selection order

Choose the next item in this order:

1. unblock a dependency that prevents a committed outcome;
2. address a high-risk decision before dependent implementation;
3. complete in-progress work before unrelated work;
4. choose the smallest Ready item with user or operational value;
5. prefer uncertainty-reducing work when value is similar.

Priority labels alone are not enough. Check dependency, risk, readiness, and verification feasibility.

Keep one primary increment in Build mode. Split work when it crosses independent outcomes, boundaries, migrations, or verification strategies. Link split items to the original requirement and preserve the original status.

At iteration close, update project state, traceability, completed evidence, carried risks, and the next candidate. Partially completed work is never `Done`.
