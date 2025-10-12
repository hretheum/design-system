import React from 'react';
import { FileUpload } from './FileUpload';

export default {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    category: '02-forms-inputs',
  },
};

const Template = (args) => <FileUpload {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'FileUpload Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'FileUpload Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'FileUpload Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small FileUpload',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large FileUpload',
  size: 'lg',
};
