# version-from-git

[![npm version](https://badge.fury.io/js/version-from-git.svg)](https://badge.fury.io/js/version-from-git) [![Build Status](https://travis-ci.org/compulim/version-from-git.svg?branch=master)](https://travis-ci.org/compulim/version-from-git)

# Background

We want to use `npm version` to bump to a customized version that contains both Git branch and commit hash.

And use Travis CI to automatically publish the prerelease version to NPM, tagged using [`npm dist-tag`](https://docs.npmjs.com/cli/dist-tag).

# How to use

Run `npx version-from-git`, it will run `npm version 1.0.0-master+1a2b3c4`.

```
  Usage: version-from-git [options]

  Bump package.json version to pre-release tagged with Git branch and short commit hash, 1.0.0-master+1a2b3c4

  Options:

    -V, --version            output the version number
    -p, --path <path>        path to package.json, default to current directory (default: C:\Users\Compulim\Source\Repos\version-from-git)
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

# Contributions

Like us? [Star](https://github.com/compulim/version-from-git/stargazers) us.

Want to make it better? [File](https://github.com/compulim/version-from-git/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/version-from-git/pulls) a pull request.
