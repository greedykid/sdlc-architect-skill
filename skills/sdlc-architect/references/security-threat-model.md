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
