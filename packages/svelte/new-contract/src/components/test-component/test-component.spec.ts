import TestComponent from './TestComponent.svelte'
import { render } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText } = render(TestComponent)

  expect(getByText('Hello component!'));
})
