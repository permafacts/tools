import { render } from '@testing-library/react';

import ReactConnectWallet from './react-connect-wallet';

describe('ReactConnectWallet', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactConnectWallet />);
    expect(baseElement).toBeTruthy();
  });
});
