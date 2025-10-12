import React from 'react';
import { Panel } from './Panel';

export default {
  title: 'Components/Panel',
  component: Panel,
  parameters: {
    category: 'layout-structure',
  },
};

const Template = (args) => <Panel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Panel Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'Panel Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Panel Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Panel',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Panel',
  size: 'lg',
};
