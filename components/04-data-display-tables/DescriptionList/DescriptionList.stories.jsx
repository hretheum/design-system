import React from 'react';
import { DescriptionList } from './DescriptionList';

export default {
  title: 'Components/DescriptionList',
  component: DescriptionList,
  parameters: {
    category: '04-data-display-tables',
  },
};

const Template = (args) => <DescriptionList {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'DescriptionList Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'DescriptionList Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'DescriptionList Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small DescriptionList',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large DescriptionList',
  size: 'lg',
};
