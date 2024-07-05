#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import spawn from 'cross-spawn';
import { branch as gitBranch, long as gitLong, short as gitShort } from 'git-rev-sync';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { onErrorResumeNext } from 'on-error-resume-next/async';
import { readPackage } from 'read-pkg';
import { major, minor, patch } from 'semver';

const { green, magenta, red, yellow } = chalk;
const { log } = console;
const ourPackageJSON = await readPackage({ cwd: join(fileURLToPath(import.meta.url), '../../') });

const DEFAULT_TEMPLATE = 'branch.short';

program
  .version(ourPackageJSON.version)
  .description(ourPackageJSON.description || '')
  .option('-p, --path <path>', 'path to package.json, default to current directory', process.cwd())
  .option('--template <template>', 'pre-release version template', DEFAULT_TEMPLATE)
  .option('-t, --travis', 'run in Travis CI: skip when TRAVIS_TAG present')
  .option('-f, --force', 'run "npm version" with --force')
  .option('-m, --message <message>', 'run "npm version" with --message')
  .option('--allow-same-version', 'run "npm version" with --allow-same-version')
  .option('--sign-git-tag', 'run "npm version" with --sign-git-tag')
  .option('--no-commit-hooks', 'run "npm version" with --commit-hooks')
  .option('--no-git-tag-version', 'run "npm version" with --no-git-tag-version')
  .parse(process.argv);

const options = program.opts();

log(`Running ${green(`${ourPackageJSON.name}@${ourPackageJSON.version}`)}`);

let branch, long, short;

if (options['travis']) {
  log(`Travis mode ${magenta('enabled')}`);

  if (process.env['TRAVIS_TAG']) {
    log(yellow('Environment variable TRAVIS_TAG is present, we will not generate a new version, exiting'));

    process.exit(0);
  }

  branch = process.env['TRAVIS_BRANCH'];
}

if (options['path']) {
  process.chdir(resolve(options['path']));
}

const cwd = process.cwd();

try {
  branch = branch || gitBranch(cwd);
  long = gitLong(cwd);
  short = gitShort(cwd);
} catch (err) {
  log(red('Failed to read from .git directory, is this a Git branch with at least one commit?'));
  process.exit(-1);
}

const packageJSONPath = resolve('.');

log(`Reading from ${magenta(packageJSONPath)}`);

const packageJSON: { version: string } | undefined = await onErrorResumeNext(() =>
  readPackage({ cwd: packageJSONPath })
);

if (!packageJSON) {
  log(red('Failed to read package.json, is it missing or malformed?'));
  process.exit(-1);
}

const { version } = packageJSON;
const preRelease = (options['template'] || DEFAULT_TEMPLATE).replace(/\w+/giu, (name: string) => {
  switch (name) {
    case 'branch':
      return branch;
    case 'short':
      return short;
    case 'long':
      return long;

    default:
      return name;
  }
});

const nextVersion = `${major(version)}.${minor(version)}.${patch(version)}-${preRelease}`;

log(`Bumping from ${green(version)} to ${green(nextVersion)}`);

const args = [
  'version',
  ...(options['allowSameVersion'] ? ['--allow-same-version'] : []),
  ...(options['commitHooks'] ? [] : ['--no-commit-hooks']),
  ...(options['force'] ? ['--force'] : []),
  ...(options['gitTagVersion'] ? [] : ['--no-git-tag-version']),
  ...(options['message'] ? ['--message', options['message']] : []),
  ...(options['signGitTag'] ? ['--sign-git-tag'] : []),
  nextVersion
];

log(`Running ${magenta(`npm ${args.join(' ')}`)}`);

const result = spawn.sync('npm', args, { cwd, stdio: 'inherit' });

process.exit(result.status);
