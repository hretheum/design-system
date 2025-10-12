import React from 'react';
import { Gauges } from './Gauges';

export default {
  title: 'Components/Gauges',
  component: Gauges,
  parameters: {
    category: 'data-visualization',
  },
};

const Template = (args) => <Gauges {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Gauges Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Gauges Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Gauges Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Gauges',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Gauges',
  size: 'lg',
};
