# Evidence Reference

Label important facts, decisions, audit findings, and handoff claims:

| Grade | Meaning | Basis |
| --- | --- | --- |
| `Verified` | Directly checked | Code, test output, command result, rendered diagram, runtime observation, or named source |
| `Inferred` | Strong conclusion from available evidence | Multiple artifacts agree, but no direct check exists |
| `Assumed` | Temporary premise used to continue | User has not confirmed it and impact is recorded |
| `Unknown` | Information is unavailable | No reliable basis exists yet |

“Probably works” is not `Verified`. Promote a claim only after collecting new evidence. If evidence is unavailable, state the limitation and the next check.

## Requirement interview

Ask only questions that change scope, risk, architecture, acceptance criteria, or verification:

1. What outcome does which actor need, and what triggers it?
2. What is the normal flow, alternate flow, and important failure behavior?
3. What data is created or changed, who may access it, and who owns it?
4. What must remain compatible, fast, available, private, accessible, or reversible?
5. How will success be observed, tested, or measured?

Ask the highest-impact blocking question first. Ask a compact batch only for independent low-risk gaps. Stop when Definition of Ready is satisfied. Do not ask questions that repository evidence can answer.
