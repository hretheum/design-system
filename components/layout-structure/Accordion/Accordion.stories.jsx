import React from 'react';
import { Accordion } from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    category: 'layout-structure',
  },
};

const Template = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Accordion Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Accordion Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Accordion Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Accordion',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Accordion',
  size: 'lg',
};
