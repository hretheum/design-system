import React from 'react';
import { ProgressSteps } from './ProgressSteps';

export default {
  title: 'Components/ProgressSteps',
  component: ProgressSteps,
  parameters: {
    category: 'progress-loading',
  },
};

const Template = (args) => <ProgressSteps {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'ProgressSteps Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'ProgressSteps Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'ProgressSteps Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small ProgressSteps',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large ProgressSteps',
  size: 'lg',
};
