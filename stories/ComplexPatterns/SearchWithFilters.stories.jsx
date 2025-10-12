import React from 'react';
import { SearchWithFilters } from './SearchWithFilters';

export default {
  title: 'Components/SearchWithFilters',
  component: SearchWithFilters,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <SearchWithFilters {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'SearchWithFilters Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'SearchWithFilters Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'SearchWithFilters Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small SearchWithFilters',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large SearchWithFilters',
  size: 'lg',
};
