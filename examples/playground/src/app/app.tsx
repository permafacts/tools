// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactAlexRender } from '@permafacts-tools/react-alex-render';
import { ReactBarUi } from '@permafacts-tools/react-bar-ui';
// import { useEffect } from 'react';

export function App() {
  // useEffect(() => {}, []);

  return (
    <>
      <label htmlFor="my-modal-4" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label
          className="modal-box relative max-w-none w-11/12 h-full"
          htmlFor=""
        >
          <iframe
            src="https://permafacts.arweave.dev/#/renderer/alex-tweet/?data=GrHE3iASdZCWQdT-ySK9Nb4ABWmYZEiqTb9zCSzD1xI"
            title="test"
            width="100%"
            height="100%"
          />
        </label>
      </label>

      {/* <ReactAlexRender />
      <ReactBarUi addr="9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4" /> */}
    </>
  );
}

export default App;
