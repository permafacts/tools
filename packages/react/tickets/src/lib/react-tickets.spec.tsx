import { render } from '@testing-library/react';

import ReactTickets from './react-tickets';

describe('ReactTickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactTickets />);
    expect(baseElement).toBeTruthy();
  });
});
