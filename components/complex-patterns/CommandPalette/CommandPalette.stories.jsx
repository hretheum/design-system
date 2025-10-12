import React from 'react';
import { CommandPalette } from './CommandPalette';

export default {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <CommandPalette {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'CommandPalette Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'CommandPalette Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'CommandPalette Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small CommandPalette',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large CommandPalette',
  size: 'lg',
};
