# Pełne zestawienie komponentów w design systemach

## Metodologia

To zestawienie zawiera kompletną listę komponentów z 11 porównywanych design systemów:
1. IBM Carbon
2. Shopify Polaris
3. Atlassian Design System
4. Google Material 3
5. Apple HIG (Human Interface Guidelines)
6. Microsoft Fluent 2
7. Salesforce Lightning Design System
8. Adobe Spectrum
9. Ant Design
10. Base Web (Uber)
11. PatternFly Elements

Komponenty są kategoryzowane według struktury Atomic Design:
- **Atomy**: Podstawowe elementy interfejsu (Button, Input, Icon, itd.)
- **Molekuły**: Kombinacje atomów tworzące prostsze komponenty (Card, Modal, Tooltip, itd.)
- **Organizmy**: Złożone komponenty składające się z wielu molekuł (Header, Sidebar, Data Table, itd.)

## Data aktualizacji
Październik 2025

---

## SHOPIFY POLARIS - Lista komponentów

### Actions
1. Account connection
2. Button (5 wariantów: plain, primary, secondary, tertiary, monochromePlain)
3. Button group

### Layout and structure
4. Bleed
5. Block stack
6. Box
7. Callout card
8. Card
9. Divider
10. Empty state
11. Form layout
12. Grid
13. Inline grid
14. Inline stack
15. Layout
16. Media card
17. Page

### Selection and input
18. Autocomplete
19. Checkbox
20. Choice list
21. Color picker
22. Combobox
23. Date picker
24. Drop zone
25. Filters
26. Form
27. Index filters
28. Inline error
29. Radio button
30. Range slider
31. Select
32. Tag
33. Text field

### Images and icons
34. Avatar
35. Icon
36. Keyboard key
37. Thumbnail
38. Video thumbnail

### Feedback indicators
39. Badge
40. Banner
41. Exception list
42. Progress bar
43. Skeleton body text
44. Skeleton display text
45. Skeleton page
46. Skeleton tabs
47. Skeleton thumbnail
48. Spinner

### Typography
(Pojedyncze komponenty do typografii)

### Tables
49. Data table
50. Index table

### Lists
51. Action list
52. Description list
53. List
54. Listbox
55. Option list
56. Resource item
57. Resource list

### Navigation
58. Footer help
59. Link
60. Pagination
61. Tabs

### Overlays
62. Popover
63. Tooltip

### Utilities
64. App provider
65. Collapsible
66. Scrollable

### Deprecated (zachowane dla kompatybilności)
67. Caption
68. Contextual save bar
69. Display text
70. Frame
71. Fullscreen bar
72. Heading
73. Legacy card
74. Legacy filters
75. Legacy stack
76. Legacy tabs
77. Loading
78. Modal
79. Navigation
80. Page actions
81. Setting toggle
82. Sheet
83. Subheading
84. Text container
85. Text style
86. Toast
87. Top bar
88. Visually hidden

**ŁĄCZNIE POLARIS: ~88 komponentów** (w tym deprecated)


---

## GOOGLE MATERIAL DESIGN 3 - Lista komponentów

### Buttons
1. Button (5 typów: Elevated, Filled, Filled tonal, Outlined, Text)
2. Extended FAB
3. FAB (Floating Action Button)
4. Icon button
5. Segmented button

### Inputs
6. Checkbox
7. Chips
8. Date pickers
9. Menus
10. Radio button
11. Sliders
12. Switch
13. Text fields

### Cards & Sheets
14. Bottom sheets
15. Cards
16. Carousel
17. Dialogs
18. Side sheets

### Navigation
19. Navigation bar
20. Navigation drawer
21. Navigation rail
22. Search
23. Tabs
24. Top app bar

### Lists & Tables
25. Lists
26. Data tables

### Progress & Information
27. Progress indicators
28. Snackbar
29. Badges
30. Tooltips

### Dividers & Spacing
31. Dividers

**ŁĄCZNIE MATERIAL 3: ~31 komponentów**

---

## IBM CARBON - Lista komponentów

### Atomy (Podstawowe elementy)
1. Button (5 wariantów: primary, secondary, tertiary, ghost, danger)
2. Checkbox
3. Radio button
4. Text input
5. Text area
6. Select / Dropdown
7. Slider
8. Switch / Toggle
9. Date picker
10. File uploader
11. Icon
12. Avatar
13. Badge
14. Tag
15. Progress indicator (spinner / bar)

### Molekuły (Komponenty złożone)
16. Accordion
17. Breadcrumb
18. Card
19. Modal / Dialog
20. Tabs
21. Tooltip / Popover
22. Alert / Notification / Toast
23. Pagination
24. Table / Data table
25. List
26. Structured list
27. Menu / Dropdown menu

### Organizmy (Złożone struktury)
28. Drawer / Side navigation
29. Carousel
30. Stepper / Progress Steps
31. UI Shell (Header)
32. Search
33. Loading

**ŁĄCZNIE CARBON: ~33+ komponentów**


## ATLASSIAN DESIGN SYSTEM - Lista komponentów

### Forms and inputs
1. Button (6 rodzajów: button, icon button, link button, link icon button, split button, button group)
2. Calendar
3. Checkbox
4. Comment
5. Date time picker
6. Dropdown menu
7. Focus ring
8. Form
9. Radio
10. Range
11. Select
12. Text area
13. Text field
14. Toggle

### Images and icons
15. Avatar
16. Avatar group
17. Icon
18. Icon object
19. Image
20. Logo

### Layout and structure
21. Layout grid
22. Page (deprecated)
23. Page header
24. Page layout

### Messaging
25. Banner
26. Flag
27. Inline message
28. Modal dialog
29. Onboarding (spotlight)
30. Section message

### Navigation
31. Atlassian navigation
32. Breadcrumbs
33. Link
34. Menu
35. Navigation system
36. Pagination
37. Side navigation
38. Tabs

### Overlays and layering
39. Blanket
40. Drawer
41. Inline dialog
42. Popup
43. Tooltip

### Status indicators
44. Badge
45. Empty state
46. Lozenge
47. Progress indicator
48. Progress tracker
49. Tag
50. Tag group

### Text and data display
51. Code
52. Dynamic table
53. Heading
54. Inline edit
55. Table
56. Table tree
57. Visually hidden

### Primitives (niskie poziomy budowania)
58. Box
59. Pressable
60. Anchor
61. Inline
62. Stack
63. Flex
64. Grid
65. Bleed
66. XCSS
67. Responsive
68. Text
69. MetricText
70. Focusable

### Libraries & Tools
71. CSS
72. CSS reset
73. Design tokens
74. Motion
75. Popper
76. Portal
77. Pragmatic drag and drop
78. App provider
79. ESLint plugin
80. Storybook addon
81. Stylelint plugin

**ŁĄCZNIE ATLASSIAN: ~81 komponentów (włączając biblioteki i narzędzia)**


## ANT DESIGN - Lista komponentów

### General
1. Button (5 typów: Primary, Default, Dashed, Text, Link + właściwości danger i ghost)
2. FloatButton
3. Icon
4. Typography

### Layout
5. Divider
6. Flex
7. Grid
8. Layout
9. Space
10. Splitter

### Navigation
11. Anchor
12. Breadcrumb
13. Dropdown
14. Menu
15. Pagination
16. Steps
17. Tabs

### Data Entry (Formularze)
18. AutoComplete
19. Cascader
20. Checkbox
21. ColorPicker
22. DatePicker
23. Form
24. Input
25. InputNumber
26. Mentions
27. Radio
28. Rate
29. Select
30. Slider
31. Switch
32. TimePicker
33. Transfer
34. TreeSelect
35. Upload

### Data Display
36. Avatar
37. Badge
38. Calendar
39. Card
40. Carousel
41. Collapse
42. Descriptions
43. Empty
44. Image
45. List
46. Popover
47. QRCode
48. Segmented
49. Statistic
50. Table
51. Tag
52. Timeline
53. Tooltip
54. Tour
55. Tree

### Feedback
56. Alert
57. Drawer
58. Message
59. Modal
60. Notification
61. Popconfirm
62. Progress
63. Result
64. Skeleton
65. Spin

### Other
66. Affix (v4)
67. BackTop
68. ConfigProvider
69. Watermark
70. App

**ŁĄCZNIE ANT DESIGN: ~70 komponentów**


## MICROSOFT FLUENT 2 - Lista komponentów

1. Accordion
2. Avatar
3. Avatar group
4. Badge
5. Breadcrumb
6. Button (4 typy: standard, split, menu, compound + toggle)
7. Card
8. Carousel
9. Checkbox
10. Combobox
11. Dialog
12. Divider
13. Drawer
14. Dropdown
15. Field
16. Fluent provider
17. Icon
18. Image
19. Info label
20. Input
21. Label
22. Link
23. List
24. Menu
25. Message bar
26. Nav
27. Persona
28. Popover
29. Progress bar
30. Radio group
31. Rating
32. Searchbox
33. Select
34. Skeleton
35. Slider
36. Spin button
37. Spinner
38. Switch
39. Tablist
40. Tag
41. Tag picker
42. Text
43. Textarea
44. Toast
45. Toolbar
46. Tooltip
47. Tree

**ŁĄCZNIE MICROSOFT FLUENT 2: ~47 komponentów**


## ADOBE SPECTRUM - Lista komponentów

### Z packages GitHub i React Spectrum
1. Accordion
2. Action Button
3. Action Group
4. Alert Dialog
5. Avatar
6. Badge
7. Breadcrumbs
8. Button
9. Button Group
10. Calendar
11. Card
12. Checkbox
13. Checkbox Group
14. Color Area
15. Color Field
16. Color Picker
17. Color Slider
18. Color Swatch
19. Color Wheel
20. Combobox
21. Contextual Help
22. Date Field
23. Date Picker
24. Date Range Picker
25. Dialog
26. DialogContainer
27. Divider
28. Dropdown (Menu)
29. Field Label
30. File Trigger
31. Form
32. Icons
33. Image
34. ListView
35. Menu
36. Meter
37. Modal
38. Number Field
39. Picker
40. Popover
41. Progress Bar
42. Progress Circle
43. Radio
44. Radio Group
45. Range Calendar
46. Search
47. Search Field
48. Slider
49. Switch
50. Swatch
51. Tabs
52. Tag
53. Tag Group
54. Text
55. Text Area
56. Text Field
57. Time Field
58. Toggle Button
59. Tooltip
60. Well

**ŁĄCZNIE ADOBE SPECTRUM: ~60+ komponentów**


---

## APPLE HUMAN INTERFACE GUIDELINES - Lista komponentów

### iOS/iPadOS/macOS Components
1. Activity indicators
2. Alerts
3. App shortcuts
4. Buttons
5. Charts
6. Collections
7. Color wells (macOS)
8. Context menus
9. Date pickers
10. Disclosure indicators
11. Disclosure controls
12. Edit menus
13. Gauges
14. Groups (macOS)
15. Help tags (macOS)
16. Image wells (macOS)
17. Inline predictions (macOS)
18. Labels
19. Link buttons
20. Lists and tables
21. Live Activities
22. Lockups
23. Maps
24. Menus
25. Navigation bars
26. Outline views (macOS)
27. Page controls
28. Path controls (macOS)
29. Pickers
30. Popovers
31. Progress indicators
32. Pull-down buttons
33. Pull-down menus
34. Radio buttons
35. Refresh content controls
36. Scope bars (macOS)
37. Scroll views
38. Search fields
39. Segmented controls
40. Settings
41. Sheets
42. Sidebars
43. Sliders
44. Split views
45. Steppers
46. System experiences (iOS)
47. Tab bars/Tab views
48. Text fields
49. Text views
50. Toggle/Switch
51. Toolbars
52. Web views

**ŁĄCZNIE APPLE HIG: ~52 komponentów**


---

## SALESFORCE LIGHTNING DESIGN SYSTEM - Lista komponentów

### Base Components
1. Accordion
2. Activity timeline
3. Alert
4. App launcher
5. Avatar
6. Avatar group
7. Badge
8. Brand band
9. Breadcrumbs
10. Builder header
11. Button
12. Button groups
13. Button icons
14. Cards
15. Carousel
16. Chat
17. Checkbox
18. Checkbox button
19. Checkbox button group
20. Checkbox group
21. Checkbox toggle
22. Color picker
23. Combobox
24. Data tables
25. Date picker
26. Datetime picker
27. Docked composer
28. Docked form footer
29. Docked utility bar
30. Drop zone
31. Dueling picklist
32. Dynamic icons
33. Dynamic menu
34. Expandable section
35. Expression
36. Feeds
37. Files
38. File selector
39. Form element
40. Form layout
41. Global header
42. Global navigation
43. Icons
44. Illustration
45. Input
46. List builder
47. Lookup
48. Map
49. Menu
50. Modal
51. Notifications
52. Page headers
53. Panels
54. Path
55. Pills
56. Popovers
57. Progress bar
58. Progress indicator
59. Progress ring
60. Publisher
61. Radio button group
62. Radio group
63. Rich text editor
64. Scoped notifications
65. Scoped tabs
66. Select
67. Setup assistant
68. Slider
69. Spinners
70. Split view
71. Summary detail
72. Tabs
73. Textarea
74. Tile
75. Timepicker
76. Toast
77. Toggle
78. Tooltips
79. Tree
80. Vertical navigation
81. Vertical tabs
82. Visual picker
83. Welcome mat

**ŁĄCZNIE SALESFORCE LIGHTNING: ~83 komponentów**


---

## BASE WEB (UBER) - Lista komponentów

### Inputs
1. Button
2. Button group
3. Checkbox
4. File uploader
5. Form control
6. Input
7. Payment card
8. Phone input
9. Pin code
10. Radio
11. Rating
12. Select
13. Slider
14. Textarea
15. Toggle

### Pickers
16. Date picker
17. Date/Time pickers
18. Menu
19. Time picker
20. Timezone picker

### Data Display
21. Avatar
22. Badge
23. Card
24. List
25. Tag
26. Tree view
27. Typography

### Progress & Validation
28. Progress bar
29. Progress steps
30. Spinner

### Surfaces
31. Accordion
32. Drawer
33. Modal
34. Popover
35. Tooltip

### Navigation
36. Breadcrumbs
37. Header navigation
38. Link
39. Pagination
40. Side navigation
41. Tabs

### Layout
42. Aspect ratio box
43. Block
44. Flex grid
45. Grid (CSS Grid)
46. Layer

### Content
47. Banner
48. Icon
49. Notification
50. Snackbar
51. Table
52. Table-grid
53. Table-semantic
54. Toast

### Utility
55. Base provider
56. Styled
57. Theme provider
58. Tokens
59. Use styletron

**ŁĄCZNIE BASE WEB: ~59 komponentów**


---

## PATTERNFLY - Lista komponentów

### Components
1. Accordion
2. Action list
3. Alert
4. Application launcher
5. Avatar
6. Back to top
7. Background image
8. Badge
9. Banner
10. Brand
11. Breadcrumb
12. Button
13. Calendar month
14. Card
15. Checkbox
16. Chip
17. Chip group
18. Clipboard copy
19. Code block
20. Code editor
21. Context selector
22. Data list
23. Date picker
24. Date/Time picker
25. Description list
26. Divider
27. Drag and drop
28. Drawer
29. Dropdown
30. Dual list selector
31. Empty state
32. Expandable section
33. File upload
34. File upload - multiple
35. Form
36. Form control
37. Form select
38. Gallery
39. Flex
40. Grid
41. Helper text
42. Hint
43. Icon
44. Input group
45. Jump links
46. Label
47. Label group
48. List
49. Login page
50. Menu
51. Menu toggle
52. Modal
53. Multiple file upload
54. Navigation
55. Notification badge
56. Notification drawer
57. Number input
58. Options menu
59. Overflow menu
60. Page
61. Pagination
62. Panel
63. Password strength
64. Popover
65. Progress
66. Progress stepper
67. Radio
68. Search input
69. Select
70. Simple file upload
71. Simple list
72. Skeleton
73. Skip to content
74. Slider
75. Spinner
76. Split
77. Stack
78. Switch
79. Tab content
80. Table
81. Tabs
82. Text
83. Text area
84. Text input
85. Text input group
86. Text list
87. Tile
88. Time picker
89. Timestamp
90. Title
91. Toggle group
92. Toolbar
93. Tooltip
94. Tree view
95. Truncate
96. Wizard

**ŁĄCZNIE PATTERNFLY: ~96 komponentów**


---

## CHAKRA UI - Lista komponentów

### Layout
1. Aspect Ratio
2. Box
3. Center
4. Container
5. Flex
6. Grid
7. SimpleGrid
8. Stack
9. Wrap

### Forms
10. Button
11. Checkbox
12. Editable
13. Form Control
14. Icon Button
15. Input
16. Number Input
17. Pin Input
18. Radio
19. Range Slider
20. Select
21. Slider
22. Switch
23. Textarea

### Data Display
24. Badge
25. Card
26. Code
27. Divider
28. Kbd
29. List
30. Stat
31. Table
32. Tag

### Feedback
33. Alert
34. Circular Progress
35. Progress
36. Skeleton
37. Spinner
38. Toast

### Typography
39. Text
40. Heading

### Overlay
41. Alert Dialog
42. Drawer
43. Menu
44. Modal
45. Popover
46. Tooltip

### Disclosure
47. Accordion
48. Tabs
49. Visually Hidden

### Navigation
50. Breadcrumb
51. Link
52. LinkOverlay
53. SkipNavLink

### Media and Icons
54. Avatar
55. Icon
56. Image

### Other
57. Close Button
58. Portal
59. Show/Hide
60. Transitions

**ŁĄCZNIE CHAKRA UI: ~60 komponentów**


---

## BOOTSTRAP 5.3 - Lista komponentów

### Layout
1. Breakpoints
2. Columns
3. Containers
4. Grid
5. Gutters

### Content
6. Typography
7. Images
8. Tables
9. Figures

### Forms
10. Form control
11. Select
12. Checks & radios
13. Range
14. Input group
15. Floating labels
16. Layout
17. Validation

### Components
18. Accordion
19. Alerts
20. Badge
21. Breadcrumb
22. Buttons
23. Button group
24. Card
25. Carousel
26. Close button
27. Collapse
28. Dropdowns
29. List group
30. Modal
31. Navs & tabs
32. Navbar
33. Offcanvas
34. Pagination
35. Placeholders
36. Popovers
37. Progress
38. Scrollspy
39. Spinners
40. Toasts
41. Tooltips

### Helpers & Utilities
42. Clearfix
43. Color & background
44. Colored links
45. Focus ring
46. Icon link
47. Position
48. Ratio
49. Stacks
50. Stretched link
51. Text truncation
52. Vertical rule
53. Visually hidden

**ŁĄCZNIE BOOTSTRAP: ~53 komponentów**


---

## APPLE HUMAN INTERFACE GUIDELINES (HIG) - Lista komponentów

### Navigation & Layout
1. Tab bars
2. Navigation bars
3. Column view (browser)
4. Split view
5. Sidebar
6. Page control
7. Breadcrumb
8. Drawer
9. Search

### Form & Input Components
10. Text field
11. Text area
12. Picker
13. Date picker
14. Token field
15. Stepper
16. Toggle (switch)
17. Slider
18. Segmented control
19. Button
20. Radio button
21. Checkbox

### Tables & Lists
22. Table
23. List
24. Outline view
25. Collection view

### Modal & Overlay Components
26. Action sheet
27. Alert
28. Popover
29. Panel (macOS)
30. Dialog
31. Modal

### Display Components
32. Label
33. Image view
34. Icon
35. Avatar
36. Badge
37. Progress indicator
38. Activity rings (watchOS)
39. Gauge
40. Lockups

### Controls & Interactions
41. Menu
42. Context menu
43. Toolbar
44. Touch bar (macOS)
45. Disclosure controls
46. Status bar

### Platform-Specific
47. Watch face (watchOS)
48. Dock (macOS)
49. Control Center widgets
50. App clips
51. Widgets
52. Shortcuts

**ŁĄCZNIE APPLE HIG: ~52+ komponentów** (cross-platform iOS, macOS, watchOS, tvOS, visionOS)

---

## SALESFORCE LIGHTNING DESIGN SYSTEM (SLDS) - Lista komponentów

### Navigation & Layout
1. Breadcrumb
2. Tabs
3. Navigation
4. Sidebar
5. Page header
6. Layout grid
7. Card
8. Panel
9. Accordion

### Form & Input Components
10. Button
11. Button group
12. Button icon
13. Checkbox
14. Radio
15. Input
16. Textarea
17. Select
18. Combobox
19. Datepicker
20. Time picker
21. Dual listbox
22. File upload
23. Form
24. Form control

### Data Display
25. Data table
26. Tree view
27. List
28. Description list
29. Badge
30. Avatar
31. Icon
32. Progress bar
33. Progress stepper
34. Spinner
35. Skeleton

### Feedback & Status
36. Alert
37. Toast
38. Modal
39. Popover
40. Tooltip
41. Notification drawer
42. Banner

### Advanced Components
43. Calendar month
44. Carousel
45. Dropdown
46. Menu
47. Menu toggle
48. Pagination
49. Search input
50. Slider
51. Switch
52. Timestamp
53. Expandable section
54. Inline edit
55. Overflow menu
56. Clipboard copy

### Specialized Components
57. Brand
58. Chip (deprecated)
59. Tile (deprecated)
60. Label
61. Code block
62. Code editor
63. Empty state
64. Helper text
65. Hint
66. Login page
67. Masthead
68. Password generator
69. Skip to content
70. Truncate
71. Wizard
72. Action list
73. Back to top

**ŁĄCZNIE SALESFORCE LIGHTNING: ~73+ komponentów**

---

## BASE WEB (UBER) - Lista komponentów

### Core Input Components
1. Button
2. Button group
3. Checkbox
4. Form control
5. Input
6. Textarea
7. Radio
8. Select
9. Slider
10. Switch

### Navigation Components
11. Navigation header
12. Bottom navigation
13. Breadcrumbs
14. Link
15. Pagination
16. Side navigation
17. Tabs
18. Header navigation

### Layout & Structure
19. Layout grid
20. Card
21. Divider
22. Accordion
23. Drawer
24. Modal

### Data Display
25. Table
26. Data table
27. Table grid
28. Table semantic
29. List
30. Tree view
31. Avatar
32. Badge
33. Tag
34. Icon
35. Typography
36. Heading

### Date & Time
37. Datepicker
38. Time picker
39. Timezone picker
40. Calendar

### Feedback & Status
41. Progress bar
42. Progress steps
43. Spinner
44. Toast
45. Notification
46. Popover
47. Tooltip

### File & Media
48. File upload
49. Image

### Advanced Components
50. Map marker
51. Drag and drop list
52. Autocomplete
53. Search
54. Menu
55. Combobox

**ŁĄCZNIE BASE WEB: ~55+ komponentów**

---

## PATTERNFLY (RED HAT) - Lista komponentów

### Form & Input Components
1. Button
2. Checkbox
3. Form
4. Form control
5. Form select
6. Radio
7. Text area
8. Text input
9. Number input
10. Switch
11. Search input
12. Select
13. Dropdown
14. Menu
15. Menu toggle
16. Input group
17. Text input group
18. Dual list selector

### Navigation Components
19. Breadcrumb
20. Jump links
21. Navigation
22. Sidebar
23. Tabs

### Data Display
24. Table
25. Data list
26. Description list
27. Simple list
28. Tree view
29. Badge
30. Label
31. Avatar
32. Icon

### Layout & Structure
33. Card
34. Panel
35. Page
36. Drawer
37. Expandable section

### Modal & Overlay Components
38. About modal
39. Modal
40. Warning modal
41. Popover
42. Tooltip

### Feedback & Status
43. Alert
44. Notification badge
45. Notification drawer
46. Progress
47. Progress stepper
48. Spinner
49. Skeleton
50. Banner

### Date & Time Components
51. Calendar month
52. Date picker
53. Time picker
54. Date and time picker
55. Timestamp

### File Components
56. File upload (multiple)
57. File upload (simple)

### Interactive Components
58. Clipboard copy
59. Inline edit
60. Overflow menu
61. Pagination
62. Slider

### Specialized Components
63. Action list
64. Back to top
65. Brand
66. Code block
67. Code editor
68. Empty state
69. Helper text
70. Hint
71. Login page
72. Masthead
73. Password generator
74. Skip to content
75. Truncate
76. Wizard

### Deprecated Components
77. Chip (deprecated)
78. Tile (deprecated)

**ŁĄCZNIE PATTERNFLY: ~78+ komponentów**

---

## BOOTSTRAP 5.3 - Lista komponentów

### Navigation Components
1. Navbar
2. Navs and tabs
3. Breadcrumb
4. Pagination
5. Scrollspy

### Content & Layout
6. Accordion
7. Card
8. List group
9. Carousel
10. Grid system
11. Containers

### Form & Input Components
12. Forms
13. Button
14. Button group
15. Input group
16. Form controls
17. Select
18. Range
19. Checks & radios
20. Switch

### Interactive Components
21. Modal
22. Dropdown
23. Collapse
24. Offcanvas
25. Tooltip
26. Popover
27. Toast

### Feedback & Status
28. Alert
29. Badge
30. Progress
31. Spinner
32. Placeholder

### Data Display
33. Table
34. Figure
35. Images

### Utility Components
36. Close button
37. Visually hidden

**ŁĄCZNIE BOOTSTRAP: ~37+ komponentów**

---

## CHAKRA UI - Lista komponentów

### Disclosure
1. Accordion
2. Tabs
3. Visually Hidden

### Feedback
4. Alert
5. Circular Progress
6. Progress
7. Skeleton
8. Spinner
9. Toast

### Overlay
10. Alert Dialog
11. Drawer
12. Menu
13. Modal
14. Popover
15. Tooltip

### Media and Icons
16. Avatar
17. Icon
18. Image

### Data Display
19. Badge
20. Card
21. Code
22. Divider
23. Keyboard Key (Kbd)
24. List
25. Stat
26. Table
27. Tag

### Navigation
28. Breadcrumb
29. Link
30. Link Overlay
31. Skip Nav
32. Stepper

### Form
33. Button
34. Checkbox
35. Editable
36. Form Control
37. Icon Button
38. Input
39. Number Input
40. Pin Input
41. Radio
42. Range Slider
43. Select
44. Slider
45. Switch
46. Textarea

### Other
47. Close Button
48. Portal
49. Show / Hide
50. Transitions

### Typography
51. Heading
52. Highlight
53. Text

**ŁĄCZNIE CHAKRA UI: ~53 komponentów**

---

## PODSUMOWANIE STATYSTYCZNE

| Design System | Liczba komponentów | Metodologia organizacji |
|---|---|---|
| **Shopify Polaris** | ~88 | Funkcjonalne kategorie |
| **Atlassian Design System** | ~81 | Funkcjonalne + primitives |
| **PatternFly (Red Hat)** | ~78 | Funkcjonalne kategorie |
| **Salesforce Lightning** | ~73 | Funkcjonalne kategorie |
| **Ant Design** | ~70 | Funkcjonalne kategorie |
| **Adobe Spectrum** | ~60 | Funkcjonalne kategorie |
| **Base Web (Uber)** | ~55 | Funkcjonalne kategorie |
| **Chakra UI** | ~53 | Funkcjonalne kategorie |
| **Apple HIG** | ~52 | Platform-specific + funkcjonalne |
| **Microsoft Fluent 2** | ~47 | Funkcjonalne kategorie |
| **Bootstrap** | ~37 | Funkcjonalne + utility |
| **IBM Carbon** | ~33 | Atomic Design |
| **Google Material 3** | ~31 | Kategorie semantyczne |

### Kluczowe obserwacje:

1. **Różnice w podejściu**: Systemy enterprise (Shopify, Atlassian, Salesforce) mają najwięcej komponentów (70-88)
2. **Systemy uniwersalne**: Material 3 i Carbon są bardziej minimalistyczne (30-35 komponentów)
3. **Framework vs Design System**: Bootstrap to framework CSS, stąd mniej komponentów niż dedykowane design systemy
4. **Organizacja**: Większość używa kategorii funkcjonalnych, tylko IBM Carbon stosuje czysto Atomic Design

**ŚREDNIA: ~59 komponentów na system**

**Aktualizacja: Październik 2025**

