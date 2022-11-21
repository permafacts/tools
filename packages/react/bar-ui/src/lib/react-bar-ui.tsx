import styles from './react-bar-ui.module.css';

/* eslint-disable-next-line */
export interface ReactBarUiProps {}

export function ReactBarUi(props: ReactBarUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactBarUi!</h1>
    </div>
  );
}

export default ReactBarUi;
