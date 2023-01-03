const execSync = require('child_process').execSync;

function main() {
  if (!process.argv[2]) throw new Error('Missing package name!');
  const package = process.argv[2];
  return execSync(
    `rm -r ./packages/react/${package}/.storybook && cp -R .storybook/react-storybook-config/.storybook ./packages/react/${package}/`,
    { encoding: 'utf8' }
  ).toString();
}
