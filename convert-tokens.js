const fs = require('fs');

// Twój oryginalny JSON (skopiowany z dokumentu)
const originalTokens = JSON.parse(fs.readFileSync('tokens.json', 'utf8'));

// Funkcja do konwersji
function fixTokens(tokens) {
  const fixed = { ...tokens };
  
  // Popraw font-family
  fixed.fontFamily = {
    text: { value: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", type: "fontFamily" },
    code: { value: "'Geist Mono', 'SF Mono', Monaco, Consolas, monospace", type: "fontFamily" },
    emphasis: { value: "Newsreader, Georgia, 'Times New Roman', serif", type: "fontFamily" },
    quote: { value: "Newsreader, Georgia, 'Times New Roman', serif", type: "fontFamily" }
  };
  delete fixed['font-family'];
  
  // Popraw font-weight  
  fixed.fontWeight = {
    thin: { value: "100", type: "fontWeight" },
    extralight: { value: "200", type: "fontWeight" },
    light: { value: "300", type: "fontWeight" },
    normal: { value: "400", type: "fontWeight" },
    medium: { value: "500", type: "fontWeight" },
    semibold: { value: "600", type: "fontWeight" },
    bold: { value: "700", type: "fontWeight" },
    extrabold: { value: "800", type: "fontWeight" },
    black: { value: "900", type: "fontWeight" }
  };
  delete fixed['font-weight'];
  
  // Popraw spacing - dodaj px
  Object.keys(fixed.spacing).forEach(key => {
    const val = fixed.spacing[key].value;
    fixed.spacing[key] = {
      value: `${val}px`,
      type: "dimension",
      description: fixed.spacing[key].description
    };
  });
  
  // Popraw border-radius - dodaj px  
  const newBorderRadius = {};
  Object.keys(fixed['border-radius']).forEach(key => {
    const newKey = key.replace('rounded-', '').replace('rounded', 'base');
    const val = fixed['border-radius'][key].value;
    newBorderRadius[newKey] = {
      value: `${val}px`,
      type: "dimension"
    };
  });
  fixed.borderRadius = newBorderRadius;
  delete fixed['border-radius'];
  
  // Popraw letter-spacing - dodaj px
  const newLetterSpacing = {};
  Object.keys(fixed['letter-spacing']).forEach(key => {
    const newKey = key.replace('tracking-', '');
    const val = fixed['letter-spacing'][key].value;
    newLetterSpacing[newKey] = {
      value: `${val}px`,
      type: "dimension"
    };
  });
  fixed.letterSpacing = newLetterSpacing;
  delete fixed['letter-spacing'];
  
  // Rename font-size to fontSize (już ma dobre typy)
  fixed.fontSize = fixed['font-size'];
  delete fixed['font-size'];
  
  // Rename line-height to lineHeight
  fixed.lineHeight = fixed['line-height'];
  delete fixed['line-height'];
  
  // Dodaj schema
  return {
    "$schema": "https://tr.designtokens.org/format/",
    ...fixed
  };
}

// Przekonwertuj
const fixedTokens = fixTokens(originalTokens);

// Zapisz
fs.writeFileSync('tokens-w3c-full.json', JSON.stringify(fixedTokens, null, 2));
console.log('✅ Plik tokens-w3c-full.json został utworzony!');
