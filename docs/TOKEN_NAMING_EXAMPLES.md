# 🎨 Token Naming Convention - Examples & Validation

## Complete Real-World Examples

This document provides comprehensive examples of the token naming convention applied to actual components in our design system.

---

## ✅ Validated Examples by Component

### 1. Button Component Tokens

```json
{
  "button": {
    "size": {
      "xs": {
        "height": { "value": "24px", "type": "dimension" },
        "padding": {
          "x": { "value": "{spacing.2}", "type": "dimension" },
          "y": { "value": "{spacing.1}", "type": "dimension" }
        },
        "fontSize": { "value": "{fontSize.xs}", "type": "dimension" },
        "iconSize": { "value": "{iconSize.xs}", "type": "dimension" },
        "gap": { "value": "{spacing.1}", "type": "dimension" }
      },
      "sm": {
        "height": { "value": "32px", "type": "dimension" },
        "padding": {
          "x": { "value": "{spacing.3}", "type": "dimension" },
          "y": { "value": "{spacing.2}", "type": "dimension" }
        },
        "fontSize": { "value": "{fontSize.sm}", "type": "dimension" }
      },
      "md": {
        "height": { "value": "40px", "type": "dimension" },
        "padding": {
          "x": { "value": "{spacing.4}", "type": "dimension" },
          "y": { "value": "{spacing.2}", "type": "dimension" }
        },
        "fontSize": { "value": "{fontSize.base}", "type": "dimension" }
      }
    },
    "variant": {
      "primary": {
        "background": {
          "default": { "value": "{brand.primary}", "type": "color" },
          "hover": { "value": "{brand.primary.dark}", "type": "color" },
          "active": { "value": "{brand.primary.darker}", "type": "color" },
          "disabled": { "value": "{neutral.300}", "type": "color" }
        },
        "text": {
          "default": { "value": "{content.onPrimary}", "type": "color" },
          "disabled": { "value": "{content.disabled}", "type": "color" }
        },
        "border": {
          "default": { "value": "transparent", "type": "color" },
          "focus": { "value": "{focus.ring.color}", "type": "color" }
        }
      },
      "secondary": {
        "background": {
          "default": { "value": "transparent", "type": "color" },
          "hover": { "value": "{neutral.100}", "type": "color" },
          "active": { "value": "{neutral.200}", "type": "color" }
        },
        "text": {
          "default": { "value": "{brand.primary}", "type": "color" }
        },
        "border": {
          "default": { "value": "{brand.primary}", "type": "color" },
          "hover": { "value": "{brand.primary.dark}", "type": "color" }
        }
      },
      "ghost": {
        "background": {
          "default": { "value": "transparent", "type": "color" },
          "hover": { "value": "{neutral.50}", "type": "color" }
        },
        "text": {
          "default": { "value": "{content.primary}", "type": "color" }
        }
      },
      "danger": {
        "background": {
          "default": { "value": "{feedback.error}", "type": "color" },
          "hover": { "value": "{feedback.error.dark}", "type": "color" }
        },
        "text": {
          "default": { "value": "{content.onError}", "type": "color" }
        }
      }
    },
    "state": {
      "loading": {
        "opacity": { "value": "0.7", "type": "number" },
        "cursor": { "value": "wait", "type": "string" }
      },
      "disabled": {
        "opacity": { "value": "0.5", "type": "number" },
        "cursor": { "value": "not-allowed", "type": "string" }
      }
    }
  }
}
```

**CSS Variable Output:**
```css
:root {
  --button-size-sm-height: 32px;
  --button-size-sm-padding-x: var(--spacing-3);
  --button-size-sm-padding-y: var(--spacing-2);
  --button-variant-primary-background-default: var(--brand-primary);
  --button-variant-primary-background-hover: var(--brand-primary-dark);
  --button-state-disabled-opacity: 0.5;
}
```

### 2. Form Input Tokens

```json
{
  "input": {
    "size": {
      "sm": {
        "height": { "value": "32px", "type": "dimension" },
        "padding": {
          "x": { "value": "{spacing.3}", "type": "dimension" },
          "y": { "value": "{spacing.2}", "type": "dimension" }
        },
        "fontSize": { "value": "{fontSize.sm}", "type": "dimension" }
      },
      "md": {
        "height": { "value": "40px", "type": "dimension" },
        "padding": {
          "x": { "value": "{spacing.4}", "type": "dimension" },
          "y": { "value": "{spacing.2}", "type": "dimension" }
        },
        "fontSize": { "value": "{fontSize.base}", "type": "dimension" }
      }
    },
    "state": {
      "default": {
        "background": { "value": "{surface.default}", "type": "color" },
        "border": { "value": "{border.default}", "type": "color" },
        "text": { "value": "{content.primary}", "type": "color" }
      },
      "hover": {
        "border": { "value": "{border.hover}", "type": "color" }
      },
      "focus": {
        "border": { "value": "{brand.primary}", "type": "color" },
        "outline": { "value": "{focus.ring}", "type": "shadow" }
      },
      "disabled": {
        "background": { "value": "{surface.disabled}", "type": "color" },
        "text": { "value": "{content.disabled}", "type": "color" },
        "cursor": { "value": "not-allowed", "type": "string" }
      },
      "error": {
        "border": { "value": "{feedback.error}", "type": "color" },
        "text": { "value": "{feedback.error}", "type": "color" }
      },
      "success": {
        "border": { "value": "{feedback.success}", "type": "color" }
      }
    },
    "placeholder": {
      "color": { "value": "{content.tertiary}", "type": "color" }
    },
    "helper": {
      "fontSize": { "value": "{fontSize.xs}", "type": "dimension" },
      "color": {
        "default": { "value": "{content.secondary}", "type": "color" },
        "error": { "value": "{feedback.error}", "type": "color" }
      },
      "margin": {
        "top": { "value": "{spacing.1}", "type": "dimension" }
      }
    }
  }
}
```

### 3. Card Component Tokens

```json
{
  "card": {
    "size": {
      "sm": {
        "padding": { "value": "{spacing.4}", "type": "dimension" },
        "gap": { "value": "{spacing.3}", "type": "dimension" }
      },
      "md": {
        "padding": { "value": "{spacing.6}", "type": "dimension" },
        "gap": { "value": "{spacing.4}", "type": "dimension" }
      },
      "lg": {
        "padding": { "value": "{spacing.8}", "type": "dimension" },
        "gap": { "value": "{spacing.6}", "type": "dimension" }
      }
    },
    "variant": {
      "elevated": {
        "background": { "value": "{surface.raised}", "type": "color" },
        "shadow": { "value": "{elevation.medium}", "type": "shadow" }
      },
      "outlined": {
        "background": { "value": "{surface.default}", "type": "color" },
        "border": { "value": "{border.default}", "type": "color" }
      },
      "filled": {
        "background": { "value": "{surface.subdued}", "type": "color" }
      }
    },
    "interactive": {
      "hover": {
        "shadow": { "value": "{elevation.high}", "type": "shadow" },
        "transform": { "value": "translateY(-2px)", "type": "string" }
      },
      "active": {
        "shadow": { "value": "{elevation.low}", "type": "shadow" },
        "transform": { "value": "translateY(0)", "type": "string" }
      }
    },
    "radius": { "value": "{radius.lg}", "type": "dimension" }
  }
}
```

### 4. Typography Tokens

```json
{
  "text": {
    "heading": {
      "1": {
        "fontSize": { "value": "{fontSize.4xl}", "type": "dimension" },
        "fontWeight": { "value": "{fontWeight.bold}", "type": "number" },
        "lineHeight": { "value": "{lineHeight.tight}", "type": "number" },
        "letterSpacing": { "value": "{letterSpacing.tight}", "type": "dimension" },
        "color": {
          "default": { "value": "{content.primary}", "type": "color" },
          "muted": { "value": "{content.secondary}", "type": "color" }
        }
      },
      "2": {
        "fontSize": { "value": "{fontSize.3xl}", "type": "dimension" },
        "fontWeight": { "value": "{fontWeight.semibold}", "type": "number" },
        "lineHeight": { "value": "{lineHeight.tight}", "type": "number" }
      }
    },
    "body": {
      "sm": {
        "fontSize": { "value": "{fontSize.sm}", "type": "dimension" },
        "lineHeight": { "value": "{lineHeight.normal}", "type": "number" },
        "color": {
          "default": { "value": "{content.primary}", "type": "color" },
          "secondary": { "value": "{content.secondary}", "type": "color" }
        }
      },
      "base": {
        "fontSize": { "value": "{fontSize.base}", "type": "dimension" },
        "lineHeight": { "value": "{lineHeight.relaxed}", "type": "number" }
      }
    },
    "label": {
      "fontSize": { "value": "{fontSize.sm}", "type": "dimension" },
      "fontWeight": { "value": "{fontWeight.medium}", "type": "number" },
      "color": {
        "default": { "value": "{content.secondary}", "type": "color" },
        "required": { "value": "{feedback.error}", "type": "color" }
      },
      "textTransform": { "value": "uppercase", "type": "string" },
      "letterSpacing": { "value": "{letterSpacing.wide}", "type": "dimension" }
    }
  }
}
```

### 5. Navigation Tokens

```json
{
  "navigation": {
    "navbar": {
      "height": { "value": "64px", "type": "dimension" },
      "background": { "value": "{surface.default}", "type": "color" },
      "shadow": { "value": "{elevation.low}", "type": "shadow" },
      "padding": {
        "x": { "value": "{spacing.6}", "type": "dimension" }
      }
    },
    "item": {
      "padding": {
        "x": { "value": "{spacing.4}", "type": "dimension" },
        "y": { "value": "{spacing.2}", "type": "dimension" }
      },
      "color": {
        "default": { "value": "{content.secondary}", "type": "color" },
        "hover": { "value": "{content.primary}", "type": "color" },
        "active": { "value": "{brand.primary}", "type": "color" },
        "disabled": { "value": "{content.disabled}", "type": "color" }
      },
      "background": {
        "hover": { "value": "{neutral.100}", "type": "color" },
        "active": { "value": "{selection.background}", "type": "color" }
      },
      "indicator": {
        "width": { "value": "3px", "type": "dimension" },
        "color": { "value": "{brand.primary}", "type": "color" }
      }
    },
    "breadcrumb": {
      "separator": {
        "content": { "value": "/", "type": "string" },
        "color": { "value": "{content.tertiary}", "type": "color" },
        "margin": {
          "x": { "value": "{spacing.2}", "type": "dimension" }
        }
      },
      "item": {
        "color": {
          "default": { "value": "{content.secondary}", "type": "color" },
          "current": { "value": "{content.primary}", "type": "color" }
        }
      }
    }
  }
}
```

### 6. Modal/Dialog Tokens

```json
{
  "modal": {
    "size": {
      "sm": {
        "width": { "value": "400px", "type": "dimension" },
        "maxHeight": { "value": "90vh", "type": "dimension" }
      },
      "md": {
        "width": { "value": "600px", "type": "dimension" }
      },
      "lg": {
        "width": { "value": "800px", "type": "dimension" }
      },
      "fullscreen": {
        "width": { "value": "100vw", "type": "dimension" },
        "height": { "value": "100vh", "type": "dimension" }
      }
    },
    "backdrop": {
      "background": { "value": "rgba(0, 0, 0, 0.5)", "type": "color" },
      "backdropFilter": { "value": "blur(4px)", "type": "string" }
    },
    "content": {
      "background": { "value": "{surface.default}", "type": "color" },
      "radius": { "value": "{radius.lg}", "type": "dimension" },
      "shadow": { "value": "{elevation.high}", "type": "shadow" },
      "padding": { "value": "{spacing.6}", "type": "dimension" }
    },
    "header": {
      "padding": {
        "x": { "value": "{spacing.6}", "type": "dimension" },
        "y": { "value": "{spacing.4}", "type": "dimension" }
      },
      "borderBottom": { "value": "{divider.default}", "type": "color" }
    },
    "footer": {
      "padding": { "value": "{spacing.4}", "type": "dimension" },
      "borderTop": { "value": "{divider.default}", "type": "color" },
      "gap": { "value": "{spacing.3}", "type": "dimension" }
    }
  }
}
```

---

## 🔍 Validation Results

### ✅ Correct Token Names
```
button.size.sm.padding.x
button.variant.primary.background.default
input.state.error.border
card.variant.elevated.shadow
text.heading.1.fontSize
navigation.item.color.active
modal.size.lg.width
```

### ❌ Incorrect Token Names (Avoid)
```
button-primary-bg         // Uses hyphens instead of dots
buttonSizeSm              // No hierarchy
btn.lg.pad                // Abbreviated names
primary_button_background // Underscores
$button-color             // Reserved prefix
button.bg.primary.hover   // Wrong hierarchy order
```

---

## 📊 Token Path Resolution Examples

### Example 1: Button Click State
```
User clicks primary button →
Token path: button.variant.primary.background.active
Resolves to: {brand.primary.darker}
Final value: #1e40af
```

### Example 2: Input Error State
```
Form validation fails →
Token path: input.state.error.border
Resolves to: {feedback.error}
Final value: #ef4444
```

### Example 3: Card Hover Effect
```
User hovers over card →
Token path: card.interactive.hover.shadow
Resolves to: {elevation.high}
Final value: 0 10px 25px rgba(0,0,0,0.1)
```

---

## 🎨 Component Implementation Examples

### Using Tokens in React Components

```jsx
// Button Component
const Button = ({ variant = 'primary', size = 'md', state = 'default' }) => {
  const styles = {
    height: `var(--button-size-${size}-height)`,
    paddingLeft: `var(--button-size-${size}-padding-x)`,
    paddingRight: `var(--button-size-${size}-padding-x)`,
    paddingTop: `var(--button-size-${size}-padding-y)`,
    paddingBottom: `var(--button-size-${size}-padding-y)`,
    backgroundColor: `var(--button-variant-${variant}-background-${state})`,
    color: `var(--button-variant-${variant}-text-${state})`,
    fontSize: `var(--button-size-${size}-fontSize)`,
  };
  
  return <button style={styles}>{children}</button>;
};
```

### Using Tokens in CSS

```css
.button {
  /* Size tokens */
  height: var(--button-size-md-height);
  padding: var(--button-size-md-padding-y) var(--button-size-md-padding-x);
  
  /* Variant tokens */
  background-color: var(--button-variant-primary-background-default);
  color: var(--button-variant-primary-text-default);
  
  /* State tokens */
  transition: all var(--motion-duration-fast) var(--motion-easing-inOut);
}

.button:hover {
  background-color: var(--button-variant-primary-background-hover);
}

.button:disabled {
  opacity: var(--button-state-disabled-opacity);
  cursor: var(--button-state-disabled-cursor);
}
```

---

## ✨ Advanced Token Patterns

### Responsive Tokens
```json
{
  "responsive": {
    "container": {
      "padding": {
        "mobile": { "value": "{spacing.4}", "type": "dimension" },
        "tablet": { "value": "{spacing.6}", "type": "dimension" },
        "desktop": { "value": "{spacing.8}", "type": "dimension" }
      }
    }
  }
}
```

### Compound Component Tokens
```json
{
  "formField": {
    "label": {
      "margin": {
        "bottom": { "value": "{spacing.2}", "type": "dimension" }
      }
    },
    "input": {
      "margin": {
        "bottom": { "value": "{spacing.1}", "type": "dimension" }
      }
    },
    "helper": {
      "margin": {
        "top": { "value": "{spacing.1}", "type": "dimension" }
      }
    },
    "error": {
      "color": { "value": "{feedback.error}", "type": "color" },
      "icon": {
        "size": { "value": "{iconSize.sm}", "type": "dimension" }
      }
    }
  }
}
```

### Theme-Specific Tokens
```json
{
  "theme": {
    "light": {
      "surface": {
        "default": { "value": "{color.white}", "type": "color" },
        "raised": { "value": "{color.gray.50}", "type": "color" }
      }
    },
    "dark": {
      "surface": {
        "default": { "value": "{color.gray.900}", "type": "color" },
        "raised": { "value": "{color.gray.800}", "type": "color" }
      }
    }
  }
}
```

---

## 📝 Summary

These examples demonstrate:
1. ✅ Consistent hierarchical structure
2. ✅ Clear property naming
3. ✅ Predictable state patterns
4. ✅ Scalable organization
5. ✅ W3C compliance
6. ✅ Easy CSS variable generation
7. ✅ Component implementation clarity

---

*Examples validated: October 2025*
*Token Convention v1.0*