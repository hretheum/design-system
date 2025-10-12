import React from 'react';
import { ResizeObserver } from './ResizeObserver';

export default {
  title: 'Components/ResizeObserver',
  component: ResizeObserver,
  parameters: {
    category: '11-utilities-helpers',
  },
};

const Template = (args) => <ResizeObserver {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ResizeObserver Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ResizeObserver Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ResizeObserver Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ResizeObserver',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ResizeObserver',
  size: 'lg',
};
