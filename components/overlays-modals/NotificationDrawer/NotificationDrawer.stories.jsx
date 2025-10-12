import React from 'react';
import { NotificationDrawer } from './NotificationDrawer';

export default {
  title: 'Components/NotificationDrawer',
  component: NotificationDrawer,
  parameters: {
    category: 'overlays-modals',
  },
};

const Template = (args) => <NotificationDrawer {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'NotificationDrawer Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'NotificationDrawer Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'NotificationDrawer Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small NotificationDrawer',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large NotificationDrawer',
  size: 'lg',
};
