import React from 'react';
import { ScrollLock } from './ScrollLock';

export default {
  title: 'Components/ScrollLock',
  component: ScrollLock,
  parameters: {
    category: '11-utilities-helpers',
  },
};

const Template = (args) => <ScrollLock {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ScrollLock Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ScrollLock Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ScrollLock Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ScrollLock',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ScrollLock',
  size: 'lg',
};
