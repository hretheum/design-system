import React from 'react';
import { CodeEditor } from './CodeEditor';

export default {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: {
    category: 'complex-patterns',
  },
};

const Template = (args) => <CodeEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'CodeEditor Content',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'CodeEditor Primary',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'CodeEditor Secondary',
  variant: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small CodeEditor',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large CodeEditor',
  size: 'lg',
};
