import React from 'react';
import { Charts } from './Charts';

export default {
  title: 'Components/Charts',
  component: Charts,
  parameters: {
    category: 'data-visualization',
  },
};

const Template = (args) => <Charts {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Charts Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Charts Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Charts Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Charts',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Charts',
  size: 'lg',
};
