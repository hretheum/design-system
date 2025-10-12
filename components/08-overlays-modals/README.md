# 🎭 Overlays & Modals

## Definition
Components that appear above main content.

## Characteristics
- Overlay main content
- Higher z-index layer
- Often require interaction
- Can block main content
- Temporary or dismissible

## Qualification Test
> "Does it appear above other elements?"

## Components in this category

### ✅ Currently Implemented (3)
- **Modal** - Dialog overlay
- **Tooltip** - Hover information
- **Dropdown** - Overlay menu

### 🔜 Planned Components
- **Drawer/Sheet** - Slide-in panel
- **Popover** - Rich content tooltip
- **Context Menu** - Right-click menu
- **Lightbox** - Image/media overlay
- **Dialog** - Simple modal variant
- **Action Sheet** - Mobile action menu
- **Notification Drawer** - Notifications panel
- **Command Palette** - Quick actions overlay

## Usage Guidelines

### When to use
- Focus user attention
- Collect input without navigation
- Show additional information
- Provide quick actions
- Display media
- Confirmation dialogs

### Best Practices
1. **Clear dismiss method** - X button, escape, click outside
2. **Focus management** - Trap focus in modal
3. **Appropriate size** - Don't cover everything
4. **Smooth animations** - Entry/exit transitions
5. **Backdrop interaction** - Clear what's clickable
6. **Mobile adaptation** - Full screen on small devices

## Accessibility Requirements
- **Focus trap** - Keep focus within overlay
- **Focus return** - Return to trigger on close
- **Escape key** - Close on ESC
- **ARIA attributes** - role="dialog", aria-modal
- **Screen reader** - Announce overlay opening
- **Backdrop** - Prevent interaction with main content

## Token Structure
```json
{
  "overlays": {
    "[component]": {
      "size": { "sm", "md", "lg", "fullscreen" },
      "position": { "center", "top", "right", "bottom", "left" },
      "backdrop": { "transparent", "light", "dark", "blur" }
    }
  }
}
```

## Overlay Patterns
- **Modal** - Center, with backdrop
- **Drawer** - Slide from edge
- **Popover** - Anchored to element
- **Tooltip** - Small, hover triggered
- **Dropdown** - Below trigger
- **Context Menu** - At cursor position

## Z-Index Management
```json
{
  "zIndex": {
    "dropdown": 1000,
    "tooltip": 1100,
    "drawer": 1200,
    "modal": 1300,
    "notification": 1400
  }
}
```

## Related Categories
- **Actions & Controls** - Trigger elements
- **Feedback & Messaging** - Alert modals
- **Forms & Inputs** - Form modals