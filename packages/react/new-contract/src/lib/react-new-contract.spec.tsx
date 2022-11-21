import { render } from '@testing-library/react';

import ReactNewContract from './react-new-contract';

describe('ReactNewContract', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactNewContract />);
    expect(baseElement).toBeTruthy();
  });
});
