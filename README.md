# Design Tokens - Wielowarstwowa architektura

## 🏗️ Architektura 5-warstwowa

### Warstwa 1: Primitive Tokens
Podstawowe wartości bez kontekstu - kolory hex, rozmiary w rem.
**Nigdy nie używaj bezpośrednio w kodzie!**

### Warstwa 2: Semantic Tokens
Pierwsze nadanie znaczenia: brand.primary, feedback.success.
Referencje do primitive tokens.

### Warstwa 3: Functional Tokens
Mapowanie do funkcji aplikacji: text.primary, surface.elevated.
**Najczęściej używana warstwa w kodzie.**

### Warstwa 4: Component Tokens
Specyficzne dla komponentów: button.primary.background.
Używane w definicjach komponentów.

### Warstwa 5: Theme Tokens
Warianty dla light/dark mode.

## 🚀 Instalacja

```bash
npm install
npm run build
```

## 💻 Użycie

### CSS
```css
@import './dist/css/variables.css';

.button {
  background-color: var(--component-button-primary-background);
}
```

### JavaScript
```javascript
import { tokens } from './dist/js/tokens';

const color = tokens['functional-text-primary'];
```

## 🔨 Build commands

- `npm run build` - Build wszystkich platform
- `npm run build:clean` - Clean + build
- `npm run watch` - Watch mode

## ✨ Best Practice

✅ Używaj: `functional.*` lub `component.*`
❌ NIE używaj: `primitive.*`

## 📚 Więcej informacji

Zobacz inne pliki dokumentacji:
- QUICKSTART.md - 5-minutowy tutorial
- SETUP.md - Szczegółowa instrukcja integracji
- EXAMPLES.md - Gotowe przykłady kodu
- INDEX.md - Przegląd wszystkich plików
