import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactAlexRender } from './react-alex-render';

const Story: ComponentMeta<typeof ReactAlexRender> = {
  component: ReactAlexRender,
  title: 'ReactAlexRender',
};
export default Story;

const Template: ComponentStory<typeof ReactAlexRender> = (args) => (
  <ReactAlexRender {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
