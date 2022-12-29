import styles from './react-alex-render.module.css';
import { useEffect, useState } from 'react';
import Arweave from 'arweave';

/* eslint-disable-next-line */
export interface ReactAlexRenderProps {
  testTxId?: string;
}

export function ReactAlexRender(props: ReactAlexRenderProps) {
  const [data, setdata] = useState<any>(undefined);
  useEffect(() => {
    const id = props.testTxId || getQueryVariable('data');
    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
    });
    if (!id) {
      return;
    }
    fetchTransaction(arweave, id || '')
      .then(setdata)
      .catch(console.log);
  }, [props.testTxId]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactAlexRender!</h1>
      {JSON.stringify(data)}
    </div>
  );
}

export default ReactAlexRender;

function getQueryVariable(variable: string) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

async function fetchTransaction(arweave: Arweave, id: string): Promise<any> {
  const q = {
    query: `{
      transactions(
          first: 100, 
          ids: ["${id}"]
            ) {
          edges {
              node {
                  id
                    owner {
                      address
                    }
                    tags {
                      name
                        value
                    }
            }}
        }
    }`,
  };
  const res = await arweave.api.post('/graphql', q);
  return Object.values(
    Object.values(res.data.data.transactions.edges).map((o: any) => o.node)
  );
}
