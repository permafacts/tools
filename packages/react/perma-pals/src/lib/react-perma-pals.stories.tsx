import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactPermaPals } from './react-perma-pals';

const Story: ComponentMeta<typeof ReactPermaPals> = {
  component: ReactPermaPals,
  title: 'ReactPermaPals',
};
export default Story;

const Template: ComponentStory<typeof ReactPermaPals> = (args) => (
  <ReactPermaPals {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
