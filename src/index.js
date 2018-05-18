const { branch: gitBranch, short: gitShort } = require('git-rev-sync');
const { join, resolve } = require('path');
const { major, minor, patch } = require('semver');
const { green, magenta, red, yellow } = require('chalk');
const { default: onErrorResumeNext } = require('on-error-resume-next');
const program = require('commander');
const spawn = require('cross-spawn');

const { log } = console;
const ourPackageJSON = require(join(__dirname, '../package.json'));

program
  .version(ourPackageJSON.version)
  .description(ourPackageJSON.description)
  .option('-p, --path <path>', 'path to package.json, default to current directory', process.cwd())
  .option('-t, --travis', 'run in Travis CI: skip when TRAVIS_TAG present')
  .option('-f, --force', 'run "npm version" with --force')
  .option('-m, --message <message>', 'run "npm version" with --message')
  .option('--allow-same-version', 'run "npm version" with --allow-same-version')
  .option('--sign-git-tag', 'run "npm version" with --sign-git-tag')
  .option('--no-commit-hooks', 'run "npm version" with --commit-hooks')
  .option('--no-git-tag-version', 'run "npm version" with --no-git-tag-version')
  .parse(process.argv);

function main() {
  log(`Running ${ green(`${ ourPackageJSON.name }@${ ourPackageJSON.version }`) }`);

  let branch, short;

  if (program.travis) {
    log(`Travis mode ${ magenta('enabled') }`);

    if (process.env.TRAVIS_TAG) {
      return log(yellow('Environment variable TRAVIS_TAG is present, we will not generate a new version, exiting'));
    }

    branch = process.env.TRAVIS_BRANCH;
  }

  if (program.path) {
    process.chdir(resolve(program.path));
  }

  const cwd = process.cwd();

  try {
    branch = branch || gitBranch(cwd);
    short = gitShort(cwd);
  } catch (err) {
    log(red('Failed to read from .git directory, is this a Git branch with at least one commit?'));
    process.exit(-1);
  }

  const packageJSONPath = resolve('package.json');

  log(`Reading from ${ magenta(packageJSONPath) }`);

  const packageJSON = onErrorResumeNext(() => require(packageJSONPath));

  if (!packageJSON) {
    log(red('Failed to read package.json, is it missing or malformed?'));
    process.exit(-1);
  }

  const { version } = packageJSON;

  const nextVersion = `${ major(version) }.${ minor(version) }.${ patch(version) }-${ branch }.${ short }`;

  log(`Bumping from ${ green(version) } to ${ green(nextVersion) }`);

  const args = [
    'version',
    ...program.allowSameVersion ? ['--allow-same-version'] : [],
    ...program.commitHooks ? [] : ['--no-commit-hooks'],
    ...program.force ? ['--force'] : [],
    ...program.gitTagVersion ? [] : ['--no-git-tag-version'],
    ...program.message ? ['--message', program.message] : [],
    ...program.signGitTag ? ['--sign-git-tag'] : [],
    nextVersion
  ];

  log(`Running ${ magenta(`npm ${ args.join(' ') }`) }`);

  const result = spawn.sync('npm', args, { cwd, stdio: 'inherit' });

  process.exit(result);
}

main();
