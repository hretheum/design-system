import React from 'react';
import { DateRangePicker } from './DateRangePicker';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <DateRangePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'DateRangePicker Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'DateRangePicker Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'DateRangePicker Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small DateRangePicker',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large DateRangePicker',
  size: 'lg',
};
