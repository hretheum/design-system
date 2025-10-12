import React from 'react';
import { DashboardWidget } from './DashboardWidget';

export default {
  title: 'Components/DashboardWidget',
  component: DashboardWidget,
  parameters: {
    category: 'enterprise-features',
  },
};

const Template = (args) => <DashboardWidget {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'DashboardWidget Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'DashboardWidget Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'DashboardWidget Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small DashboardWidget',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large DashboardWidget',
  size: 'lg',
};
