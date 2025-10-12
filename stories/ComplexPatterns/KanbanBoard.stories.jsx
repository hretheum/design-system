import React from 'react';
import { KanbanBoard } from './KanbanBoard';

export default {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <KanbanBoard {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'KanbanBoard Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'KanbanBoard Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'KanbanBoard Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small KanbanBoard',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large KanbanBoard',
  size: 'lg',
};
