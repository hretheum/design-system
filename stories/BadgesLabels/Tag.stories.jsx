import React from 'react';
import { Tag } from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    category: 'badges-labels',
  },
};

const Template = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Tag Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Tag Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Tag Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Tag',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Tag',
  size: 'lg',
};
