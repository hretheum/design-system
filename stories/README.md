# Storybook Stories

This directory contains all Storybook stories organized using **Atomic Design** methodology.

## 📁 Structure

```
stories/
├── Atoms/              # 4 components - Basic building blocks
│   ├── Button.stories.jsx
│   ├── Badge.stories.jsx
│   ├── Spinner.stories.jsx
│   └── ProgressBar.stories.jsx
│
├── Molecules/          # 9 components - Simple combinations
│   ├── Input.stories.jsx
│   ├── Checkbox.stories.jsx
│   ├── Radio.stories.jsx
│   ├── Switch.stories.jsx
│   ├── Select.stories.jsx
│   ├── Textarea.stories.jsx
│   ├── Alert.stories.jsx
│   ├── Toast.stories.jsx
│   └── Tooltip.stories.jsx
│
├── Organisms/          # 10 components - Complex UI sections
│   ├── Card.stories.jsx
│   ├── Modal.stories.jsx
│   ├── Dropdown.stories.jsx
│   ├── Tabs.stories.jsx
│   ├── Breadcrumb.stories.jsx
│   ├── Pagination.stories.jsx
│   ├── Table.stories.jsx
│   ├── Stepper.stories.jsx
│   ├── Datepicker.stories.jsx
│   └── Wizard.stories.jsx
│
├── Templates/          # 1 guide - Best practices & patterns
│   └── Template.stories.jsx
│
├── ATOMIC_DESIGN.md    # Atomic Design methodology guide
├── README.md           # This file
└── tokens.css          # Design tokens CSS variables
```

## 🎯 Quick Reference

### Atoms (4)
Building blocks that can't be broken down further:
- Interactive elements
- Status indicators  
- Loading states

### Molecules (9)
Simple combinations of atoms:
- Form controls with labels
- Notifications with icons
- Tooltips with triggers

### Organisms (10)
Complex components and UI sections:
- Data display (Table, Card)
- Navigation (Tabs, Breadcrumb, Pagination)
- Overlays (Modal, Dropdown)
- Multi-step flows (Wizard, Stepper, Datepicker)

### Templates (1)
Layout structures and best practices guide

---

## 🚀 Getting Started

```bash
# Start Storybook
npm run storybook

# Run interaction tests
npm run test:storybook
```

Open [http://localhost:6006](http://localhost:6006)

---

## 📖 Documentation

- **[ATOMIC_DESIGN.md](./ATOMIC_DESIGN.md)** - Full Atomic Design guide
- **[Template.stories.jsx](./Templates/Template.stories.jsx)** - Story creation guide
- **[../TESTING.md](../TESTING.md)** - Testing guide
- **[../ACCESSIBILITY.md](../ACCESSIBILITY.md)** - Accessibility guide

---

## ✅ Component Checklist

Every story should include:

- [ ] **Multiple variants** (sizes, states, types)
- [ ] **Interactive examples** with hooks
- [ ] **Accessibility features** (ARIA, keyboard nav)
- [ ] **Documentation** (description, argTypes)
- [ ] **Interaction tests** (for key components)

See `Templates/Template.stories.jsx` for complete checklist.

---

**Total**: 23 stories | **Testing**: 5 with interaction tests | **WCAG**: 2.1 AA/AAA
