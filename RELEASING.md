# Release Process

Every version change must include a changelog entry, a matching semantic-version tag, and a GitHub Release.

## Release steps

1. Update `.codex-plugin/plugin.json` and `package.json` with the new version.
2. Add `## [X.Y.Z] - YYYY-MM-DD` to `CHANGELOG.md` with concrete Added, Changed, Fixed, or Removed entries.
3. Run the repository checks, including `node scripts/check-release.mjs`.
4. Commit the version and changelog together.
5. Push the commit to `main`.
6. Create and push tag `vX.Y.Z`.
7. The release workflow validates the tag and creates the GitHub Release from the matching changelog section.

Never create a release from an uncommitted version change. A version bump without a changelog entry or matching tag is incomplete.

## Version policy

- Patch: backward-compatible fixes or documentation and validation corrections.
- Minor: backward-compatible skill capability, reference, or workflow additions.
- Major: incompatible artifact schema, invocation contract, or behavior changes that require user migration.

If a change affects the state schema or artifact contract, include migration instructions in the changelog and release notes.
