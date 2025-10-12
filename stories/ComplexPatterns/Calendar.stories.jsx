import React from 'react';
import { Calendar } from './Calendar';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Calendar Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Calendar Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Calendar Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Calendar',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Calendar',
  size: 'lg',
};
