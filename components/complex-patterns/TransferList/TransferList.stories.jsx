import React from 'react';
import { TransferList } from './TransferList';

export default {
  title: 'Components/TransferList',
  component: TransferList,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <TransferList {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'TransferList Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'TransferList Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'TransferList Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small TransferList',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large TransferList',
  size: 'lg',
};
