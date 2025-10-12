import React from 'react';
import { Slider } from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    category: '02-forms-inputs',
  },
};

const Template = (args) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Slider Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Slider Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Slider Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Slider',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Slider',
  size: 'lg',
};
