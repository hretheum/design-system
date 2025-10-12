import React from 'react';
import { ButtonGroup } from './ButtonGroup';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    category: '01-actions-controls',
  },
};

const Template = (args) => <ButtonGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ButtonGroup Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ButtonGroup Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ButtonGroup Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ButtonGroup',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ButtonGroup',
  size: 'lg',
};
