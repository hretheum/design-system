# 📚 Component Library - Functional Organization

## 🗂️ Component Categories

Our components are organized by **function and purpose**, not complexity. This makes it easier to find what you need based on what you want to accomplish.

## 📍 Quick Navigation

| Category | Purpose | Components | Status |
|----------|---------|------------|--------|
| [01. Actions & Controls](#01-actions--controls) | Trigger actions | Button, Link, Menu | 1/11 |
| [02. Forms & Inputs](#02-forms--inputs) | Collect user data | Input, Select, Checkbox | 7/21 |
| [03. Navigation & Wayfinding](#03-navigation--wayfinding) | Help users navigate | Tabs, Breadcrumb, Menu | 4/12 |
| [04. Data Display & Tables](#04-data-display--tables) | Show organized data | Table, List, Tree View | 1/11 |
| [05. Containers & Layout](#05-containers--layout) | Organize content | Card, Grid, Accordion | 1/12 |
| [06. Feedback & Messaging](#06-feedback--messaging) | System feedback | Alert, Toast, Banner | 2/10 |
| [07. Progress & Loading](#07-progress--loading) | Show progress | Spinner, Progress Bar | 2/10 |
| [08. Overlays & Modals](#08-overlays--modals) | Above main content | Modal, Drawer, Popover | 3/11 |
| [09. Badges & Labels](#09-badges--labels) | Add context | Badge, Tag, Chip | 1/9 |
| [10. Media & Icons](#10-media--icons) | Visual content | Avatar, Icon, Image | 0/10 |
| [11. Utilities & Helpers](#11-utilities--helpers) | Support components | Focus Trap, Portal | 0/10 |
| [12. Patterns & Composed](#12-patterns--composed) | Complex patterns | Wizard, Search, Forms | 2/12 |

**Total Progress: 24/129 components (19%)**

---

## 🔍 How to Find Components

### "I need to..."

- **...trigger an action** → [Actions & Controls](./01-actions-controls)
- **...collect user input** → [Forms & Inputs](./02-forms-inputs)
- **...help users navigate** → [Navigation & Wayfinding](./03-navigation-wayfinding)
- **...display data** → [Data Display & Tables](./04-data-display-tables)
- **...organize layout** → [Containers & Layout](./05-containers-layout)
- **...show feedback** → [Feedback & Messaging](./06-feedback-messaging)
- **...indicate loading** → [Progress & Loading](./07-progress-loading)
- **...show content above** → [Overlays & Modals](./08-overlays-modals)
- **...add metadata** → [Badges & Labels](./09-badges-labels)
- **...display images** → [Media & Icons](./10-media-icons)
- **...improve accessibility** → [Utilities & Helpers](./11-utilities-helpers)
- **...use a pattern** → [Patterns & Composed](./12-patterns-composed)

---

## 📂 Category Details

### 01. Actions & Controls
**Purpose**: Components that trigger actions or control interface behavior.

**Components**: Button, Link, Icon Button, Split Button, Button Group, Menu Item, Action Menu, Toolbar, Command Palette, FAB, Keyboard Shortcut

**Test**: *"Does clicking/interacting cause an action or change?"*

---

### 02. Forms & Inputs
**Purpose**: Components for collecting and modifying user data.

**Components**: Input, Textarea, Select, Checkbox, Radio, Switch, Date Picker, Time Picker, File Upload, Slider, Color Picker, Search, Number Input, Password, Rich Text Editor, Autocomplete, Tags Input, Form, Phone Input, Currency Input, Pin Input

**Test**: *"Does the component collect or modify user data?"*

---

### 03. Navigation & Wayfinding
**Purpose**: Components that help users orient and move through the application.

**Components**: Navigation Bar, Sidebar, Tabs, Breadcrumb, Pagination, Menu, Stepper, Progress Steps, Skip Link, Table of Contents, Jump Links, Back to Top

**Test**: *"Does it help users know where they are or where they can go?"*

---

### 04. Data Display & Tables
**Purpose**: Components for presenting organized data and information.

**Components**: Table, Data Table, List, Tree View, Timeline, Calendar View, Kanban Board, Gallery, Data Grid, Comparison Table, Description List

**Test**: *"Is the main purpose to present organized data?"*

---

### 05. Containers & Layout
**Purpose**: Components that organize space and group content.

**Components**: Card, Panel, Accordion, Grid, Stack, Divider, Section, Layout Templates, Split View, Flex Container, Aspect Ratio Box, Collapsible

**Test**: *"Is the main role to organize other elements?"*

---

### 06. Feedback & Messaging
**Purpose**: Components that communicate system state and feedback.

**Components**: Alert, Toast, Banner, Notification, Message, Status Indicator, Empty State, Error Message, Success Message, Inline Message

**Test**: *"Does it inform users about state or outcome?"*

---

### 07. Progress & Loading
**Purpose**: Components showing operation progress or loading states.

**Components**: Progress Bar, Spinner, Progress Circle, Skeleton, Progress Steps, Loading Overlay, Busy Indicator, Progress Ring, Shimmer, Loading Dots

**Test**: *"Does it show something is happening or how much is left?"*

---

### 08. Overlays & Modals
**Purpose**: Components that appear above main content.

**Components**: Modal, Drawer, Popover, Tooltip, Dropdown, Context Menu, Lightbox, Dialog, Action Sheet, Notification Drawer, Command Palette

**Test**: *"Does it appear above other elements?"*

---

### 09. Badges & Labels
**Purpose**: Components that add context or metadata.

**Components**: Badge, Tag, Chip, Chip Group, Label, Label Group, Status Badge, Pill, Count Indicator

**Test**: *"Does it add additional context to other elements?"*

---

### 10. Media & Icons
**Purpose**: Components for displaying visual content.

**Components**: Avatar, Avatar Group, Icon, Image, Video Player, Audio Player, Gallery, Carousel, Logo, Thumbnail

**Test**: *"Is the main purpose to display visual content?"*

---

### 11. Utilities & Helpers
**Purpose**: Components that support other components or functions.

**Components**: Visually Hidden, Skip Link, Focus Trap, Portal, Transition, Resize Observer, Click Outside, Scroll Lock, Intersection Observer, Copy to Clipboard

**Test**: *"Does it support other components without its own UI?"*

---

### 12. Patterns & Composed
**Purpose**: Complex UI patterns composed of multiple components.

**Components**: Wizard, Search with Filters, Date Range Picker, Login Form, Comment Thread, Product Card, User Profile, Dashboard Widget, File Manager, Checkout Flow, Data Export, Template

**Test**: *"Is it a pattern composed of other components?"*

---

## 🚀 Getting Started

### Using a Component

```javascript
// Import from category
import { Button } from '@design-system/actions-controls';
import { Input } from '@design-system/forms-inputs';
import { Card } from '@design-system/containers-layout';

// Or import from main bundle
import { Button, Input, Card } from '@design-system/components';
```

### Component Structure

Each component follows this structure:
```
components/
├── [category]/
│   ├── [ComponentName]/
│   │   ├── Component.jsx       # Component implementation
│   │   ├── Component.stories.jsx  # Storybook stories
│   │   ├── Component.test.js      # Unit tests
│   │   ├── Component.tokens.json  # Component tokens
│   │   ├── README.md             # Component documentation
│   │   └── index.js              # Exports
│   └── README.md                 # Category documentation
```

---

## 📖 Documentation

- **[Storybook](http://localhost:6006)** - Interactive component demos
- **[Design Tokens](../tokens)** - Token documentation
- **[Contributing](../CONTRIBUTING.md)** - How to add components
- **[Migration Guide](./MIGRATION.md)** - From Atomic to Functional

---

## 🔄 Migration Status

We are migrating from Atomic Design to Functional Categories:

| Old Structure | New Structure | Status |
|--------------|---------------|---------|
| Atoms/Button | 01-actions-controls/Button | ✅ |
| Molecules/Input | 02-forms-inputs/Input | ✅ |
| Organisms/Modal | 08-overlays-modals/Modal | ✅ |
| ... | ... | 🔄 |

See [MIGRATION.md](./MIGRATION.md) for details.

---

## 📊 Component Metrics

| Metric | Current | Target | Progress |
|--------|---------|--------|----------|
| Total Components | 24 | 129 | 19% |
| Categories Complete | 0 | 12 | 0% |
| Test Coverage | 85% | >90% | ⚠️ |
| A11y Compliance | 100% | 100% | ✅ |
| Documentation | 60% | 100% | ⚠️ |

---

## 🤝 Contributing

1. Check the category README for guidelines
2. Use the component template
3. Include tests and stories
4. Update documentation
5. Follow accessibility standards

See [CONTRIBUTING.md](../CONTRIBUTING.md) for full guidelines.

---

*Last Updated: October 2025*
*Version: 2.0.0 (Functional Categories)*