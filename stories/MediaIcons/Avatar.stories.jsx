import React from 'react';
import { Avatar } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    category: 'media-icons',
  },
};

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Avatar Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Avatar Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Avatar Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Avatar',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Avatar',
  size: 'lg',
};
