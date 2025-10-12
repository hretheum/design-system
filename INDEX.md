# 📦 Design Tokens - Przegląd plików

## 🎯 Główne pliki

### 1. **tokens.json** ⭐
Główny plik z definicjami wszystkich tokenów (5 warstw)

### 2. **config.js** ⚙️
Konfiguracja Style Dictionary

### 3. **package.json** 📦
Zależności i build scripts

## 📚 Dokumentacja

### 4. **README.md** 📖
Pełna dokumentacja architektury

### 5. **QUICKSTART.md** ⚡
5-minutowy tutorial

### 6. **SETUP.md** 🔧
Instrukcje instalacji krok po kroku

### 7. **EXAMPLES.md** 💡
Przykłady komponentów

### 8. **.gitignore** 🚫
Lista plików ignorowanych przez Git

## 🚀 Quick Navigation

### Chcę zacząć od razu
→ **QUICKSTART.md**

### Chcę zrozumieć system
→ **README.md**

### Chcę zintegrować z projektem
→ **SETUP.md**

### Potrzebuję przykładów kodu
→ **EXAMPLES.md**

## 📋 Checklist dla nowych użytkowników

- [ ] Przeczytaj **QUICKSTART.md** (5 min)
- [ ] Zainstaluj: `npm install`
- [ ] Zbuduj: `npm run build`
- [ ] Przeczytaj **README.md** sekcję "Architektura"
- [ ] Zobacz przykłady w **EXAMPLES.md**
- [ ] Zintegruj według **SETUP.md**

## 🎯 Najważniejsza zasada

**Używaj w kodzie**: `functional.*` lub `component.*`  
**NIE używaj**: `primitive.*`

Primitive tokens to surowe wartości używane tylko jako referencja!

## 📞 Szybka pomoc

**Problem**: Nie wiem od czego zacząć  
**Rozwiązanie**: → QUICKSTART.md

**Problem**: Tokeny się nie budują  
**Rozwiązanie**: → SETUP.md sekcja "Troubleshooting"

**Problem**: Nie wiem jak użyć w moim projekcie  
**Rozwiązanie**: → SETUP.md

**Problem**: Potrzebuję przykładu komponentu  
**Rozwiązanie**: → EXAMPLES.md

**Problem**: Chcę zmienić kolory  
**Rozwiązanie**: → tokens.json + `npm run build`
