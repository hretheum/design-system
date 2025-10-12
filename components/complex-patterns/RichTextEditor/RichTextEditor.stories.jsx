import React from 'react';
import { RichTextEditor } from './RichTextEditor';

export default {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <RichTextEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'RichTextEditor Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'RichTextEditor Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'RichTextEditor Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small RichTextEditor',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large RichTextEditor',
  size: 'lg',
};
