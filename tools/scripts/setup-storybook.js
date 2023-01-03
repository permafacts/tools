const execSync = require('child_process').execSync;

async function main() {
  if (!process.argv[2]) throw new Error('Missing package name!');
  const package = process.argv[2];
  console.log(`Adding storybook setup for ${package}`);
  const output = execSync(
    `rm -r ./packages/react/${package}/.storybook && cp -R .storybook/react-storybook-config/.storybook ./packages/react/${package}/`,
    { encoding: 'utf8' }
  ).toString();
  return output;
}

main().then(console.log).catch(console.log);
