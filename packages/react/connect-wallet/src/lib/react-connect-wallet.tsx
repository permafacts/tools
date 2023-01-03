import styles from './react-connect-wallet.module.css';

/* eslint-disable-next-line */
export interface ReactConnectWalletProps {}

export function ReactConnectWallet(props: ReactConnectWalletProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactConnectWallet!</h1>
    </div>
  );
}

export default ReactConnectWallet;
