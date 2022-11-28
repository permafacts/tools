import { BigNumber } from 'bignumber.js';
import Arweave from 'arweave';
import Transaction from 'arweave/node/lib/transaction';

// TODO: MOVE THESE TO environment.ts
// const GATEWAY = 'https://arweave.net';
const REDSTONE_GATEWAY = 'https://gateway.redstone.finance';
// const TRADE_SOURCE_ID = 'BzNLxND_nJEMfcLWShyhU4i9BnzEWaATo6FYFsfsO0Q';
// const CACHE = 'https://cache.permapages.app';
const BAR_CACHE = 'https://bar-cache.onrender.com';
// const WARP_URL =
//   'https://d1o5nlqr4okus2.cloudfront.net/gateway/contracts/deploy';
// const STAMP_CONTRACT = 'aSMILD7cEJr93i7TAVzzMjtci_sGkXcWnqpDkG6UGcA';
export const BAR = 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA';

export const atomicToBar = (atomic: any) =>
  BigNumber.clone({ DECIMAL_PLACES: 6 })(atomic).shiftedBy(-6).toFixed(6);

export const getBARBalance = async (addr: string, barContractId: string) => {
  return (
    fetch(`${BAR_CACHE}/${barContractId}`)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(new Error('could not get bar balance'))
      )
      //return warp.contract(BAR).readState().then(res => res.state)
      .then((state) => (state.balances[addr] ? state.balances[addr] : 0))
      .then(atomicToBar)
      .then((x) => Number(x).toFixed(4))
  );
};

export async function allow(
  amount: number,
  target: string,
  arweave: Arweave,
  barContractId: string
) {
  const tx = await arweave.createTransaction({
    data: Math.random().toString().slice(-4),
    // reward: "72600854",
    // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
  });
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', barContractId);
  tx.addTag(
    'Input',
    JSON.stringify({
      function: 'allow',
      target,
      qty: amount,
    })
  );
  tx.addTag('SDK', 'Warp');

  await arweave.transactions.sign(tx);

  return await writeInteraction(tx)
    .then((_) => tx.id)
    .then((x) => (console.log('allowTx: ', x), x));
}

function writeInteraction(tx: Transaction) {
  return fetch(`${REDSTONE_GATEWAY}/gateway/sequencer/register`, {
    method: 'POST',
    body: JSON.stringify(tx),
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

// const REDSTONE_GATEWAY = 'https://gateway.redstone.finance'

export const readState = (contract: string) => {
  const CACHE = 'https://cache.permapages.app';
  return fetch(`${CACHE}/${contract}`).then((res) => res.json());
};

export const getContent = (contract: string) => {
  return fetch(
    `https://d1o5nlqr4okus2.cloudfront.net/gateway/contract-data/${contract}`
  );
};

export async function claim(
  claimable: any,
  arweave: Arweave,
  barContractId: string,
  callback?: any
) {
  const client = getArweave();
  const claim = claimable[0];
  if (claim) {
    const tx = await client.createTransaction(
      {
        data: Math.random().toString().slice(-4),
        // reward: "72600854",
        // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
      },
      'use_wallet'
    );
    tx.addTag('App-Name', 'SmartWeaveAction');
    tx.addTag('App-Version', '0.3.0');
    tx.addTag('Contract', barContractId);
    const input = {
      function: 'claim',
      txID: claim.txID,
      qty: claim.qty,
    };
    console.log('INPUT', input);
    tx.addTag('Input', JSON.stringify(input));
    tx.addTag('SDK', 'Warp');

    await client.transactions.sign(tx);

    await writeInteraction(tx)
      .then((_) => tx.id)
      .then(async (x) => (console.log('claim: ', x), x));
    callback(await readState(barContractId));
  } else {
    alert('You have nothing to claim.');
  }
}
export async function mint(
  reward: number,
  barContractId: string,
  callback?: any
) {
  const client = getArweave();
  const tx = await client.createTransaction({
    data: Math.random().toString().slice(-4),
    reward: client.ar.arToWinston(reward.toString()),
    // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
  });
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', barContractId);
  tx.addTag(
    'Input',
    JSON.stringify({
      function: 'mint',
    })
  );
  tx.addTag('SDK', 'Warp');

  await client.transactions.sign(tx);

  return await writeInteraction(tx)
    .then((_) => tx.id)
    .then(
      async (x) => (
        callback
          ? callback(await readState(barContractId))
          : console.log('mint: ', x),
        x
      )
    );
}

export async function transfer(
  amount: number,
  target: string,
  barContractId: string,
  callback?: any
) {
  const client = getArweave();
  const tx = await client.createTransaction(
    {
      data: Math.random().toString().slice(-4),
      // reward: "72600854",
      // last_tx: "p7vc1iSP6bvH_fCeUFa9LqoV5qiyW-jdEKouAT0XMoSwrNraB9mgpi29Q10waEpO",
    },
    'use_wallet'
  );
  tx.addTag('App-Name', 'SmartWeaveAction');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract', barContractId);
  const input = JSON.stringify({
    function: 'transfer',
    target: target.trim(),
    qty: amount * 1000000,
  });
  console.log('INPUT', input);
  tx.addTag('Input', input);
  tx.addTag('SDK', 'Warp');

  await client.transactions.sign(tx);

  return await writeInteraction(tx)
    .then((_) => tx.id)
    .then(
      async (x) => (
        callback
          ? callback(await readState(barContractId))
          : console.log('transferTx: ', x),
        x
      )
    )
    .catch(console.log);
}

export type PermissionType =
  | 'ACCESS_ADDRESS'
  | 'ACCESS_PUBLIC_KEY'
  | 'ACCESS_ALL_ADDRESSES'
  | 'SIGN_TRANSACTION'
  | 'ENCRYPT'
  | 'DECRYPT'
  | 'SIGNATURE'
  | 'ACCESS_ARWEAVE_CONFIG';
async function connect(name?: string, callback?: any) {
  try {
    const arweaveWallet =
      window.arweaveWallet || window.parent.window.arweaveWallet;
    const addr = arweaveWallet?.getActiveAddress();
    console.log('WALLET', arweaveWallet);
    if (!addr) {
      const permissions = [
        'ACCESS_ADDRESS',
        'ACCESS_ARWEAVE_CONFIG',
        'DISPATCH',
      ] as unknown as PermissionType[];
      await arweaveWallet.connect(permissions, {
        name: name || 'unnamed',
      });
    }
  } catch (e) {
    if (callback) {
      callback();
    } else {
      console.log('Install ArConnect', e);
    }
  }
}

function getArweave(): Arweave {
  const Arweave =
    (window as any).Arweave || (window.parent.window as any).Arweave;
  return Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
  });
}
// claim
// allow
// transfer
// mint
