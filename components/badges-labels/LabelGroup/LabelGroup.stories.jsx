import React from 'react';
import { LabelGroup } from './LabelGroup';

export default {
  title: 'Components/LabelGroup',
  component: LabelGroup,
  parameters: {
    category: 'badges-labels',
  },
};

const Template = (args) => <LabelGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'LabelGroup Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'LabelGroup Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'LabelGroup Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small LabelGroup',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large LabelGroup',
  size: 'lg',
};
