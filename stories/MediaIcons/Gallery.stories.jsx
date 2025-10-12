import React from 'react';
import { Gallery } from './Gallery';

export default {
  title: 'Components/Gallery',
  component: Gallery,
  parameters: {
    category: 'media-icons',
  },
};

const Template = (args) => <Gallery {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Gallery Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Gallery Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Gallery Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Gallery',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Gallery',
  size: 'lg',
};
