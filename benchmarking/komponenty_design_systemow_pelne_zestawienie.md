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

