import React from 'react';
import { SplitButton } from './SplitButton';

export default {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    category: '01-actions-controls',
  },
};

const Template = (args) => <SplitButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'SplitButton Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'SplitButton Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'SplitButton Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small SplitButton',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large SplitButton',
  size: 'lg',
};
