/**
 * PEŁNA STRUKTURA DESIGN TOKENS - WIELOWARSTWOWA ARCHITEKTURA
 * 
 * Warstwa 1: PRIMITIVE/REFERENCE TOKENS (tokeny referencyjne)
 * Warstwa 2: SEMANTIC TOKENS (tokeny semantyczne)
 * Warstwa 3: FUNCTIONAL/APPLICATION TOKENS (tokeny funkcjonalne aplikacji)
 * Warstwa 4: COMPONENT TOKENS (tokeny komponentowe)
 * Warstwa 5: THEME TOKENS (warianty motywów)
 */

// ============================================================================
// WARSTWA 1: PRIMITIVE/REFERENCE TOKENS - Podstawowe wartości bez kontekstu
// ============================================================================

const primitiveTokens = {
  
  // 1.1 KOLORY PALETTE - Pełne palety kolorów
  color: {
    // Paleta szarości
    gray: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0A0A0A',
      1000: '#000000',
    },
    
    // Paleta niebieska (primary candidate)
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
      950: '#172554',
    },
    
    // Paleta zielona (success candidate)
    green: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
      950: '#052E16',
    },
    
    // Paleta czerwona (error candidate)
    red: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
      950: '#450A0A',
    },
    
    // Paleta żółta (warning candidate)
    amber: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
      950: '#451A03',
    },
    
    // Paleta fioletowa (secondary candidate)
    purple: {
      50: '#FAF5FF',
      100: '#F3E8FF',
      200: '#E9D5FF',
      300: '#D8B4FE',
      400: '#C084FC',
      500: '#A855F7',
      600: '#9333EA',
      700: '#7E22CE',
      800: '#6B21A8',
      900: '#581C87',
      950: '#3B0764',
    },
  },
  
  // 1.2 SPACING - System odstępów (4px base)
  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    14: '3.5rem',    // 56px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
    40: '10rem',     // 160px
    48: '12rem',     // 192px
    56: '14rem',     // 224px
    64: '16rem',     // 256px
  },
  
  // 1.3 SIZING - Rozmiary
  sizing: {
    0: '0',
    px: '1px',
    full: '100%',
    screen: '100vh',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content',
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
    80: '20rem',
    96: '24rem',
  },
  
  // 1.4 TYPOGRAPHY - Podstawowe wartości typografii
  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
      serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
      '9xl': '8rem',      // 128px
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  
  // 1.5 BORDER RADIUS - Zaokrąglenia
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
  },
  
  // 1.6 BORDER WIDTH - Grubości obramowań
  borderWidth: {
    0: '0',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },
  
  // 1.7 OPACITY - Przezroczystość
  opacity: {
    0: '0',
    5: '0.05',
    10: '0.1',
    20: '0.2',
    25: '0.25',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    75: '0.75',
    80: '0.8',
    90: '0.9',
    95: '0.95',
    100: '1',
  },
  
  // 1.8 SHADOWS - Definicje cieni
  shadow: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '2xl': '0 50px 100px -20px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  
  // 1.9 Z-INDEX - Warstwy
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
  },
  
  // 1.10 ANIMATION - Animacje
  animation: {
    duration: {
      instant: '0ms',
      fast: '100ms',
      normal: '200ms',
      moderate: '300ms',
      slow: '400ms',
      slower: '500ms',
      slowest: '700ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
  
  // 1.11 BREAKPOINTS - Punkty przełamania
  breakpoint: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// ============================================================================
// WARSTWA 2: SEMANTIC TOKENS - Tokeny z kontekstem semantycznym
// ============================================================================

const semanticTokens = {
  
  // 2.1 KOLORY SEMANTYCZNE - Nadanie znaczenia kolorom
  color: {
    // Brand colors - tożsamość marki
    brand: {
      primary: primitiveTokens.color.blue[600],
      primaryHover: primitiveTokens.color.blue[700],
      primaryActive: primitiveTokens.color.blue[800],
      primarySubtle: primitiveTokens.color.blue[50],
      
      secondary: primitiveTokens.color.purple[600],
      secondaryHover: primitiveTokens.color.purple[700],
      secondaryActive: primitiveTokens.color.purple[800],
      secondarySubtle: primitiveTokens.color.purple[50],
    },
    
    // Feedback colors - komunikaty zwrotne
    feedback: {
      success: primitiveTokens.color.green[600],
      successHover: primitiveTokens.color.green[700],
      successSubtle: primitiveTokens.color.green[50],
      successBorder: primitiveTokens.color.green[200],
      
      warning: primitiveTokens.color.amber[600],
      warningHover: primitiveTokens.color.amber[700],
      warningSubtle: primitiveTokens.color.amber[50],
      warningBorder: primitiveTokens.color.amber[200],
      
      error: primitiveTokens.color.red[600],
      errorHover: primitiveTokens.color.red[700],
      errorSubtle: primitiveTokens.color.red[50],
      errorBorder: primitiveTokens.color.red[200],
      
      info: primitiveTokens.color.blue[600],
      infoHover: primitiveTokens.color.blue[700],
      infoSubtle: primitiveTokens.color.blue[50],
      infoBorder: primitiveTokens.color.blue[200],
    },
    
    // Interactive states - stany interaktywne
    interactive: {
      default: primitiveTokens.color.blue[600],
      hover: primitiveTokens.color.blue[700],
      active: primitiveTokens.color.blue[800],
      focus: primitiveTokens.color.blue[600],
      disabled: primitiveTokens.color.gray[300],
      
      link: primitiveTokens.color.blue[600],
      linkHover: primitiveTokens.color.blue[700],
      linkVisited: primitiveTokens.color.purple[600],
    },
  },
  
  // 2.2 SPACING SEMANTYCZNE - Odstępy z kontekstem
  spacing: {
    // Layout spacing
    layout: {
      xs: primitiveTokens.spacing[4],
      sm: primitiveTokens.spacing[6],
      md: primitiveTokens.spacing[8],
      lg: primitiveTokens.spacing[12],
      xl: primitiveTokens.spacing[16],
      '2xl': primitiveTokens.spacing[24],
    },
    
    // Component spacing
    component: {
      xs: primitiveTokens.spacing[1],
      sm: primitiveTokens.spacing[2],
      md: primitiveTokens.spacing[3],
      lg: primitiveTokens.spacing[4],
      xl: primitiveTokens.spacing[6],
    },
    
    // Gap spacing
    gap: {
      xs: primitiveTokens.spacing[1],
      sm: primitiveTokens.spacing[2],
      md: primitiveTokens.spacing[4],
      lg: primitiveTokens.spacing[6],
      xl: primitiveTokens.spacing[8],
    },
  },
  
  // 2.3 TYPOGRAPHY SEMANTYCZNE
  typography: {
    heading: {
      h1: {
        fontSize: primitiveTokens.typography.fontSize['5xl'],
        fontWeight: primitiveTokens.typography.fontWeight.bold,
        lineHeight: primitiveTokens.typography.lineHeight.tight,
      },
      h2: {
        fontSize: primitiveTokens.typography.fontSize['4xl'],
        fontWeight: primitiveTokens.typography.fontWeight.bold,
        lineHeight: primitiveTokens.typography.lineHeight.tight,
      },
      h3: {
        fontSize: primitiveTokens.typography.fontSize['3xl'],
        fontWeight: primitiveTokens.typography.fontWeight.semibold,
        lineHeight: primitiveTokens.typography.lineHeight.snug,
      },
    },
    body: {
      large: {
        fontSize: primitiveTokens.typography.fontSize.lg,
        lineHeight: primitiveTokens.typography.lineHeight.relaxed,
      },
      base: {
        fontSize: primitiveTokens.typography.fontSize.base,
        lineHeight: primitiveTokens.typography.lineHeight.normal,
      },
      small: {
        fontSize: primitiveTokens.typography.fontSize.sm,
        lineHeight: primitiveTokens.typography.lineHeight.normal,
      },
    },
  },
  
  // 2.4 SHADOWS SEMANTYCZNE
  shadow: {
    small: primitiveTokens.shadow.sm,
    medium: primitiveTokens.shadow.base,
    large: primitiveTokens.shadow.lg,
    overlay: primitiveTokens.shadow.xl,
  },
  
  // 2.5 Z-INDEX SEMANTYCZNE
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
};

// ============================================================================
// WARSTWA 3: FUNCTIONAL TOKENS - Tokeny funkcjonalne aplikacji
// ============================================================================

const functionalTokens = {
  
  // 3.1 TEXT - Kolory tekstu
  text: {
    primary: primitiveTokens.color.gray[900],
    secondary: primitiveTokens.color.gray[700],
    tertiary: primitiveTokens.color.gray[500],
    disabled: primitiveTokens.color.gray[400],
    inverse: primitiveTokens.color.gray[0],
    
    brand: semanticTokens.color.brand.primary,
    success: semanticTokens.color.feedback.success,
    warning: semanticTokens.color.feedback.warning,
    error: semanticTokens.color.feedback.error,
    info: semanticTokens.color.feedback.info,
  },
  
  // 3.2 SURFACE - Tła
  surface: {
    primary: primitiveTokens.color.gray[0],
    secondary: primitiveTokens.color.gray[50],
    tertiary: primitiveTokens.color.gray[100],
    
    elevated: primitiveTokens.color.gray[0],
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    interactive: primitiveTokens.color.gray[100],
    interactiveHover: primitiveTokens.color.gray[200],
    
    brandSubtle: semanticTokens.color.brand.primarySubtle,
    successSubtle: semanticTokens.color.feedback.successSubtle,
  },
  
  // 3.3 BORDER - Obramowania
  border: {
    default: primitiveTokens.color.gray[200],
    strong: primitiveTokens.color.gray[300],
    subtle: primitiveTokens.color.gray[100],
    
    focus: semanticTokens.color.interactive.focus,
    error: semanticTokens.color.feedback.errorBorder,
  },
  
  // 3.4 ICON - Ikony
  icon: {
    primary: primitiveTokens.color.gray[700],
    secondary: primitiveTokens.color.gray[500],
    disabled: primitiveTokens.color.gray[300],
  },
};

// ============================================================================
// WARSTWA 4: COMPONENT TOKENS - Tokeny komponentowe
// ============================================================================

const componentTokens = {
  
  button: {
    primary: {
      backgroundColor: semanticTokens.color.brand.primary,
      backgroundHover: semanticTokens.color.brand.primaryHover,
      textColor: functionalTokens.text.inverse,
      padding: `${semanticTokens.spacing.component.md} ${semanticTokens.spacing.component.lg}`,
      borderRadius: primitiveTokens.borderRadius.lg,
    },
  },
  
  input: {
    backgroundColor: functionalTokens.surface.primary,
    borderColor: functionalTokens.border.default,
    borderFocus: functionalTokens.border.focus,
    padding: semanticTokens.spacing.component.md,
    borderRadius: primitiveTokens.borderRadius.md,
  },
  
  card: {
    backgroundColor: functionalTokens.surface.elevated,
    borderColor: functionalTokens.border.subtle,
    padding: semanticTokens.spacing.component.xl,
    borderRadius: primitiveTokens.borderRadius.xl,
    shadow: semanticTokens.shadow.medium,
  },
};

// ============================================================================
// WARSTWA 5: THEME TOKENS - Light/Dark
// ============================================================================

const themeTokens = {
  light: functionalTokens,
  dark: {
    text: {
      primary: primitiveTokens.color.gray[50],
      secondary: primitiveTokens.color.gray[300],
      tertiary: primitiveTokens.color.gray[400],
    },
    surface: {
      primary: primitiveTokens.color.gray[900],
      secondary: primitiveTokens.color.gray[800],
    },
  },
};

export const designTokens = {
  primitive: primitiveTokens,
  semantic: semanticTokens,
  functional: functionalTokens,
  component: componentTokens,
  theme: themeTokens,
};