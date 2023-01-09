import styles from './react-tickets.module.css';

/* eslint-disable-next-line */
export interface ReactTicketsProps {}

export function ReactTickets(props: ReactTicketsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactTickets!</h1>
    </div>
  );
}

export default ReactTickets;
