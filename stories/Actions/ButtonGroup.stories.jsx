import React, { useState } from 'react';
import { ButtonGroup } from '../../components/01-actions-controls/ButtonGroup/ButtonGroup';
import { Button } from '../../components/01-actions-controls/Button/Button';
import { action } from '@storybook/addon-actions';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Actions/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Group of related buttons with consistent styling and spacing.'
      }
    }
  }
};

export const Default = () => (
  <ButtonGroup>
    <Button onClick={action('first')}>First</Button>
    <Button onClick={action('second')}>Second</Button>
    <Button onClick={action('third')}>Third</Button>
  </ButtonGroup>
);

export const ToggleGroup = () => {
  const [selected, setSelected] = useState('center');
  
  const options = [
    { value: 'left', label: 'Left', icon: '←' },
    { value: 'center', label: 'Center', icon: '↔️' },
    { value: 'right', label: 'Right', icon: '→' }
  ];
  
  return (
    <ButtonGroup variant="toggle">
      {options.map(({ value, label, icon }) => (
        <Button
          key={value}
          variant={selected === value ? 'primary' : 'secondary'}
          onClick={() => {
            setSelected(value);
            action('toggle')(value);
          }}
        >
          {icon} {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export const ToolbarActions = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <ButtonGroup>
      <Button variant="secondary" onClick={action('new')}>New</Button>
      <Button variant="secondary" onClick={action('open')}>Open</Button>
      <Button variant="secondary" onClick={action('save')}>Save</Button>
    </ButtonGroup>
    
    <ButtonGroup>
      <Button variant="secondary" onClick={action('undo')}>Undo</Button>
      <Button variant="secondary" onClick={action('redo')}>Redo</Button>
    </ButtonGroup>
    
    <ButtonGroup>
      <Button variant="primary" onClick={action('publish')}>Publish</Button>
      <Button variant="secondary" onClick={action('preview')}>Preview</Button>
    </ButtonGroup>
  </div>
);

export const FormActions = () => (
  <ButtonGroup orientation="horizontal" spacing="md">
    <Button variant="secondary" onClick={action('cancel')}>Cancel</Button>
    <Button variant="secondary" onClick={action('save-draft')}>Save Draft</Button>
    <Button variant="primary" onClick={action('submit')}>Submit</Button>
  </ButtonGroup>
);

export const VerticalGroup = () => (
  <ButtonGroup orientation="vertical">
    <Button onClick={action('top')}>Top Option</Button>
    <Button onClick={action('middle')}>Middle Option</Button>
    <Button onClick={action('bottom')}>Bottom Option</Button>
  </ButtonGroup>
);
