import { useEffect, useState } from 'react';
import {
  readState,
  BAR,
  claim,
  mint,
  transfer,
} from './contract-kit/contract-kit';
import Account from 'arweave-account';
import Arweave from 'arweave';
export { ArAccount } from 'arweave-account';

export interface ReactBarUiProps {
  addr?: string;
  stateFn?(state: any): any;
}

export function ReactBarUi(props: ReactBarUiProps) {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 60000,
  });
  const { addr, stateFn } = props;
  const [acct, setacct] = useState<any>(null);
  const [state, setstate] = useState<any>({});
  const [claims, setclaims] = useState<any>([]);
  const [claimable, setclaimable] = useState<any>([]);
  const [connectedclaimable, setconnectedclaimable] = useState<any>([]);
  const [balances, setbalances] = useState<any>({});
  const [minttoggle, setminttoggle] = useState(false);
  const [mintamount, setmintamount] = useState(0);
  const [transfertoggle, settransfertoggle] = useState(false);
  const [transferamount, settransferamount] = useState(0);
  const [transferto, settransferto] = useState('');
  useEffect(() => {
    console.log('love you dameon');
    const account = new Account({
      cacheIsActivated: true,
      cacheSize: 100,
      cacheTime: 3600000,
    });
    if (addr) {
      account
        .get(addr)
        .then((a) => setacct(a))
        .catch(console.log);
      readState(BAR).then((s) => {
        setAllState(
          s,
          addr,
          setbalances,
          setstate,
          setclaims,
          setclaimable,
          setconnectedclaimable,
          stateFn
        );
        if (stateFn) {
          stateFn(s);
        }
      });
    }
  }, [addr, stateFn]);

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img
                src={
                  'https://arweave.net/_32hAgwNt4ZVPisYAP3UQNUbwi_6LPUuZldPFCLm0fo'
                }
              />
            </div>
          </div>
        </div>
        <div className="stat-title">Burn AR</div>
        <div className="stat-value text-primary">1:1</div>
        {!minttoggle && (
          <div className="stat-actions">
            <button
              onClick={() => setminttoggle(!minttoggle)}
              className="btn btn-sm btn-success"
            >
              mint
            </button>
          </div>
        )}

        {minttoggle && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter amount</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="0.01"
                  className="input input-bordered"
                  onChange={(e) => setmintamount(e.target.valueAsNumber)}
                />
                <span>$AR</span>
              </label>
            </div>
            <div className="stat-actions">
              <button
                onClick={() => {
                  setminttoggle(!minttoggle);
                  mint(mintamount, BAR, (state: any) =>
                    setAllState(
                      state,
                      addr || '',
                      setbalances,
                      setstate,
                      setclaims,
                      setclaimable,
                      setconnectedclaimable,
                      stateFn
                    )
                  );
                }}
                className={
                  mintamount > 0
                    ? 'btn btn-sm btn-success'
                    : 'btn btn-sm btn-success btn-disabled'
                }
              >
                mint
              </button>
              <button
                onClick={() => {
                  setminttoggle(!minttoggle);
                }}
                className="ml-2 btn btn-sm btn-warning"
              >
                close
              </button>
            </div>
          </>
        )}
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src={acct?.profile?.avatarURL} />
            </div>
          </div>
        </div>
        <div className="stat-title">Balance</div>
        <div className="stat-value text-primary">
          {addr && balances[addr] && (balances[addr] / 1000000).toFixed(2)}
        </div>
        {!transfertoggle && (
          <div className="stat-actions">
            <button
              onClick={() => settransfertoggle(true)}
              className="btn btn-sm btn-success"
            >
              transfer
            </button>
          </div>
        )}

        {transfertoggle && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter Address</span>
              </label>
              <label className="input-group">
                <span>Address</span>
                <input
                  type="text"
                  placeholder="atkI1E32mchuz_nl9kgcDntECH0BOuHJ1FBgCvlcH5E"
                  className="input input-bordered"
                  onChange={(e) => settransferto(e.target.value)}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter amount</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="0.01"
                  className="input input-bordered"
                  onChange={(e) => settransferamount(e.target.valueAsNumber)}
                />
                <span>$bAR</span>
              </label>
            </div>
            <div className="stat-actions">
              <button
                onClick={() => {
                  settransfertoggle(!transfertoggle);
                  transfer(transferamount, transferto, BAR, (state: any) =>
                    setAllState(
                      state,
                      addr || '',
                      setbalances,
                      setstate,
                      setclaims,
                      setclaimable,
                      setconnectedclaimable,
                      stateFn
                    )
                  );
                  setmintamount(0);
                }}
                className={
                  transferamount > 0
                    ? 'btn btn-sm btn-success'
                    : 'btn btn-sm btn-success btn-disabled'
                }
              >
                transfer
              </button>
              <button
                onClick={() => {
                  settransfertoggle(!transfertoggle);
                }}
                className="ml-2 btn btn-sm btn-warning"
              >
                close
              </button>
            </div>
          </>
        )}
      </div>

      <div className="stat">
        <div className="stat-value">{connectedclaimable?.length}</div>
        <div className="stat-title">Claimable</div>
        <div className="stat-desc text-secondary">
          {connectedclaimable.length > 0 &&
            connectedclaimable
              ?.map((c: any) => c.qty)
              .reduce((a: any, b: any) => a + b) / 1000000}{' '}
          $bAR
        </div>
        <div className="stat-actions">
          <button
            onClick={() =>
              claim(connectedclaimable, arweave, BAR, (state: any) =>
                setAllState(
                  state,
                  addr || '',
                  setbalances,
                  setstate,
                  setclaims,
                  setclaimable,
                  setconnectedclaimable,
                  stateFn
                )
              )
            }
            className="btn btn-sm btn-success"
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReactBarUi;

function setAllState(
  state: any,
  addr: string,
  setbalances: any,
  setstate: any,
  setclaims: any,
  setclaimable: any,
  setconnectedclaimable: any,
  stateFn?: any
) {
  setconnectedclaimable(state.claimable.filter((c: any) => c.to === addr));
  setstate(state);
  setclaims(state.claims);
  setclaimable(state.claimable);
  setbalances(state.balances);
  if (stateFn) {
    stateFn(state);
  }
}
