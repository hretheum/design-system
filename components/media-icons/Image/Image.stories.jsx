import React from 'react';
import { Image } from './Image';

export default {
  title: 'Components/Image',
  component: Image,
  parameters: {
    category: 'media-icons',
  },
};

const Template = (args) => <Image {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Image Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Image Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Image Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Image',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Image',
  size: 'lg',
};
