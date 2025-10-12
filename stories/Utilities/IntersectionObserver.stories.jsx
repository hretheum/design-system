import React from 'react';
import { IntersectionObserver } from './IntersectionObserver';

export default {
  title: 'Components/IntersectionObserver',
  component: IntersectionObserver,
  parameters: {
    category: '11-utilities-helpers',
  },
};

const Template = (args) => <IntersectionObserver {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'IntersectionObserver Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'IntersectionObserver Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'IntersectionObserver Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small IntersectionObserver',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large IntersectionObserver',
  size: 'lg',
};
