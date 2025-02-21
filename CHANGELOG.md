# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-02-21
### Added
- GitHub Actions workflow to **automate npm publishing** when a tag is pushed.
- Validation to **avoid double "v"** in version numbers (e.g., `v1.2.3` → `1.2.3`).
- Enhanced **semantic versioning validation** before updates.
- Improved **README.md badge updates** to support multiple sources:
    - **Shields.io**
    - **Badgen.net**
    - **Fury.io**
    - **Nodei.co**

### Fixed
- Corrected **version badge updates** in `README.md` to prevent redundant replacements.

---

## [1.0.0] - 2024-09-07
### Added
- Initial release of `version-bumpify`.
- Support for automatically updating the version in `package.json`, `package-lock.json`, and version badge in `README.md`.
- Cross-platform compatibility for Linux, macOS, and Windows.
