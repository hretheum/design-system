import React from 'react';
import { ActionMenu } from './ActionMenu';

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  parameters: {
    category: '01-actions-controls',
  },
};

const Template = (args) => <ActionMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ActionMenu Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ActionMenu Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ActionMenu Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ActionMenu',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ActionMenu',
  size: 'lg',
};
