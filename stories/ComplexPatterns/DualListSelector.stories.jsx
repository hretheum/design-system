import React from 'react';
import { DualListSelector } from './DualListSelector';

export default {
  title: 'Components/DualListSelector',
  component: DualListSelector,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <DualListSelector {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'DualListSelector Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'DualListSelector Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'DualListSelector Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small DualListSelector',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large DualListSelector',
  size: 'lg',
};
