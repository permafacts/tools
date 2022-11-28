const execSync = require('child_process').execSync;
const packageJson = require('../../package.json');
const writeFileSync = require('fs').writeFileSync;

/**
 * @function permaDeploy
 *
 * If process.env.ENVIRONMENT is set to 'local' this will deploy files to arlocal
 * You need to specify a path to your wallet by setting process.env.PATH_TO_WALLET to <path/to/wallet> in order for this to work
 * https://www.youtube.com/watch?v=rbzUYdPocH0 (deep dive, deploying to local arweave using arlocal and arkb)
 * arkb deploy <./directory> -w <path/to/wallet.json> -g http://localhost:1984
 */
function permaDeploy(path) {
  try {
    const variables = setupVariables(path);
    const output = deployFiles(variables);
    const manifestId = getManifestId(output);
    buildOutputFile(manifestId);
  } catch (error) {
    console.log('There was an error uploading your files.', error);
    process.exit(1);
  }
}

function getManifestId(output) {
  const arweaveAddressLength = 43;
  const noWhitespace = output.replace(/\s/g, '');
  const manifestId = noWhitespace.substring(
    noWhitespace.length - arweaveAddressLength
  );
  return manifestId;
}

function setupVariables(path) {
  // Setup Variables
  const app = process.argv[2];
  const folder = `./dist/${path || 'apps'}/${app}`;
  const environment = process.env.ENVIRONMENT;
  const wallet = process.env.PATH_TO_WALLET;
  const gateway =
    environment === 'local'
      ? ' --gateway http://localhost:1984'
      : environment === 'testnet'
      ? ' --gateway https://www.arweave.run'
      : '';
  const version = packageJson.version;
  // log variables
  console.log(`CONFIGURATION:`);
  console.log('=========================');
  console.log(`App: ${app}`);
  console.log(`Folder: ${folder}`);
  console.log(`Environment: ${environment}`);
  console.log(`Wallet: ${wallet}`);
  console.log(`Gateway: ${gateway}`);
  console.log(`Version: ${version}`);
  console.log('=========================');
  return {
    app,
    folder,
    environment,
    wallet,
    gateway,
    version,
  };
}
// first: IBuurMJ9_DB61wmEomuRnrX8Qq5-jjjUzwTYWruI-bo
function deployFiles(props) {
  // TODO: add tags [version]
  const output = execSync(
    `arkb deploy ${props.folder} --wallet ${props.wallet} --auto-confirm --no-colors --force${props.gateway}`,
    { encoding: 'utf8' }
  ).toString();
  console.log('OUTPUT', output);
  return output;
}

function buildOutputFile(manifestId) {
  if (!manifestId) throw new Error('A manifestId is not here.');
  console.log(`ManifestId: ${manifestId}`, `Length: ${manifestId.length}`);
  writeFileSync('./manifest-output.json', JSON.stringify({ manifestId }));
}

permaDeploy(process.argv[3]);
