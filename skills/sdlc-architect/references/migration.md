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

## Zero-downtime database playbooks

### 1. Renaming a column or field
Never execute a direct `ALTER TABLE ... RENAME COLUMN` on active production tables. Follow the phased protocol:
1. **Phase 1 (Expand)**: Add `new_column` as nullable.
2. **Phase 2 (Dual-Write)**: Deploy code that writes to both `old_column` and `new_column`, but reads from `old_column`.
3. **Phase 3 (Backfill)**: Run an asynchronous chunked batch backfill (`UPDATE tbl SET new_column = old_column WHERE new_column IS NULL LIMIT 1000`).
4. **Phase 4 (Read Switch)**: Deploy code that reads from `new_column` and continues dual-write.
5. **Phase 5 (Deprecate Write)**: Deploy code that writes only to `new_column`.
6. **Phase 6 (Contract)**: Drop `old_column` in a subsequent release after observability stabilizes.

### 2. Adding a NOT NULL constraint
Adding `NOT NULL` with a default directly can lock large tables:
1. Add column as nullable without default.
2. Deploy code with application-level fallback default for new rows.
3. Backfill existing null records in batches.
4. Add check constraint `CHECK (column IS NOT NULL) NOT VALID` (does not lock table).
5. Run `VALIDATE CONSTRAINT` in a background maintenance transaction.
6. Alter column to `NOT NULL`.

### 3. Chunked batch processing rules
When backfilling or pruning data:
- Always chunk by indexed primary key (e.g., `WHERE id BETWEEN ? AND ?`).
- Limit batches to 500–2,000 rows per transaction.
- Include a short throttle delay (e.g., 50–100ms) between batches to allow database replicas to catch up and prevent replication lag.
- Monitor active connections and rollback on lock-wait timeouts.

## Rollback decision matrix

| Scenario | Rollback Approach | Primary Risk & Mitigation |
|---|---|---|
| **Additive change (new table/nullable col)** | Deploy previous code version. Leave schema intact. | Low risk. Unused columns/tables do not break old code. |
| **Breaking schema change mid-migration** | Execute down migration script (`down.sql`). | Risk of data loss if new writes occurred; check for dual-write data before dropping. |
| **Data corruption or faulty backfill** | Run compensating transactional repair script. | Do NOT restore full DB backup unless corruption is catastrophic; use point-in-time recovery on affected table. |
| **Irreversible external side effects (e.g. emails/payments)** | Disable feature flag; trigger manual compensation runbook. | Requires dead-letter queue or idempotency keys to replay/refund. |

