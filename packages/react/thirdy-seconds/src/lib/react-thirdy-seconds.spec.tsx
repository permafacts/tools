import { render } from '@testing-library/react';

import ReactThirdySeconds from './react-thirdy-seconds';

describe('ReactThirdySeconds', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactThirdySeconds />);
    expect(baseElement).toBeTruthy();
  });
});
