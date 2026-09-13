# API and Dependency Lifecycle Reference

Use this reference for public APIs, events, SDKs, generated clients, service contracts, and dependency upgrades.

## API lifecycle

- Define an owner, consumer set, compatibility promise, and current version for each public contract.
- Prefer additive changes. Version or explicitly coordinate breaking changes.
- Mark deprecated fields or endpoints with removal conditions, migration guidance, and an owner.
- Update contract tests, generated clients, examples, diagrams, and release notes together.
- Communicate breaking behavior before rollout and preserve an overlap period when consumers cannot switch atomically.
- Record whether compatibility is backward, forward, or both. Do not claim compatibility without a test or documented proof.

## Dependency lifecycle

- Record why a dependency is needed, its owner, license, supported version range, and security/update policy.
- Inspect lockfiles, transitive impact, runtime support, bundle or image size, and breaking changes before upgrading.
- Run focused tests plus contract/integration checks at the dependency boundary.
- Separate dependency upgrades from unrelated refactors so regressions are attributable.
- Define rollback or pinning behavior when an upgrade fails in CI or production.

## Generated clients and schemas

Treat generated clients, schemas, and documentation as derived artifacts. Change the source contract first, regenerate with the project command, review the diff, run compatibility tests, and record the generator version. Never hand-edit generated output as the durable fix.
