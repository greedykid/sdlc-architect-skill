# Command Adapter Reference

Discover project commands from evidence in this order:

1. contribution guides and project documentation;
2. CI workflows and task runners;
3. package manifests and scripts such as `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, and `Makefile`;
4. container, compose, migration, and deployment configuration;
5. framework defaults only when no project command exists.

Record the exact command, purpose, scope, and whether it ran. Prefer the declared package manager and tool versions. If multiple commands are plausible, use the documented or CI command and name the ambiguity.

Classify commands as read-only, local build/test, local state-changing, or external/production. Ask before destructive migrations, production deployment, external messages, or commands that may overwrite user data.

A failed command is baseline evidence with its output and suspected cause. Do not replace it with a guessed command and claim the original verification passed.
