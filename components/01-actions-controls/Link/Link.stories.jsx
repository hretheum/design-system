import React from 'react';
import { Link } from './Link';

export default {
  title: 'Components/Link',
  component: Link,
  parameters: {
    category: '01-actions-controls',
  },
};

const Template = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Link Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Link Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Link Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Link',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Link',
  size: 'lg',
};
