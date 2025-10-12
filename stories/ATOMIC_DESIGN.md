# Atomic Design Methodology

This Storybook is organized using **Atomic Design** principles, created by Brad Frost. This methodology provides a clear hierarchy for building design systems from smallest to largest components.

---

## 📚 Hierarchy

### **1. Atoms** (4 components)

**Definition**: The basic building blocks of our interface. Atoms are the smallest functional units that can't be broken down further without losing their purpose.

**Components**:
- **Button** - Primary interactive element
- **Badge** - Label for status/count indicators  
- **Spinner** - Loading indicator
- **ProgressBar** - Visual progress indicator

**Characteristics**:
- ✅ Single responsibility
- ✅ No dependencies on other components
- ✅ Highly reusable
- ✅ Minimal props
- ✅ Pure presentation

**Example**: A Button is an atom because it's a fundamental UI element that serves one purpose - being clicked.

---

### **2. Molecules** (9 components)

**Definition**: Simple groups of atoms functioning together as a unit. Molecules are relatively simple components made of 2-3 atoms.

**Components**:
- **Input** - Text input with label and validation
- **Checkbox** - Checkbox with label
- **Radio** - Radio button with label
- **Switch** - Toggle switch with label
- **Select** - Dropdown selector with options
- **Textarea** - Multi-line text input with label
- **Alert** - Icon + message + close button
- **Toast** - Notification with icon and message
- **Tooltip** - Trigger element + popup content

**Characteristics**:
- ✅ Composed of 2-3 atoms
- ✅ Single, well-defined purpose
- ✅ Self-contained functionality
- ✅ Reusable across contexts

**Example**: An Input molecule combines:
- Label (text atom)
- Input field (form atom)
- Error message (text atom)
- Help text (text atom)

---

### **3. Organisms** (10 components)

**Definition**: Complex UI components composed of groups of molecules and/or atoms. Organisms form distinct sections of an interface.

**Components**:
- **Card** - Container with header, content, and footer
- **Modal** - Overlay with backdrop and content sections
- **Dropdown** - Button trigger with menu of items
- **Tabs** - Tab list navigation with content panels
- **Breadcrumb** - Navigation trail with links
- **Pagination** - Page navigation controls
- **Table** - Data grid with headers, rows, sorting
- **Stepper** - Multi-step process indicator
- **Datepicker** - Calendar selector with input
- **Wizard** - Multi-step form with navigation

**Characteristics**:
- ✅ Composed of molecules and atoms
- ✅ Complex interactions
- ✅ Context-aware
- ✅ May manage state
- ✅ Specific use cases

**Example**: A Table organism combines:
- Headers (text atoms)
- Cells (text/button atoms)
- Checkboxes (molecules)
- Sorting controls (buttons)
- Pagination (organism)

---

### **4. Templates** (1 guide)

**Definition**: Page-level objects that place components into a layout and articulate the design's underlying content structure.

**Components**:
- **TemplateComponent** - Best practices guide and reference

**Characteristics**:
- ✅ Define page layouts
- ✅ Show component placement
- ✅ No real content (wireframe-like)
- ✅ Reusable page structures

---

### **5. Pages** (not yet implemented)

**Definition**: Specific instances of templates with real representative content. Pages are the highest level of fidelity.

**Future Work**:
- Login page
- Dashboard page
- User profile page
- Settings page
- etc.

---

## 🎯 Decision Guide

### When to create an Atom?

Ask yourself:
- Can this be broken down further? → If NO → Atom
- Does it serve a single, basic purpose? → If YES → Atom
- Is it used across many contexts? → If YES → Atom

Examples: Button, Icon, Label, Input field (without label)

### When to create a Molecule?

Ask yourself:
- Is this a combination of 2-3 atoms? → If YES → Molecule
- Does it have a single, clear purpose? → If YES → Molecule
- Can it exist independently? → If YES → Molecule

Examples: Search field (input + button), Form field (label + input + error)

### When to create an Organism?

Ask yourself:
- Is this a complex component with multiple parts? → If YES → Organism
- Does it combine multiple molecules? → If YES → Organism
- Is it a distinct section of UI? → If YES → Organism

Examples: Header, Footer, Product card, Data table

---

## 📊 Current Distribution

| Level | Count | Percentage |
|-------|-------|------------|
| **Atoms** | 4 | 17% |
| **Molecules** | 9 | 39% |
| **Organisms** | 10 | 44% |
| **Templates** | 1 | - |
| **Pages** | 0 | - |

**Total Components**: 23

---

## 🔄 Benefits of This Structure

### 1. **Scalability**
- Easy to add new components at the right level
- Clear hierarchy prevents chaos
- Reusability increases with proper organization

### 2. **Communication**
- Shared vocabulary between designers and developers
- Clear component classification
- Easier onboarding for new team members

### 3. **Consistency**
- Components built from same atoms look cohesive
- Design patterns emerge naturally
- Reduces duplication

### 4. **Testing**
- Test atoms once, trust in molecules
- Organisms tested for integration
- Clear test boundaries

### 5. **Documentation**
- Self-documenting structure
- Easy to find components
- Natural learning path (atoms → organisms)

---

## 📖 Resources

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Pattern Lab](https://patternlab.io/)
- [Thinking About React, Atomically](https://blog.usejournal.com/thinking-about-react-atomically-608c865d2262)

---

## 🚀 Adding New Components

### Step 1: Classify
Determine the atomic level:
- Single element? → **Atom**
- 2-3 atoms combined? → **Molecule**  
- Complex component? → **Organism**

### Step 2: Create
```bash
# Create in appropriate folder
touch stories/Atoms/NewAtom.stories.jsx
# or
touch stories/Molecules/NewMolecule.stories.jsx
# or
touch stories/Organisms/NewOrganism.stories.jsx
```

### Step 3: Set Title
```javascript
export default {
  title: 'Atoms/NewAtom',  // Match folder structure
  component: NewAtom,
  // ...
};
```

### Step 4: Follow Template
Use `Templates/Template.stories.jsx` as reference for:
- Story structure
- Accessibility features
- Documentation
- Best practices

---

**Last Updated**: October 2025  
**Storybook Version**: 9.1.10  
**Total Components**: 23 (4 Atoms + 9 Molecules + 10 Organisms + 1 Template)
