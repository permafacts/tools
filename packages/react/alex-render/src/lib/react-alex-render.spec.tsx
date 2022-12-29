import { render } from '@testing-library/react';

import ReactAlexRender from './react-alex-render';

describe('ReactAlexRender', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactAlexRender />);
    expect(baseElement).toBeTruthy();
  });
});
