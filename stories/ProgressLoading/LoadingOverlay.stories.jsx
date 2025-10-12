import React from 'react';
import { LoadingOverlay } from './LoadingOverlay';

export default {
  title: 'Components/LoadingOverlay',
  component: LoadingOverlay,
  parameters: {
    category: 'progress-loading',
  },
};

const Template = (args) => <LoadingOverlay {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'LoadingOverlay Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'LoadingOverlay Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'LoadingOverlay Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small LoadingOverlay',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large LoadingOverlay',
  size: 'lg',
};
