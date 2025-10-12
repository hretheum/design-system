import React from 'react';
import { Grid } from './Grid';

export default {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    category: 'layout-structure',
  },
};

const Template = (args) => <Grid {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Grid Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Grid Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Grid Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Grid',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Grid',
  size: 'lg',
};
