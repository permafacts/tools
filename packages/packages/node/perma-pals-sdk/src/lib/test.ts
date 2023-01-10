import Arweave from 'arweave';
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 3000000,
});
async function main(arweave) {
  const q = {
    query: `{
transactions(
    first: 1, 
      tags: [
      ]) {
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
console.log(main(arweave));
