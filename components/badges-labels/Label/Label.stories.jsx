import React from 'react';
import { Label } from './Label';

export default {
  title: 'Components/Label',
  component: Label,
  parameters: {
    category: 'badges-labels',
  },
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Label Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Label Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Label Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Label',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Label',
  size: 'lg',
};
