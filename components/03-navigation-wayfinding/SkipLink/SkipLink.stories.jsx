import React from 'react';
import { SkipLink } from './SkipLink';

export default {
  title: 'Components/SkipLink',
  component: SkipLink,
  parameters: {
    category: '03-navigation-wayfinding',
  },
};

const Template = (args) => <SkipLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'SkipLink Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'SkipLink Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'SkipLink Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small SkipLink',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large SkipLink',
  size: 'lg',
};
