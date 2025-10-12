# 📝 Forms & Inputs

## Definition
Components for collecting data from users.

## Characteristics
- Accept user input
- Have validation capabilities
- Return values
- Support various data types
- Provide feedback on input

## Qualification Test
> "Does the component collect or modify user data?"

## Components in this category

### ✅ Currently Implemented (7)
- **Input** - Text input field
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection
- **Checkbox** - Multiple choice selection
- **Radio** - Single choice selection
- **Switch** - Binary toggle
- **Datepicker** - Date selection

### 🔜 Planned Components
- **File Upload** - File selection and upload
- **Slider/Range** - Value selection within range
- **Color Picker** - Color value selection
- **Search Input** - Specialized text search
- **Number Input** - Numeric value input
- **Pin Input** - Secure code entry
- **Form** - Form wrapper with validation
- **Time Picker** - Time selection
- **Password Input** - Secure text entry
- **Rich Text Editor** - Formatted text input
- **Autocomplete** - Predictive text input
- **Tags Input** - Multiple tag entry
- **Phone Input** - Phone number formatting
- **Currency Input** - Monetary value input

## Usage Guidelines

### When to use
- Collecting user information
- Setting preferences
- Filtering/searching data
- Configuration settings
- User authentication

### Best Practices
1. **Clear labels** - Every input needs a label
2. **Helpful placeholders** - Example of expected input
3. **Input validation** - Real-time and on-submit
4. **Error messages** - Clear, actionable feedback
5. **Required indicators** - Mark mandatory fields
6. **Appropriate input types** - Match input to data type

## Accessibility Requirements
- **Label association** - Proper label-input pairing
- **Error announcements** - Screen reader friendly errors
- **Keyboard operation** - Full keyboard support
- **Focus management** - Logical tab order
- **ARIA attributes** - aria-required, aria-invalid, aria-describedby
- **Minimum height** - 44px (mobile), 36px (desktop)

## Token Structure
```json
{
  "forms": {
    "[component]": {
      "size": { "sm", "md", "lg" },
      "state": { "default", "hover", "focus", "disabled", "error", "success" },
      "variant": { "outlined", "filled", "borderless" }
    }
  }
}
```

## Validation Patterns
- **Required** - Field must have value
- **Pattern** - Regex validation
- **Length** - Min/max character limits
- **Type** - Email, URL, number formats
- **Custom** - Business logic validation

## Related Categories
- **Actions & Controls** - Form submission buttons
- **Feedback & Messaging** - Validation messages
- **Progress & Loading** - Async validation indicators