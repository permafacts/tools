import styles from './ar-kit.module.css';

/* eslint-disable-next-line */
export interface ArKitProps {}

export function ArKit(props: ArKitProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ArKit!</h1>
    </div>
  );
}

export default ArKit;
