import React from 'react';
import { ProgressCircle } from './ProgressCircle';

export default {
  title: 'Components/ProgressCircle',
  component: ProgressCircle,
  parameters: {
    category: 'progress-loading',
  },
};

const Template = (args) => <ProgressCircle {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ProgressCircle Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ProgressCircle Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ProgressCircle Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ProgressCircle',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ProgressCircle',
  size: 'lg',
};
