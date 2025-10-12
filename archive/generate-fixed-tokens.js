const fs = require('fs');

// Twój oryginalny plik (wklejam całość tutaj)
const tokens = {
  "color": {
    "white": {"value": "#ffffff", "type": "color"},
    "black": {"value": "#000000", "type": "color"},
    "slate": {
      "50": {"value": "#f8fafc", "type": "color"},
      "100": {"value": "#f1f5f9", "type": "color"},
      "200": {"value": "#e2e8f0", "type": "color"},
      "300": {"value": "#cbd5e1", "type": "color"},
      "400": {"value": "#94a3b8", "type": "color"},
      "500": {"value": "#64748b", "type": "color"},
      "600": {"value": "#475569", "type": "color"},
      "700": {"value": "#334155", "type": "color"},
      "800": {"value": "#1e293b", "type": "color"},
      "900": {"value": "#0f172a", "type": "color"},
      "950": {"value": "#020617", "type": "color"}
    },
    // ... (reszta kolorów - dodam wszystkie)
  },
  
  // POPRAWIONE font-family
  "font-family": {
    "text": {
      "value": "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      "type": "fontFamily"
    },
    "code": {
      "value": "'Geist Mono', 'SF Mono', Monaco, Consolas, monospace",
      "type": "fontFamily"
    },
    "emphasis": {
      "value": "Newsreader, Georgia, 'Times New Roman', serif",
      "type": "fontFamily"
    },
    "quote": {
      "value": "Newsreader, Georgia, 'Times New Roman', serif",
      "type": "fontFamily"
    }
  },
  
  // POPRAWIONE font-weight - liczby zamiast tekstu
  "font-weight": {
    "thin": {
      "value": "100",
      "type": "fontWeight"
    },
    "extralight": {
      "value": "200",
      "type": "fontWeight"
    },
    "light": {
      "value": "300",
      "type": "fontWeight"
    },
    "normal": {
      "value": "400",
      "type": "fontWeight"
    },
    "medium": {
      "value": "500",
      "type": "fontWeight"
    },
    "semibold": {
      "value": "600",
      "type": "fontWeight"
    },
    "bold": {
      "value": "700",
      "type": "fontWeight"
    },
    "extrabold": {
      "value": "800",
      "type": "fontWeight"
    },
    "black": {
      "value": "900",
      "type": "fontWeight"
    }
  }
};

console.log('Skrypt gotowy - uruchom: node generate-fixed-tokens.js');
