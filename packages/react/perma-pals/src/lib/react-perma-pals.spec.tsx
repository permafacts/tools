import { render } from '@testing-library/react';

import ReactPermaPals from './react-perma-pals';

describe('ReactPermaPals', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactPermaPals />);
    expect(baseElement).toBeTruthy();
  });
});
