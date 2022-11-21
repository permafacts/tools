import styles from './react-new-contract.module.css';

/* eslint-disable-next-line */
export interface ReactNewContractProps {}

export function ReactNewContract(props: ReactNewContractProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactNewContract!</h1>
    </div>
  );
}

export default ReactNewContract;
