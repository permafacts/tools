export function App() {
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
            src="https://arweave.net/lm7Nc3mtdDPc6geG3J4VnmumHNGh6jV1ciBqBxw-2yQ/?data=-6Ieh8PFvBIaK2qGz6ZaG_O9DhABT3yu0ly56UeFxMs"
            title="test"
            width="100%"
            height="100%"
          />
        </label>
      </label>
    </>
  );
}

export default App;
