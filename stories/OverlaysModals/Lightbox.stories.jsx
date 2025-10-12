import React from 'react';
import { Lightbox } from './Lightbox';

export default {
  title: 'Components/Lightbox',
  component: Lightbox,
  parameters: {
    category: 'overlays-modals',
  },
};

const Template = (args) => <Lightbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Lightbox Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Lightbox Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Lightbox Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Lightbox',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Lightbox',
  size: 'lg',
};
