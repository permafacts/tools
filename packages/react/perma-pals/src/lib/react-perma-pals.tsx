import styles from './react-perma-pals.module.css';

/* eslint-disable-next-line */
export interface ReactPermaPalsProps {}

export function ReactPermaPals(props: ReactPermaPalsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactPermaPals!</h1>
    </div>
  );
}

export default ReactPermaPals;
