import React from 'react';
import { Graphs } from './Graphs';

export default {
  title: 'Components/Graphs',
  component: Graphs,
  parameters: {
    category: 'data-visualization',
  },
};

const Template = (args) => <Graphs {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Graphs Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Graphs Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Graphs Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Graphs',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Graphs',
  size: 'lg',
};
