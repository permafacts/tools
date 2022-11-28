import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactBarUi } from './react-bar-ui';

const Story: ComponentMeta<typeof ReactBarUi> = {
  component: ReactBarUi,
  title: 'ReactBarUi',
};
export default Story;

const Template: ComponentStory<typeof ReactBarUi> = (args) => (
  <ReactBarUi {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
