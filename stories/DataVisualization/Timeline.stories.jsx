import React from 'react';
import { Timeline } from './Timeline';

export default {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    category: 'data-visualization',
  },
};

const Template = (args) => <Timeline {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Timeline Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Timeline Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Timeline Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Timeline',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Timeline',
  size: 'lg',
};
