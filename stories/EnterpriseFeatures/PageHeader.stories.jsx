import React from 'react';
import { PageHeader } from './PageHeader';

export default {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    category: 'enterprise-features',
  },
};

const Template = (args) => <PageHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'PageHeader Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'PageHeader Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'PageHeader Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small PageHeader',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large PageHeader',
  size: 'lg',
};
