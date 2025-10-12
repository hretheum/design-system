# Setup Guide - Instrukcja instalacji i konfiguracji

## 📋 Wymagania wstępne

- Node.js >= 14.0.0
- npm >= 6.0.0 lub yarn >= 1.22.0

## 🚀 Szybki start

### Krok 1: Instalacja zależności

```bash
npm install
```

### Krok 2: Build tokenów

```bash
npm run build
```

Po buildzie otrzymasz:
```
dist/
├── css/
│   └── variables.css
├── scss/
│   └── _variables.scss
└── js/
    └── tokens.js
```

## 🔧 Integracja z projektem

### Integracja CSS

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="dist/css/variables.css">
</head>
</html>
```

### Integracja React

```jsx
import './dist/css/variables.css';

function Button() {
  return (
    <button style={{
      backgroundColor: 'var(--component-button-primary-background)',
      color: 'var(--component-button-primary-text)'
    }}>
      Click me
    </button>
  );
}
```

### Integracja Vue

```javascript
// main.js
import './dist/css/variables.css';
```

### Integracja Angular

```json
// angular.json
"styles": [
  "src/tokens/css/variables.css"
]
```

## 🔄 Development Workflow

### Watch mode

```bash
npm run watch
```

## 🚨 Troubleshooting

### Problem: Tokeny nie aktualizują się

```bash
npm run build:clean
```
