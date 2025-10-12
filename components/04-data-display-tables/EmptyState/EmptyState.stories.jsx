import React from 'react';
import { EmptyState } from './EmptyState';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    category: '04-data-display-tables',
  },
};

const Template = (args) => <EmptyState {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'EmptyState Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'EmptyState Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'EmptyState Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small EmptyState',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large EmptyState',
  size: 'lg',
};
