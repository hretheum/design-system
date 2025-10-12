# ⚡ Szybki start

## 1️⃣ Instalacja (2 minuty)
```bash
npm install
npm run build
```

## 2️⃣ Użycie w CSS
```css
.button {
  background-color: var(--component-button-primary-background);
  color: var(--component-button-primary-text);
  padding: var(--component-button-primary-padding-y) 
           var(--component-button-primary-padding-x);
}
```

## 3️⃣ Popularne tokeny

- `--functional-text-primary` - główny tekst
- `--functional-surface-primary` - główne tło
- `--component-button-primary-background` - tło przycisku
- `--semantic-spacing-component-md` - standardowy padding

## 4️⃣ Zasada

✅ Używaj: `functional.*` lub `component.*`
❌ NIE: `primitive.*`

Primitive to surowe wartości używane tylko jako referencja!
