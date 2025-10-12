import React from 'react';
import { Metrics } from './Metrics';

export default {
  title: 'Components/Metrics',
  component: Metrics,
  parameters: {
    category: 'data-visualization',
  },
};

const Template = (args) => <Metrics {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Metrics Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Metrics Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Metrics Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Metrics',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Metrics',
  size: 'lg',
};
