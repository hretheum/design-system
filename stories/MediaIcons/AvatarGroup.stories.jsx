import React from 'react';
import { AvatarGroup } from './AvatarGroup';

export default {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    category: 'media-icons',
  },
};

const Template = (args) => <AvatarGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'AvatarGroup Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'AvatarGroup Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'AvatarGroup Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small AvatarGroup',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large AvatarGroup',
  size: 'lg',
};
