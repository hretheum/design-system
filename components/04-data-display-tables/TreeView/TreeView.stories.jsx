import React from 'react';
import { TreeView } from './TreeView';

export default {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    category: '04-data-display-tables',
  },
};

const Template = (args) => <TreeView {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'TreeView Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'TreeView Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'TreeView Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small TreeView',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large TreeView',
  size: 'lg',
};
