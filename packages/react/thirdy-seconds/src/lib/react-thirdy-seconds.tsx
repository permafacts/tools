import styles from './react-thirdy-seconds.module.css';

/* eslint-disable-next-line */
export interface ReactThirdySecondsProps {}

export function ReactThirdySeconds(props: ReactThirdySecondsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactThirdySeconds!</h1>
    </div>
  );
}

export default ReactThirdySeconds;
