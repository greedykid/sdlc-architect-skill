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

## Increment sizing standards

Classify every proposed increment before entering Build mode:

| Size | File Scope | Architectural Boundaries | Risk Level | Execution Guidance |
|---|---|---|---|---|
| **S (Small)** | 1–2 files | Single component or utility | Low | Implement and verify within a single turn. |
| **M (Medium)** | 3–5 files | Single service or cohesive layer | Moderate | Standard increment size. Requires DoR and explicit acceptance criteria. |
| **L (Large)** | 6–10 files | Cross-layer (e.g. DB schema + API endpoint) | High | **Must split** into 2 or more sub-increments before coding. |
| **XL (Extra Large)** | >10 files | End-to-end full stack (DB + Service + API + UI) | Critical | **Must decline single-turn build**. Decompose into an architectural plan with sequence. |

## Auto-splitting protocol

When an increment is categorized as **Large** or **Extra Large**, the agent must **not** attempt all-at-once implementation. Instead:

1. **Stop & Report**: Inform the user that the request exceeds the safe context boundary for a single increment.
2. **Propose Decomposed Sub-Increments**:
   - **Sub-increment 1 (Data & Architecture)**: Schema migration, ADR documentation, and data access contracts.
   - **Sub-increment 2 (Domain & Business Logic)**: Service layer logic, business validation, and unit tests.
   - **Sub-increment 3 (API & External Contracts)**: HTTP/gRPC handlers, schema serialization, and integration tests.
   - **Sub-increment 4 (Client & Interface)**: UI components, styling, accessibility compliance, and anti-slop review.
3. **Establish Clear Handoffs**: Each sub-increment must pass its own Definition of Done and test suite before the next sub-increment begins.
4. **Preserve Parent Traceability**: Name sub-increments using parent requirement IDs (e.g. `REQ-AUTH-001a`, `REQ-AUTH-001b`).

At iteration close, update project state, traceability, completed evidence, carried risks, and the next candidate. Partially completed work is never `Done`.
