# Accessibility Guide

> WCAG 2.1 Level AA/AAA Compliance Documentation

## 🎯 Overview

This design system is built with accessibility as a core principle, ensuring compliance with:
- **WCAG 2.1 Level AA** (minimum)
- **WCAG 2.1 Level AAA** (where possible)
- **ADA** (Americans with Disabilities Act)
- **Section 508** compliance

## 📊 Contrast Ratios

### Text Contrast

#### WCAG AA (Minimum)
```javascript
import { accessibility } from './accessibility.json';

// Normal text (16px): 4.5:1 minimum
const textAA = accessibility.contrast.text.aa.normal.onLight.value;

// Large text (18pt+/24px+): 3:1 minimum
const largeTextAA = accessibility.contrast.text.aa.large.onLight.value;
```

#### WCAG AAA (Enhanced)
```javascript
// Normal text: 7:1 minimum
const textAAA = accessibility.contrast.text.aaa.normal.onLight.value;

// Large text: 4.5:1 minimum
const largeTextAAA = accessibility.contrast.text.aaa.large.onLight.value;
```

### Interactive Elements
```javascript
// UI components: 3:1 minimum (WCAG 2.1)
const interactiveContrast = accessibility.contrast.interactive.minimum.value; // "3:1"
```

### Tested Color Pairs

✅ **Passing AA**
- `{neutral.900}` on `{neutral.0}` — 21:1
- `{brand.primary}` on `{neutral.0}` — 8.2:1
- `{feedback.error}` on `{neutral.0}` — 5.1:1

✅ **Passing AAA**
- `{neutral.950}` on `{neutral.0}` — 21:1
- `{neutral.800}` on `{neutral.0}` — 12:1

---

## 🎯 Touch Targets

### Mobile (WCAG 2.5.5 Level AAA)
```javascript
import { component } from './component.json';

const minTouchTarget = component.accessible.button.minHeight.mobile.value; // "44px"
```

**Requirement**: Minimum 44×44px for all interactive elements.

✅ **Compliant components**:
- Button (all sizes ≥ 44px on mobile)
- Input fields
- Checkboxes (24px + padding)
- Radio buttons (24px + padding)
- Links with padding
- Icons (clickable: 24px minimum)

### Desktop (WCAG 2.5.5 Level AA)
```javascript
const minClickTarget = component.accessible.button.minHeight.desktop.value; // "24px"
```

**Requirement**: Minimum 24×24px for all interactive elements.

---

## 👁️ Focus Indicators

### Standard Focus (WCAG 2.4.7)
```css
button:focus-visible {
  outline: var(--accessibility-focus-visible-outline-width) solid 
           var(--accessibility-focus-visible-color-default);
  outline-offset: var(--accessibility-focus-visible-outline-offset);
}
```

**Requirements**:
- ✅ Minimum 2px width
- ✅ 3:1 contrast with background
- ✅ 2px offset from element

### Keyboard-Only Focus
```css
button:focus-visible:not(:active) {
  outline: var(--accessibility-focus-keyboard-width) dashed 
           var(--semantic-accessible-focus-keyboard-color);
}
```

**Enhanced for keyboard users**: 3px dashed outline.

---

## ♿ Motion & Animation

### Respecting `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: var(--accessibility-motion-reduced-duration) !important; /* 0ms */
    transition-duration: var(--accessibility-motion-reduced-duration) !important;
  }
}
```

### Safe Animation Limits
```javascript
// Maximum safe movement
const maxDistance = accessibility.motion.safe.maxDistance.value; // "100px"

// Maximum safe rotation
const maxRotation = accessibility.motion.safe.maxRotation.value; // "45deg"
```

**WCAG 2.3.3**: Avoid excessive motion that could trigger vestibular disorders.

---

## 🔗 Links & Navigation

### Link Underlines (WCAG 1.4.1)
```css
a {
  text-decoration: underline;
  text-decoration-thickness: var(--accessibility-link-underline-thickness); /* 2px */
  text-underline-offset: var(--accessibility-link-underline-offset); /* 2px */
}

a:hover {
  text-decoration-thickness: var(--component-accessible-link-underline-hover); /* 3px */
}
```

**Requirement**: Links must be distinguishable from text without relying on color alone.

### Skip Links
```jsx
import { accessibility } from './accessibility.json';

const SkipLink = () => (
  <a 
    href="#main-content"
    className="skip-link"
    style={{
      position: 'absolute',
      top: accessibility.skipLink.position.hidden.value.top,
      left: accessibility.skipLink.position.hidden.value.left,
      zIndex: accessibility.skipLink.zIndex.value
    }}
  >
    Skip to main content
  </a>
);
```

```css
.skip-link:focus {
  top: var(--accessibility-skipLink-position-visible-top);
  left: var(--accessibility-skipLink-position-visible-left);
}
```

**WCAG 2.4.1**: Provide bypass mechanism for repetitive content.

---

## 📝 Forms

### Labels (WCAG 3.3.2)
```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: component.accessible.input.label.gap.value }}>
  <label htmlFor="email">Email Address *</label>
  <input 
    id="email" 
    type="email"
    aria-required="true"
    aria-describedby="email-error"
  />
  <span id="email-error" role="alert">
    {error}
  </span>
</div>
```

### Error Messages
```javascript
// Reserve space to prevent layout shift
const errorHeight = component.accessible.form.errorMessage.minHeight.value; // "24px"
```

### Required Fields
```jsx
<label>
  Username
  <span 
    aria-label="required"
    style={{
      color: 'var(--feedback-error)',
      marginLeft: 'var(--component-accessible-form-requiredIndicator-spacing)'
    }}
  >
    *
  </span>
</label>
```

---

## 🖥️ Screen Readers

### Visually Hidden Utility
```css
.sr-only {
  position: var(--accessibility-visuallyHidden-position);
  width: var(--accessibility-visuallyHidden-width);
  height: var(--accessibility-visuallyHidden-height);
  margin: var(--accessibility-visuallyHidden-margin);
  padding: var(--accessibility-visuallyHidden-padding);
  overflow: var(--accessibility-visuallyHidden-overflow);
  clip: var(--accessibility-visuallyHidden-clip);
  white-space: var(--accessibility-visuallyHidden-whiteSpace);
  border: var(--accessibility-visuallyHidden-border);
}
```

**Usage**:
```jsx
<button>
  <IconTrash />
  <span className="sr-only">Delete item</span>
</button>
```

### ARIA Live Regions
```jsx
<div 
  role="status" 
  aria-live="polite"
  aria-atomic="true"
>
  {successMessage}
</div>

<div 
  role="alert" 
  aria-live="assertive"
>
  {errorMessage}
</div>
```

---

## 🌓 High Contrast Mode

### Windows High Contrast
```css
@media (prefers-contrast: high) {
  .button {
    border: var(--accessibility-highContrast-border-width) solid 
            var(--accessibility-highContrast-border-color-light);
  }
  
  .text {
    color: var(--accessibility-highContrast-text-default);
  }
}
```

### Theme Support
```javascript
import { theme } from './theme.json';

// High contrast light mode
const hcLightBg = theme.highContrast.light.surface.default.value; // "#FFFFFF"
const hcLightText = theme.highContrast.light.content.primary.value; // "#000000"

// High contrast dark mode
const hcDarkBg = theme.highContrast.dark.surface.default.value; // "#000000"
const hcDarkText = theme.highContrast.dark.content.primary.value; // "#FFFFFF"
```

---

## 📏 Typography

### Minimum Font Sizes (WCAG 1.4.4)
```javascript
const minBodySize = accessibility.text.size.minimum.value; // "16px"
const minMobileSize = accessibility.text.size.minimumMobile.value; // "14px"
```

### Line Height (WCAG 1.4.8)
```javascript
const minLineHeight = accessibility.text.lineHeight.minimum.value; // 1.5
const recommendedLineHeight = accessibility.text.lineHeight.recommended.value; // 1.6
```

### Paragraph Spacing (WCAG 1.4.8)
```javascript
const minParagraphSpacing = accessibility.text.paragraphSpacing.minimum.value; // "2em"
```

---

## ✅ Testing Checklist

### Automated Tests
- [ ] Contrast ratios (use `npm run test:contrast`)
- [ ] Touch target sizes
- [ ] Focus indicators visibility
- [ ] ARIA attributes validation

### Manual Tests
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Space, Arrows)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Zoom to 200% (WCAG 1.4.4)
- [ ] High contrast mode
- [ ] Motion reduction

### Browser Testing
- [ ] Chrome + ChromeVox
- [ ] Firefox
- [ ] Safari + VoiceOver (macOS/iOS)
- [ ] Edge + Narrator (Windows)

---

## 🔧 Quick Fixes

### Low Contrast Text
```javascript
// ❌ Before
color: var(--neutral-400); // Too light

// ✅ After
color: var(--accessibility-contrast-text-aa-normal-onLight); // 4.5:1
```

### Small Touch Targets
```css
/* ❌ Before */
.icon-button {
  width: 20px;
  height: 20px;
}

/* ✅ After */
.icon-button {
  width: var(--component-accessible-button-minWidth-mobile); /* 44px */
  height: var(--component-accessible-button-minHeight-mobile);
}
```

### Missing Focus Indicator
```css
/* ❌ Before */
button:focus {
  outline: none; /* Never do this! */
}

/* ✅ After */
button:focus-visible {
  outline: var(--accessibility-focus-visible-outline-width) solid 
           var(--accessibility-focus-visible-color-default);
  outline-offset: var(--accessibility-focus-visible-outline-offset);
}
```

---

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## 🆘 Support

For accessibility questions or issues:
1. Check this documentation first
2. Run automated tests: `npm run test:a11y`
3. Open an issue on GitHub with `[a11y]` tag
