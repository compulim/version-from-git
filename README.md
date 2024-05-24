# version-from-git

[![npm version](https://badge.fury.io/js/version-from-git.svg)](https://badge.fury.io/js/version-from-git)

# Background

We want to use `npm version` to bump to a customized version that contains both Git branch and commit hash.

And use Travis CI to automatically publish the pre-release version to NPM, tagged using [`npm dist-tag`](https://docs.npmjs.com/cli/dist-tag).

> Instead of using plus (+) to denote build information, we prefer period (.) for simpler escapes. If you prefer the plus sign, you can [customize the pre-release version pattern](#customizing-pre-release-version-pattern).

# How to use

Run `npx version-from-git`, it will run `npm version 1.0.0-main.1a2b3c4`.

```
  Usage: version-from-git [options]

  Bump package.json version to pre-release tagged with Git branch and short commit hash, 1.0.0-main.1a2b3c4

  Options:

    -V, --version            output the version number
    -p, --path <path>        path to package.json, default to current directory (default: C:\Users\Compulim\Source\Repos\version-from-git)
    --template <template>    pre-release version template (default: branch.short)
    -t, --travis             run in Travis CI: skip when TRAVIS_TAG present
    -f, --force              run "npm version" with --force
    -m, --message <message>  run "npm version" with --message
    --allow-same-version     run "npm version" with --allow-same-version
    --sign-git-tag           run "npm version" with --sign-git-tag
    --no-commit-hooks        run "npm version" with --commit-hooks
    --no-git-tag-version     run "npm version" with --no-git-tag-version
    -h, --help               output usage information
```

## How to use under Travis

In Travis, when you push a tag (probably by `npm version 1.0.0` followed by `git push origin v1.0.0`), you may want to skip `version-from-git` from generating a pre-release tag.

Run `npx version-from-git -t`, it will detect whether `TRAVIS_TAG` environment variable is present and skip.

## Customizing pre-release version pattern

You can customize the version pattern when tagging for pre-release versions by running with argument `--template branch.short`.

| Pattern name | Description                                                      | Sample                                     |
| ------------ | ---------------------------------------------------------------- | ------------------------------------------ |
| `branch`     | Branch name<br />In Travis, will use `process.env.TRAVIS_BRANCH` | `main`                                     |
| `long`       | Git commit in long form                                          | `3807f9004867438c57a3e26f2073c33c458d4ef9` |
| `short`      | Git commit in short form                                         | `3807f90`                                  |

Default pattern is `branch.short`, which would produce `main.1a2b3c4`.

# Contributions

Like us? [Star](https://github.com/compulim/version-from-git/stargazers) us.

Want to make it better? [File](https://github.com/compulim/version-from-git/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/version-from-git/pulls) a pull request.
