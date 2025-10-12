const fs = require('fs');

// Wczytaj wszystkie pliki tokenów
const files = {
  primitives: JSON.parse(fs.readFileSync('primitives.json', 'utf8')),
  semantic: JSON.parse(fs.readFileSync('semantic.json', 'utf8')),
  functional: JSON.parse(fs.readFileSync('functional.json', 'utf8')),
  component: JSON.parse(fs.readFileSync('component.json', 'utf8')),
  accessibility: JSON.parse(fs.readFileSync('accessibility.json', 'utf8')),
  theme: JSON.parse(fs.readFileSync('theme.json', 'utf8'))
};

// Funkcja do znajdowania wszystkich kluczy w obiekcie
function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    if (key === '$schema') continue;
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      if (obj[key].value !== undefined) {
        keys.push(fullKey);
      } else {
        keys.push(...getAllKeys(obj[key], fullKey));
      }
    }
  }
  return keys;
}

// Funkcja do znajdowania wszystkich referencji w obiekcie
function getAllReferences(obj, filepath = '') {
  const refs = [];
  
  function traverse(obj, path = '') {
    for (const key in obj) {
      if (key === '$schema') continue;
      const currentPath = path ? `${path}.${key}` : key;
      
      if (obj[key] && typeof obj[key] === 'object') {
        if (obj[key].value !== undefined) {
          const value = obj[key].value;
          if (typeof value === 'string' && value.match(/\{[^}]+\}/)) {
            const match = value.match(/\{([^}]+)\}/);
            if (match) {
              refs.push({
                location: `${filepath}:${currentPath}`,
                reference: match[1],
                fullValue: value
              });
            }
          }
        } else {
          traverse(obj[key], currentPath);
        }
      }
    }
  }
  
  traverse(obj);
  return refs;
}

// Pobierz wszystkie dostępne klucze z każdego pliku
const availableKeys = {
  primitives: getAllKeys(files.primitives),
  semantic: getAllKeys(files.semantic),
  functional: getAllKeys(files.functional),
  component: getAllKeys(files.component),
  accessibility: getAllKeys(files.accessibility),
  theme: getAllKeys(files.theme)
};

console.log('=== RAPORT AUDYTU TOKENÓW DESIGN SYSTEM ===\n');

// Sprawdź każdy plik
const errors = [];

for (const [filename, data] of Object.entries(files)) {
  console.log(`## Audyt pliku: ${filename}.json`);
  
  const references = getAllReferences(data, filename);
  
  if (references.length === 0) {
    console.log('✅ Brak referencji (poprawne dla pliku bazowego)');
  } else {
    console.log(`📋 Znaleziono ${references.length} referencji:`);
    
    for (const ref of references) {
      let found = false;
      let foundIn = '';
      
      // Sprawdź hierarchię zgodnie z zasadami
      if (filename === 'semantic') {
        // semantic może referencjonować tylko primitives
        if (availableKeys.primitives.includes(ref.reference)) {
          found = true;
          foundIn = 'primitives';
        }
      } else if (filename === 'functional') {
        // functional może referencjonować primitives i semantic
        if (availableKeys.primitives.includes(ref.reference)) {
          found = true;
          foundIn = 'primitives';
        } else if (availableKeys.semantic.includes(ref.reference)) {
          found = true;
          foundIn = 'semantic';
        }
      } else if (filename === 'component') {
        // component może referencjonować wszystkie niższe warstwy
        if (availableKeys.primitives.includes(ref.reference)) {
          found = true;
          foundIn = 'primitives';
        } else if (availableKeys.semantic.includes(ref.reference)) {
          found = true;
          foundIn = 'semantic';
        } else if (availableKeys.functional.includes(ref.reference)) {
          found = true;
          foundIn = 'functional';
        }
      } else if (filename === 'accessibility') {
        // accessibility może referencjonować primitives i semantic
        if (availableKeys.primitives.includes(ref.reference)) {
          found = true;
          foundIn = 'primitives';
        } else if (availableKeys.semantic.includes(ref.reference)) {
          found = true;
          foundIn = 'semantic';
        }
      } else if (filename === 'theme') {
        // theme może referencjonować wszystkie warstwy
        if (availableKeys.primitives.includes(ref.reference)) {
          found = true;
          foundIn = 'primitives';
        } else if (availableKeys.semantic.includes(ref.reference)) {
          found = true;
          foundIn = 'semantic';
        } else if (availableKeys.functional.includes(ref.reference)) {
          found = true;
          foundIn = 'functional';
        } else if (availableKeys.component.includes(ref.reference)) {
          found = true;
          foundIn = 'component';
        } else if (availableKeys.accessibility.includes(ref.reference)) {
          found = true;
          foundIn = 'accessibility';
        }
      }
      
      if (found) {
        console.log(`  ✅ ${ref.location} → {${ref.reference}} (znaleziony w ${foundIn})`);
      } else {
        console.log(`  ❌ ${ref.location} → {${ref.reference}} (NIE ZNALEZIONY)`);
        errors.push({
          file: filename,
          location: ref.location,
          reference: ref.reference,
          fullValue: ref.fullValue
        });
      }
    }
  }
  console.log('');
}

console.log('=== PODSUMOWANIE BŁĘDÓW ===\n');

if (errors.length === 0) {
  console.log('🎉 Brak błędów! Wszystkie referencje są prawidłowe.');
} else {
  console.log(`❌ Znaleziono ${errors.length} błędów:\n`);
  
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i];
    console.log(`${i + 1}. BŁĄD w pliku ${error.file}.json`);
    console.log(`   Lokalizacja: ${error.location}`);
    console.log(`   Brakująca referencja: {${error.reference}}`);
    console.log(`   Pełna wartość: ${error.fullValue}`);
    console.log('');
  }
}

console.log('=== STATYSTYKI ===');
console.log('Dostępne tokeny w każdym pliku:');
for (const [file, keys] of Object.entries(availableKeys)) {
  console.log(`- ${file}.json: ${keys.length} tokenów`);
}
