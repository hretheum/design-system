import React from 'react';
import { HelpPanel } from './HelpPanel';

export default {
  title: 'Components/HelpPanel',
  component: HelpPanel,
  parameters: {
    category: 'enterprise-features',
  },
};

const Template = (args) => <HelpPanel {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'HelpPanel Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'HelpPanel Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'HelpPanel Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small HelpPanel',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large HelpPanel',
  size: 'lg',
};
