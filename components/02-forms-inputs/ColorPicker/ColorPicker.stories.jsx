import React from 'react';
import { ColorPicker } from './ColorPicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    category: '02-forms-inputs',
  },
};

const Template = (args) => <ColorPicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ColorPicker Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ColorPicker Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ColorPicker Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ColorPicker',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ColorPicker',
  size: 'lg',
};
