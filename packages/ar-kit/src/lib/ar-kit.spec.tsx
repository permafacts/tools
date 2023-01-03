import { render } from '@testing-library/react';

import ArKit from './ar-kit';

describe('ArKit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ArKit />);
    expect(baseElement).toBeTruthy();
  });
});
