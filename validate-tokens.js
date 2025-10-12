#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Wczytaj wszystkie pliki tokenów
function loadTokenFile(filename) {
  try {
    const filePath = path.join(__dirname, filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error loading ${filename}:`, error.message);
    return null;
  }
}

// Zbierz wszystkie tokeny z pliku
function collectTokens(obj, prefix = '') {
  const tokens = new Set();
  
  function traverse(obj, currentPrefix) {
    for (const [key, value] of Object.entries(obj)) {
      if (key === '$schema') continue;
      
      const fullKey = currentPrefix ? `${currentPrefix}.${key}` : key;
      
      if (value && typeof value === 'object') {
        if (value.value !== undefined) {
          // To jest token
          tokens.add(fullKey);
        } else {
          // To jest grupa - idź głębiej
          traverse(value, fullKey);
        }
      }
    }
  }
  
  traverse(obj, prefix);
  return tokens;
}

// Znajdź wszystkie referencje w wartościach tokenów
function findReferences(obj, filename) {
  const references = [];
  
  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (key === '$schema') continue;
      
      const currentPath = [...path, key];
      
      if (value && typeof value === 'object') {
        if (value.value !== undefined && typeof value.value === 'string') {
          // Sprawdź czy wartość zawiera referencję
          const matches = value.value.match(/\{([^}]+)\}/g);
          if (matches) {
            matches.forEach(match => {
              const ref = match.slice(1, -1); // Usuń nawiasy klamrowe
              references.push({
                file: filename,
                token: currentPath.join('.'),
                reference: ref,
                value: value.value
              });
            });
          }
        } else {
          traverse(value, currentPath);
        }
      }
    }
  }
  
  traverse(obj);
  return references;
}

// Główna funkcja walidacji
function validateTokens() {
  console.log('🔍 Walidacja tokenów designu...\n');
  
  // Wczytaj wszystkie pliki
  const primitives = loadTokenFile('primitives.json');
  const semantic = loadTokenFile('semantic.json');
  const functional = loadTokenFile('functional.json');
  const component = loadTokenFile('component.json');
  
  if (!primitives || !semantic || !functional || !component) {
    console.error('❌ Nie można wczytać wszystkich plików tokenów');
    process.exit(1);
  }
  
  // Zbierz wszystkie dostępne tokeny
  const primitivesTokens = collectTokens(primitives);
  const semanticTokens = collectTokens(semantic);
  const functionalTokens = collectTokens(functional);
  const componentTokens = collectTokens(component);
  
  const allTokens = new Set([
    ...primitivesTokens,
    ...semanticTokens,
    ...functionalTokens,
    ...componentTokens
  ]);
  
  console.log(`📊 Statystyki tokenów:`);
  console.log(`   Primitives: ${primitivesTokens.size}`);
  console.log(`   Semantic: ${semanticTokens.size}`);
  console.log(`   Functional: ${functionalTokens.size}`);
  console.log(`   Component: ${componentTokens.size}`);
  console.log(`   Razem: ${allTokens.size}\n`);
  
  // Znajdź wszystkie referencje
  const allReferences = [
    ...findReferences(primitives, 'primitives.json'),
    ...findReferences(semantic, 'semantic.json'),
    ...findReferences(functional, 'functional.json'),
    ...findReferences(component, 'component.json')
  ];
  
  console.log(`🔗 Znaleziono ${allReferences.length} referencji\n`);
  
  // Sprawdź czy wszystkie referencje istnieją
  const invalidReferences = [];
  
  for (const ref of allReferences) {
    if (!allTokens.has(ref.reference)) {
      invalidReferences.push(ref);
    }
  }
  
  // Pokaż wyniki
  if (invalidReferences.length === 0) {
    console.log('✅ Wszystkie referencje są poprawne!');
  } else {
    console.log(`❌ Znaleziono ${invalidReferences.length} niepoprawnych referencji:\n`);
    
    // Grupuj błędy po plikach
    const errorsByFile = {};
    for (const ref of invalidReferences) {
      if (!errorsByFile[ref.file]) {
        errorsByFile[ref.file] = [];
      }
      errorsByFile[ref.file].push(ref);
    }
    
    for (const [file, errors] of Object.entries(errorsByFile)) {
      console.log(`📄 ${file}:`);
      for (const error of errors) {
        console.log(`   ❌ ${error.token} -> "${error.reference}" (wartość: ${error.value})`);
      }
      console.log();
    }
  }
  
  // Sprawdź cykliczne referencje w każdej warstwie
  console.log('🔄 Sprawdzanie cyklicznych referencji...\n');
  
  const layers = [
    { name: 'primitives', tokens: primitives, file: 'primitives.json' },
    { name: 'semantic', tokens: semantic, file: 'semantic.json' },
    { name: 'functional', tokens: functional, file: 'functional.json' },
    { name: 'component', tokens: component, file: 'component.json' }
  ];
  
  let hasCyclicRefs = false;
  
  for (const layer of layers) {
    const layerTokens = collectTokens(layer.tokens);
    const layerReferences = findReferences(layer.tokens, layer.file);
    
    for (const ref of layerReferences) {
      if (layerTokens.has(ref.reference)) {
        console.log(`❌ Cykliczna referencja w ${layer.file}: ${ref.token} -> ${ref.reference}`);
        hasCyclicRefs = true;
      }
    }
  }
  
  if (!hasCyclicRefs) {
    console.log('✅ Nie znaleziono cyklicznych referencji w obrębie warstw');
  }
  
  console.log(`\n📊 Podsumowanie:`);
  console.log(`   Wszystkich tokenów: ${allTokens.size}`);
  console.log(`   Wszystkich referencji: ${allReferences.length}`);
  console.log(`   Niepoprawnych referencji: ${invalidReferences.length}`);
  console.log(`   Cykliczne referencje: ${hasCyclicRefs ? 'TAK' : 'NIE'}`);
  
  if (invalidReferences.length > 0 || hasCyclicRefs) {
    console.log('\n❌ Walidacja nie powiodła się');
    process.exit(1);
  } else {
    console.log('\n✅ Walidacja przebiegła pomyślnie!');
  }
}

validateTokens();