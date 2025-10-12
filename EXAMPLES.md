# Przykłady użycia Design Tokens

## 🎨 CSS Examples

### Button Component

```css
.btn-primary {
  background-color: var(--component-button-primary-background);
  color: var(--component-button-primary-text);
  padding: var(--component-button-primary-padding-y) 
           var(--component-button-primary-padding-x);
  border-radius: var(--component-button-primary-border-radius);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--component-button-primary-background-hover);
}
```

### Input Field

```css
.input {
  background-color: var(--component-input-background);
  border: 1px solid var(--component-input-border);
  padding: var(--component-input-padding);
  border-radius: var(--component-input-border-radius);
}

.input:focus {
  border-color: var(--component-input-border-focus);
}
```

## ⚛️ React + Styled Components

```tsx
import styled from 'styled-components';
import { tokens } from './tokens';

const Button = styled.button`
  background-color: ${tokens['component-button-primary-background']};
  color: ${tokens['component-button-primary-text']};
  padding: ${tokens['component-button-primary-padding-y']} 
           ${tokens['component-button-primary-padding-x']};
  border-radius: ${tokens['component-button-primary-border-radius']};
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${tokens['component-button-primary-background-hover']};
  }
`;
```

## 🌓 Dark Mode

```css
:root {
  --text-primary: var(--primitive-color-gray-900);
  --surface-primary: var(--primitive-color-gray-0);
}

[data-theme="dark"] {
  --text-primary: var(--primitive-color-gray-50);
  --surface-primary: var(--primitive-color-gray-900);
}
```

## 💡 Pro Tips

### Custom utility classes

```css
.text-primary { color: var(--functional-text-primary); }
.bg-primary { background-color: var(--functional-surface-primary); }
.p-md { padding: var(--semantic-spacing-component-md); }
```
