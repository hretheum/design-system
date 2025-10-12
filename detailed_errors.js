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

console.log('=== SZCZEGÓŁOWY RAPORT BŁĘDÓW TOKENÓW ===\n');

const errors = [];

for (const [filename, data] of Object.entries(files)) {
  const references = getAllReferences(data, filename);
  
  for (const ref of references) {
    let found = false;
    let foundIn = '';
    
    // Sprawdź hierarchię zgodnie z zasadami
    if (filename === 'semantic') {
      if (availableKeys.primitives.includes(ref.reference)) {
        found = true;
        foundIn = 'primitives';
      }
    } else if (filename === 'functional') {
      if (availableKeys.primitives.includes(ref.reference)) {
        found = true;
        foundIn = 'primitives';
      } else if (availableKeys.semantic.includes(ref.reference)) {
        found = true;
        foundIn = 'semantic';
      }
    } else if (filename === 'component') {
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
      if (availableKeys.primitives.includes(ref.reference)) {
        found = true;
        foundIn = 'primitives';
      } else if (availableKeys.semantic.includes(ref.reference)) {
        found = true;
        foundIn = 'semantic';
      }
    } else if (filename === 'theme') {
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
    
    if (!found) {
      errors.push({
        file: filename,
        location: ref.location,
        reference: ref.reference,
        fullValue: ref.fullValue
      });
    }
  }
}

console.log(`Znaleziono ${errors.length} błędów:\n`);

// Grupuj błędy według pliku
const errorsByFile = {};
for (const error of errors) {
  if (!errorsByFile[error.file]) {
    errorsByFile[error.file] = [];
  }
  errorsByFile[error.file].push(error);
}

let errorNumber = 1;
for (const [filename, fileErrors] of Object.entries(errorsByFile)) {
  console.log(`## ${filename}.json - ${fileErrors.length} błędów:`);
  
  for (const error of fileErrors) {
    const path = error.location.replace(`${filename}:`, '');
    console.log(`${errorNumber}. ${path}`);
    console.log(`   Referencja: {${error.reference}}`);
    console.log(`   Wartość: ${error.fullValue}`);
    
    // Sprawdź czy token o podobnej nazwie istnieje w dostępnych plikach
    const similarTokens = [];
    const refParts = error.reference.split('.');
    
    for (const [sourceFile, keys] of Object.entries(availableKeys)) {
      // Sprawdź czy hierarchia pozwala na użycie tego pliku
      let canUse = false;
      if (filename === 'semantic' && sourceFile === 'primitives') canUse = true;
      if (filename === 'functional' && (sourceFile === 'primitives' || sourceFile === 'semantic')) canUse = true;
      if (filename === 'component' && ['primitives', 'semantic', 'functional'].includes(sourceFile)) canUse = true;
      if (filename === 'accessibility' && (sourceFile === 'primitives' || sourceFile === 'semantic')) canUse = true;
      if (filename === 'theme') canUse = true;
      
      if (canUse) {
        for (const key of keys) {
          if (key.includes(refParts[refParts.length - 1])) {
            similarTokens.push(`${sourceFile}: ${key}`);
          }
        }
      }
    }
    
    if (similarTokens.length > 0) {
      console.log(`   🔍 Podobne tokeny:`);
      for (const similar of similarTokens.slice(0, 3)) {
        console.log(`      - ${similar}`);
      }
    }
    console.log('');
    errorNumber++;
  }
  console.log('');
}

console.log('=== SUGEROWANE POPRAWKI ===\n');

// Generuj sugestie poprawek
console.log('1. Brakujące tokeny w semantic.json:');
const semanticMissing = errors.filter(e => e.file === 'semantic');
const missingTokenGroups = {};

for (const error of semanticMissing) {
  const parts = error.reference.split('.');
  const group = parts[0];
  if (!missingTokenGroups[group]) {
    missingTokenGroups[group] = [];
  }
  missingTokenGroups[group].push(error.reference);
}

for (const [group, tokens] of Object.entries(missingTokenGroups)) {
  console.log(`\n   ${group} (${tokens.length} tokenów):`);
  for (const token of tokens) {
    console.log(`   - ${token}`);
  }
}

