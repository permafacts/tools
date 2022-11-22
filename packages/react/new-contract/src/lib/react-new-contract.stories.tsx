import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactNewContract } from './react-new-contract';

const Story: ComponentMeta<typeof ReactNewContract> = {
  component: ReactNewContract,
  title: 'ReactNewContract',
};
export default Story;

const Template: ComponentStory<typeof ReactNewContract> = (args) => (
  <ReactNewContract {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
