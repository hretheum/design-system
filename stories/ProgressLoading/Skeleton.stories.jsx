import React from 'react';
import { Skeleton } from './Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    category: 'progress-loading',
  },
};

const Template = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Skeleton Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Skeleton Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Skeleton Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Skeleton',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Skeleton',
  size: 'lg',
};
