# Security Threat Model Reference

Use this lightweight model for high-risk changes involving identity, sensitive data, external input, payments, public contracts, or deployment.

```markdown
Asset: <data, capability, or trust that needs protection>
Actor: <user, service, operator, attacker, or accidental cause>
Attack surface: <endpoint, UI, job, integration, storage, or deployment path>
Threat: <what could go wrong and how>
Mitigation: <design or control>
Verification: <test, inspection, monitoring, or exercise>
Residual risk: <what remains, owner, and decision>
```

Check authentication, authorization, input validation, abuse/rate limits, secrets, sensitive-data exposure, dependency/supply chain, auditability, and recovery. Keep threat statements specific to the actual increment. Do not invent compliance status or declare a control effective without evidence.

## STRIDE Threat Classification

Evaluate high-risk increments against each STRIDE category:

| Threat Category | Engineering Question | Standard Controls |
|---|---|---|
| **S - Spoofing** | Can an attacker pretend to be another user, system, or service? | Strong auth, JWT signature validation, mutual TLS, verified API keys. |
| **T - Tampering** | Can unauthorized actors modify data in transit or at rest? | Parameterized queries, schema validation, checksums, immutable audit logs. |
| **R - Repudiation** | Can a user or actor deny performing a critical transaction? | Structured audit logging, non-repudiable events, actor attribution. |
| **I - Information Disclosure** | Can sensitive data, tokens, or PII leak to unauthorized parties? | Token redaction, encryption at rest/transit, strict CORS, secret masking in CI. |
| **D - Denial of Service** | Can an attacker exhaust compute, database connections, or memory? | Rate limiting, request size limits, query timeouts, backpressure handling. |
| **E - Elevation of Privilege** | Can a regular user gain admin, cross-tenant, or unauthorized roles? | RBAC/ABAC enforcement, tenant boundary checks, least-privilege scoping. |

## AI & LLM Application Safety (OWASP Top 10 for LLM)

When the application involves LLMs, autonomous agents, RAG, or prompt-driven workflows, apply these controls:

1. **Prompt Injection Boundaries**: Treat all external text, user input, ingested files, and third-party APIs as untrusted data. Never allow untrusted data to overwrite system instructions or bypass security constraints.
2. **Insecure Output Handling**: Sanitize and validate LLM outputs before rendering in HTML (XSS prevention), executing in shell/eval, or passing to database queries.
3. **Sensitive Data Redaction**: Filter and redact credentials, API keys, passwords, and PII before sending prompts to external LLM providers or persisting them in logs.
4. **Tool & Action Blast Radius**: Equip AI agents with least-privilege tool access. Require explicit human confirmation before destructive operations (file deletion, production deployment, financial transactions).
5. **Supply Chain & Model Integrity**: Pin model versions, verify SDK dependencies, and protect vector embeddings and RAG pipelines against poisoning.

## Security Gate Checklist (Definition of Ready)

An increment touching sensitive boundaries cannot be marked **Ready** until:
- [ ] Assets, actors, and attack surfaces are identified.
- [ ] Mitigations are designed for any applicable STRIDE or AI threat.
- [ ] Verification tests (unit/integration or security scanning) are scheduled in the increment.
- [ ] Secrets and credentials are externalized via environment variables or secret managers.
- [ ] Residual risk has an assigned owner and agreed mitigation path.

