# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- 💢 Moved to ESM only, in PR [#27](https://github.com/compulim/version-from-git/pull/27)
- Ported to TypeScript, in PR [#24](https://github.com/compulim/version-from-git/pull/24)
- Bumped dependencies, in PR [#23](https://github.com/compulim/version-from-git/pull/23)
   - Production dependencies
      - [`chalk@5.3.0`](https://npmjs.com/package/chalk/v/5.3.0)
      - [`commander@12.1.0`](https://npmjs.com/package/commander/v/12.1.0)
      - [`cross-spawn@7.0.3`](https://npmjs.com/package/cross-spawn/v/7.0.3)
      - [`on-error-resume-next@2.0.1`](https://npmjs.com/package/on-error-resume-next/v/2.0.1)
      - [`semver@7.6.2`](https://npmjs.com/package/semver/v/7.6.2)
- Added [ESLint import/export syntax](https://npmjs.com/package/eslint-plugin-import), in PR [#26](https://github.com/compulim/version-from-git/pull/26)
- Added [`publint`](https://npmjs.com/package/publint), in PR [#26](https://github.com/compulim/version-from-git/pull/26)
- Bumped dependencies, in PR [#28](https://github.com/compulim/version-from-git/pull/28)
  - Production dependencies
    - [`semver@7.6.3`](https://npmjs.com/package/semver/v/7.6.3)
  - Development dependencies
    - [`@typescript-eslint/eslint-plugin@8.8.1`](https://npmjs.com/package/@typescript-eslint/eslint-plugin/v/8.8.1)
    - [`@typescript-eslint/parser@8.8.1`](https://npmjs.com/package/@typescript-eslint/parser/v/8.8.1)
    - [`eslint@9.12.0`](https://npmjs.com/package/eslint/v/9.12.0)
    - [`eslint-plugin-prettier@5.2.1`](https://npmjs.com/package/eslint-plugin-prettier/v/5.2.1)
    - [`eslint-plugin-react@7.37.1`](https://npmjs.com/package/eslint-plugin-react/v/7.37.1)
    - [`prettier@3.3.3`](https://npmjs.com/package/prettier/v/3.3.3)
    - [`tsup@8.3.0`](https://npmjs.com/package/tsup/v/8.3.0)

## [1.1.2] - 2024-05-24

### Fixed

- Resolves [#16](https://github.com/compulim/version-from-git/issues/16). Fixes for Node.js 20, in PR [#17](https://github.com/compulim/version-from-git/pulls/17) and [#18](https://github.com/compulim/version-from-git/pulls/18), by [@evilru](https://github.com/evilru]

## [1.1.1] - 2019-08-12

### Added

- Fix [#2](https://github.com/compulim/version-from-git/issues/2). Supports customizing pre-release thru `--template`, in [PR #3](https://github.com/compulim/version-from-git/pulls/3)

## [1.0.0] - 2018-05-18

### Added

- Initial commit

[Unreleased]: https://github.com/compulim/version-from-git/compare/v1.1.2...HEAD
[1.1.2]: https://github.com/compulim/version-from-git/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/compulim/version-from-git/compare/v1.0.0...v1.1.1
[1.0.0]: https://github.com/compulim/version-from-git/releases/tag/v1.0.0
