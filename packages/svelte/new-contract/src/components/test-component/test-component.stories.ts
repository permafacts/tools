import { action } from '@storybook/addon-actions';
import TestComponent from './TestComponent.svelte';

export default {
  title: 'TestComponent',
  component: TestComponent,
};

export const Text = () => ({
  Component: TestComponent,
  props: { }
});
