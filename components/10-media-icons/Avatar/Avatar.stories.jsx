import React from 'react';
import { Avatar } from './Avatar';

export default {
  title: 'Media & Icons/Avatar',
  component: Avatar,
  parameters: {
    category: '10-media-icons',
    docs: {
      description: {
        component: 'User representation component that displays profile image or initials'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    variant: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded']
    },
    status: {
      control: { type: 'select' },
      options: [undefined, 'online', 'offline', 'busy', 'away']
    }
  }
};

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
  size: 'md',
  variant: 'circle'
};

export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://via.placeholder.com/150',
  alt: 'User avatar',
  name: 'Jane Smith',
  size: 'md',
  variant: 'circle'
};

export const WithStatus = Template.bind({});
WithStatus.args = {
  name: 'Alice Johnson',
  size: 'md',
  variant: 'circle',
  status: 'online'
};

export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar size="xs" name="XS Size" />
    <Avatar size="sm" name="SM Size" />
    <Avatar size="md" name="MD Size" />
    <Avatar size="lg" name="LG Size" />
    <Avatar size="xl" name="XL Size" />
  </div>
);

export const Variants = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Avatar variant="circle" name="Circle" />
    <Avatar variant="square" name="Square" />
    <Avatar variant="rounded" name="Rounded" />
  </div>
);

export const StatusIndicators = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Avatar name="Online" status="online" />
    <Avatar name="Offline" status="offline" />
    <Avatar name="Busy" status="busy" />
    <Avatar name="Away" status="away" />
  </div>
);
