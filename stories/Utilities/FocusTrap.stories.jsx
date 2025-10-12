import React from 'react';
import { FocusTrap } from './FocusTrap';

export default {
  title: 'Components/FocusTrap',
  component: FocusTrap,
  parameters: {
    category: '11-utilities-helpers',
  },
};

const Template = (args) => <FocusTrap {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'FocusTrap Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'FocusTrap Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'FocusTrap Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small FocusTrap',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large FocusTrap',
  size: 'lg',
};
