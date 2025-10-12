# 💬 Feedback & Messaging

## Definition
Components that communicate system state and feedback to users.

## Characteristics
- Inform about state changes
- Confirm user actions
- Warn about issues
- Provide system feedback
- Guide user behavior

## Qualification Test
> "Does it inform users about state or outcome?"

## Components in this category

### ✅ Currently Implemented (2)
- **Alert** - Important messages
- **Toast** - Temporary notifications

### 🔜 Planned Components
- **Banner** - Page-level messages
- **Notification** - System notifications
- **Message** - Inline messages
- **Status Indicator** - State indicators
- **Empty State** - No content messaging
- **Error Message** - Form/field errors
- **Success Message** - Positive feedback
- **Inline Message** - Contextual messages

## Usage Guidelines

### When to use
- System state changes
- User action confirmation
- Error conditions
- Warning situations
- Success feedback
- Informational updates

### Best Practices
1. **Clear messaging** - Concise, actionable text
2. **Appropriate severity** - Match urgency level
3. **Timely display** - Show immediately
4. **Dismissible when appropriate** - User control
5. **Actionable feedback** - Include next steps

## Accessibility Requirements
- **Role attributes** - alert, status, log
- **Live regions** - aria-live for updates
- **Color not sole indicator** - Icons + text
- **Screen reader** - Announce important messages
- **Focus management** - Don't steal focus
- **Timeout considerations** - Sufficient reading time

## Token Structure
```json
{
  "feedback": {
    "[component]": {
      "severity": { "info", "success", "warning", "error" },
      "variant": { "filled", "outlined", "standard" },
      "size": { "sm", "md", "lg" }
    }
  }
}
```

## Message Types
- **Info** - Neutral information
- **Success** - Positive outcomes
- **Warning** - Potential issues
- **Error** - Problems requiring action
- **Neutral** - General messages

## Timing Patterns
- **Persistent** - Remains until dismissed
- **Temporary** - Auto-dismiss after delay
- **Progressive** - Updates over time
- **Queued** - Multiple messages in sequence

## Related Categories
- **Forms & Inputs** - Validation messages
- **Overlays & Modals** - Modal alerts
- **Actions & Controls** - Dismiss actions