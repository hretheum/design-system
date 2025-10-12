import React from 'react';
import { NumberInput } from './NumberInput';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    category: '02-forms-inputs',
  },
};

const Template = (args) => <NumberInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'NumberInput Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'NumberInput Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'NumberInput Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small NumberInput',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large NumberInput',
  size: 'lg',
};
