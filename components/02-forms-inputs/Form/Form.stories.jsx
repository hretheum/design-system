import React from 'react';
import { Form } from './Form';

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    category: '02-forms-inputs',
  },
};

const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Form Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Form Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Form Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Form',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Form',
  size: 'lg',
};
