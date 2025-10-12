import React from 'react';
import { SearchInput } from './SearchInput';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    category: '02-forms-inputs',
  },
};

const Template = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'SearchInput Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'SearchInput Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'SearchInput Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small SearchInput',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large SearchInput',
  size: 'lg',
};
