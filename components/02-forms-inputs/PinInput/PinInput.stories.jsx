import React from 'react';
import { PinInput } from './PinInput';

export default {
  title: 'Components/PinInput',
  component: PinInput,
  parameters: {
    category: '02-forms-inputs',
  },
};

const Template = (args) => <PinInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'PinInput Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'PinInput Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'PinInput Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small PinInput',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large PinInput',
  size: 'lg',
};
