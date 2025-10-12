import React from 'react';
import { TimePicker } from './TimePicker';

export default {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <TimePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'TimePicker Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'TimePicker Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'TimePicker Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small TimePicker',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large TimePicker',
  size: 'lg',
};
