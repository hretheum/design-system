import React from 'react';
import { BusyIndicator } from './BusyIndicator';

export default {
  title: 'Components/BusyIndicator',
  component: BusyIndicator,
  parameters: {
    category: 'progress-loading',
  },
};

const Template = (args) => <BusyIndicator {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'BusyIndicator Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'BusyIndicator Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'BusyIndicator Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small BusyIndicator',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large BusyIndicator',
  size: 'lg',
};
