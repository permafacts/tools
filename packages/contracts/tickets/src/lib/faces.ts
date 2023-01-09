export interface State {
  creator: string;
  price: number;
  balances: {
    [address: string]: number;
  };
  eventName: string;
  supply: number;
}
