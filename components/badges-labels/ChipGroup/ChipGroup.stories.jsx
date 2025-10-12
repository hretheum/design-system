import React from 'react';
import { ChipGroup } from './ChipGroup';

export default {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  parameters: {
    category: 'badges-labels',
  },
};

const Template = (args) => <ChipGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ChipGroup Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ChipGroup Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ChipGroup Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ChipGroup',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ChipGroup',
  size: 'lg',
};
