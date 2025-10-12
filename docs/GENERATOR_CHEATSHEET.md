# 🚀 Component Generator - Quick Reference

## Quick Start

### Interactive Generator (Recommended)
```bash
npm run generate
```
Follow the prompts to create a fully-configured component.

### Quick Generator (Fast)
```bash
npm run generate:quick -- ComponentName category
```

## Category Quick Reference

| Command | Creates component in... | Use for... |
|---------|------------------------|------------|
| `npm run generate:quick -- Button actions` | Actions & Controls | Buttons, Links, Menus |
| `npm run generate:quick -- Input forms` | Forms & Inputs | Inputs, Selects, Checkboxes |
| `npm run generate:quick -- Tabs navigation` | Navigation | Tabs, Breadcrumbs, Menus |
| `npm run generate:quick -- Table data` | Data Display | Tables, Lists, Trees |
| `npm run generate:quick -- Card containers` | Containers | Cards, Grids, Panels |
| `npm run generate:quick -- Alert feedback` | Feedback | Alerts, Toasts, Banners |
| `npm run generate:quick -- Spinner progress` | Progress | Spinners, Progress Bars |
| `npm run generate:quick -- Modal overlays` | Overlays | Modals, Tooltips, Popovers |
| `npm run generate:quick -- Badge badges` | Badges | Badges, Tags, Chips |
| `npm run generate:quick -- Avatar media` | Media | Avatars, Icons, Images |
| `npm run generate:quick -- Portal utilities` | Utilities | Helpers, Utilities |
| `npm run generate:quick -- Wizard patterns` | Patterns | Complex components |

## Common Examples

### Create a Button
```bash
npm run generate:quick -- Button actions
```

### Create a Form Input
```bash
npm run generate:quick -- EmailInput forms
```

### Create a Navigation Component
```bash
npm run generate:quick -- Sidebar navigation
```

### Create a Data Display Component
```bash
npm run generate:quick -- DataGrid data
```

### Create a Modal
```bash
npm run generate:quick -- ConfirmDialog overlays
```

## What Gets Generated?

```
components/[category]/[ComponentName]/
├── ComponentName.jsx         ✅ Component code
├── ComponentName.stories.jsx ✅ Storybook stories
├── ComponentName.test.js     ✅ Unit tests
├── ComponentName.tokens.json ✅ Design tokens
├── README.md                 ✅ Documentation
└── index.js                  ✅ Exports
```

## Category Decision Helper

Ask yourself: **"What does this component DO?"**

- **Triggers an action?** → `actions`
- **Collects user data?** → `forms`
- **Helps navigation?** → `navigation`
- **Shows data?** → `data`
- **Organizes layout?** → `containers`
- **Gives feedback?** → `feedback`
- **Shows progress?** → `progress`
- **Appears on top?** → `overlays`
- **Adds metadata?** → `badges`
- **Shows media?** → `media`
- **Helps other components?** → `utilities`
- **Complex pattern?** → `patterns`

## Interactive Generator Flow

```
1. Component name?      → Button
2. Description?         → Primary action trigger
3. Purpose?            → Trigger user actions
4. Category?           → [Choose from list]
5. Sizes?              → xs, sm, md, lg, xl
6. States?             → default, hover, disabled
7. Variants?           → primary, secondary
8. Has icons?          → Yes/No
9. Accessible?         → Yes
10. Generate tests?    → Yes
```

## Pro Tips

### 1. Use Interactive for New Components
```bash
npm run generate  # Guides you through everything
```

### 2. Use Quick for Prototyping
```bash
npm run generate:quick -- TestComponent forms  # Super fast
```

### 3. Check Generated Files
```bash
# After generation
cd components/[category]/[ComponentName]
ls -la  # See all generated files
```

### 4. Test Your Component
```bash
# See it in Storybook
npm run storybook
# Navigate to your component

# Run tests
npm test ComponentName
```

### 5. Category Shortcuts
Instead of full paths, use shortcuts:
- `actions` instead of `01-actions-controls`
- `forms` instead of `02-forms-inputs`
- `media` instead of `10-media-icons`

## Common Commands

```bash
# Generate component (interactive)
npm run generate

# Generate component (quick)
npm run generate:quick -- Name category

# See component in Storybook
npm run storybook

# Run tests
npm test

# List all components
ls -la components/*/

# Count components
find components -name "*.jsx" -not -path "*/node_modules/*" | wc -l
```

## Troubleshooting

### Component not showing in Storybook?
1. Restart Storybook: `npm run storybook`
2. Check file was created: `ls components/*/ComponentName/`

### Tests failing?
1. Check test file exists: `ComponentName.test.js`
2. Ensure component exports correctly

### Wrong category?
1. Move folder to correct category
2. Update story title in `.stories.jsx`
3. Update `category` parameter

## Need Help?

1. **Full Documentation**: [GENERATOR_GUIDE.md](./GENERATOR_GUIDE.md)
2. **Component Guidelines**: [COMPONENT_GUIDELINES.md](./COMPONENT_GUIDELINES.md)
3. **Ask Team**: Slack #design-system

---

*Quick Reference v1.0 | October 2025*