# Migration and Rollback Reference

For persisted data, public contracts, or independently deployed services, prefer:

```text
expand compatible schema or contract
  → migrate or backfill safely
  → verify data and compatibility
  → switch readers/writers or traffic
  → observe and stabilize
  → contract old field or behavior
```

For every step, record owner, order, idempotency, duration or limit, backup/recovery point, rollback trigger, and verification. Use dual-read or dual-write only when consistency and cleanup are understood.

Rollback is not always an old deploy. Check data, events, external side effects, caches, and irreversible migrations. If reversal is impossible, define forward recovery, feature disablement, replay, or manual repair and state the limit before implementation.

High-risk migrations require a rehearsal, representative backup/restore check, or an explicit limitation accepted by the owner. A migration is not safe merely because forward code or SQL compiles.
