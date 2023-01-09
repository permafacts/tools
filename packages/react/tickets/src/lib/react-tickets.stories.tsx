import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactTickets } from './react-tickets';

const Story: ComponentMeta<typeof ReactTickets> = {
  component: ReactTickets,
  title: 'ReactTickets',
};
export default Story;

const Template: ComponentStory<typeof ReactTickets> = (args) => (
  <ReactTickets {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
