# 🔧 Poprawki W3C Design Tokens - Kompletny przewodnik

## ✅ Co zostało poprawione

### 1. **font-family** ❌→✅
**PRZED (BŁĄD):**
```json
"font-family": {
  "Text": {
    "value": "Geist",
    "type": "text"  // ❌ ZŁY TYP
  }
}
```

**PO (POPRAWNE):**
```json
"fontFamily": {
  "text": {
    "value": "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    "type": "fontFamily"  // ✅ DOBRY TYP
  },
  "code": {
    "value": "'Geist Mono', 'SF Mono', Monaco, Consolas, monospace",
    "type": "fontFamily"
  },
  "emphasis": {
    "value": "Newsreader, Georgia, 'Times New Roman', serif",
    "type": "fontFamily"
  }
}
```

**Zmiany:**
- Klucz: `font-family` → `fontFamily` (camelCase)
- Type: `"text"` → `"fontFamily"`
- Dodane fallback fonts dla lepszej kompatybilności

---

### 2. **font-weight** ❌→✅
**PRZED (BŁĄD):**
```json
"font-weight": {
  "font-thin": {
    "value": "Thin",  // ❌ TEKST zamiast liczby
    "type": "text"    // ❌ ZŁY TYP
  }
}
```

**PO (POPRAWNE):**
```json
"fontWeight": {
  "thin": {
    "value": "100",      // ✅ LICZBA jako string
    "type": "fontWeight" // ✅ DOBRY TYP
  },
  "extralight": { "value": "200", "type": "fontWeight" },
  "light": { "value": "300", "type": "fontWeight" },
  "normal": { "value": "400", "type": "fontWeight" },
  "medium": { "value": "500", "type": "fontWeight" },
  "semibold": { "value": "600", "type": "fontWeight" },
  "bold": { "value": "700", "type": "fontWeight" },
  "extrabold": { "value": "800", "type": "fontWeight" },
  "black": { "value": "900", "type": "fontWeight" }
}
```

**Zmiany:**
- Klucz: `font-weight` → `fontWeight`
- Wartości: `"Thin"` → `"100"`, `"Bold"` → `"700"`, etc.
- Type: `"text"` → `"fontWeight"`
- Nazwy kluczy: `font-thin` → `thin` (bez prefiksu)

---

### 3. **spacing** ❌→✅
**PRZED (BŁĄD):**
```json
"spacing": {
  "1": {
    "value": 4,          // ❌ LICZBA bez jednostki
    "type": "number",    // ❌ ZŁY TYP
    "description": "Size: 4px"
  }
}
```

**PO (POPRAWNE):**
```json
"spacing": {
  "1": {
    "value": "4px",      // ✅ Z JEDNOSTKĄ
    "type": "dimension", // ✅ DOBRY TYP
    "description": "Extra small spacing"
  },
  "2": {
    "value": "8px",
    "type": "dimension",
    "description": "Small spacing"
  }
}
```

**Zmiany:**
- Wartości: `4` → `"4px"`, `8` → `"8px"`, etc.
- Type: `"number"` → `"dimension"`

---

### 4. **border-radius** ❌→✅
**PRZED (BŁĄD):**
```json
"border-radius": {
  "rounded-sm": {
    "value": 2,          // ❌ LICZBA bez jednostki
    "type": "number"     // ❌ ZŁY TYP
  }
}
```

**PO (POPRAWNE):**
```json
"borderRadius": {
  "sm": {
    "value": "2px",      // ✅ Z JEDNOSTKĄ
    "type": "dimension"  // ✅ DOBRY TYP
  },
  "md": { "value": "6px", "type": "dimension" },
  "lg": { "value": "8px", "type": "dimension" },
  "xl": { "value": "12px", "type": "dimension" },
  "full": { "value": "9999px", "type": "dimension" }
}
```

**Zmiany:**
- Klucz: `border-radius` → `borderRadius`
- Wartości: `2` → `"2px"`, `4` → `"4px"`, etc.
- Type: `"number"` → `"dimension"`
- Nazwy kluczy: `rounded-sm` → `sm` (usunięto prefiks `rounded-`)

---

### 5. **letter-spacing** ❌→✅
**PRZED (BŁĄD):**
```json
"letter-spacing": {
  "tracking-tight": {
    "value": -0.4,       // ❌ LICZBA bez jednostki
    "type": "number"     // ❌ ZŁY TYP
  }
}
```

**PO (POPRAWNE - OPCJA 1: em):**
```json
"letterSpacing": {
  "tighter": {
    "value": "-0.05em",  // ✅ Z JEDNOSTKĄ
    "type": "dimension"  // ✅ DOBRY TYP
  },
  "tight": { "value": "-0.025em", "type": "dimension" },
  "normal": { "value": "0em", "type": "dimension" },
  "wide": { "value": "0.025em", "type": "dimension" },
  "wider": { "value": "0.05em", "type": "dimension" },
  "widest": { "value": "0.1em", "type": "dimension" }
}
```

**PO (POPRAWNE - OPCJA 2: px):**
```json
"letterSpacing": {
  "tighter": { "value": "-0.8px", "type": "dimension" },
  "tight": { "value": "-0.4px", "type": "dimension" },
  "normal": { "value": "0px", "type": "dimension" },
  "wide": { "value": "0.4px", "type": "dimension" },
  "wider": { "value": "0.8px", "type": "dimension" },
  "widest": { "value": "1.6px", "type": "dimension" }
}
```

**Zmiany:**
- Klucz: `letter-spacing` → `letterSpacing`
- Wartości: `-0.4` → `"-0.4px"` lub `"-0.025em"`
- Type: `"number"` → `"dimension"`
- Nazwy kluczy: `tracking-tight` → `tight`

---

### 6. **font-size** ✅ (JUŻ POPRAWNE)
```json
"fontSize": {
  "xs": {
    "value": "0.75rem",  // ✅ DOBRE
    "type": "dimension", // ✅ DOBRE
    "description": "12px at base 16px"
  }
}
```
**Bez zmian - już zgodne z W3C!**

---

### 7. **line-height** ✅ (JUŻ POPRAWNE)
```json
"lineHeight": {
  "text-xs": {
    "value": 16,         // ✅ DOBRE (bezjednostkowa wartość w px)
    "type": "number"     // ✅ DOBRE
  }
}
```
**Uwaga:** `type: "number"` jest OK dla line-height gdy wartość to px.
Alternatywnie może być `type: "dimension"` z `"value": "16px"`.

---

## 📝 Tabela podsumowująca

| Właściwość | Przed | Po | Typ przed | Typ po |
|------------|-------|----|-----------|-|
| font-family | `"Geist"` | `"Geist, sans-serif"` | `text` | `fontFamily` |
| font-weight | `"Bold"` | `"700"` | `text` | `fontWeight` |
| spacing | `4` | `"4px"` | `number` | `dimension` |
| border-radius | `8` | `"8px"` | `number` | `dimension` |
| letter-spacing | `-0.4` | `"-0.4px"` | `number` | `dimension` |
| font-size | `"1rem"` | `"1rem"` ✅ | `dimension` ✅ | `dimension` ✅ |
| line-height | `16` | `16` ✅ | `number` ✅ | `number` ✅ |

---

## 🎯 Zalecenia dodatkowe

### Responsywność
Zamiast stałych px, użyj `rem` dla lepszej skalowalności:

```json
"spacing": {
  "1": {
    "value": "0.25rem",  // 4px przy base 16px
    "type": "dimension"
  },
  "2": {
    "value": "0.5rem",   // 8px przy base 16px
    "type": "dimension"
  }
}
```

### Dodaj $schema
Na początku pliku:
```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "color": { ... }
}
```

---

## 📦 Pliki w folderze

- `tokens-w3c.json` - Poprawiony plik (w trakcie tworzenia)
- `tokens-original.json` - Twój oryginalny plik
- `TOKENS-CORRECTIONS.md` - Ten dokument
