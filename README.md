# Year Planner

A browser-based year calendar generator designed for large-scale printing. Creates customizable full-year calendars with a unique horizontal layout optimized for A0 landscape printing.

## Features

### Calendar Layout
- **Horizontal single-line layout**: All days of each month in one continuous row
- **Month-as-rows design**: 12 months stacked vertically for easy overview
- **Day alignment**: Days aligned by weekday (Monday-Sunday) with proper column positioning
- **Weekend highlighting**: Saturday and Sunday columns have subtle grey background
- **Full rectangle grid**: All rows padded to equal width for clean alignment

### Customization Options
All settings are saved automatically and remembered between sessions:

- **Cell Dimensions**: Independent width and height control (1-200mm)
- **Font Size**: Unified sizing for day numbers, weekday headers, and month names (1-50mm)
- **Year Title Size**: Separate control for year heading (2-100mm)
- **Year Title Visibility**: Toggle to show/hide the year heading
- **All measurements in millimeters** for precise print control

### Print Optimization
- Optimized for A0 landscape paper (suggested in print dialog)
- Vertical centering on page
- Weekend grey backgrounds preserved in print
- Clean black-and-white design with grey weekend accents
- Controls automatically hidden when printing

### Year Selection
- Quick links for current year and next year
- Custom year input for any year from 1 to 9999
- Direct URL access via `?year=NNNN` parameter

## Live Demo

Visit: `https://radimklaska.github.io/year_planner/`

## Usage

### Basic Usage
1. Open the homepage
2. Choose current year, next year, or enter a custom year (1-9999)
3. Adjust settings as needed:
   - Cell width and height for desired calendar size
   - Font size for readability
   - Year title size and visibility
4. Click "Print" button or press Ctrl+P / Cmd+P
5. Print dialog will suggest A0 landscape (adjustable)

### Default Settings
The calendar opens with these defaults optimized for A0 printing:
- Cell width: 95mm
- Cell height: 95mm
- Font size: 16.5mm
- Year title size: 70mm
- Year title: Hidden

### Tips
- Larger cells provide more space for writing notes and events
- Font size scales automatically with readability in mind
- Month name column width scales with font size
- All settings are remembered when you return
- Use Print Preview to check layout before printing

## Local Development

No build process required! Simply:
1. Clone the repository
2. Open `index.html` in a web browser
3. Make changes and refresh to see them

## Deployment to GitHub Pages

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

3. Your calendar will be available at:
   `https://YOUR_USERNAME.github.io/year_planner/`

## Technology Stack

- Pure HTML, CSS, and JavaScript
- No frameworks or dependencies
- localStorage for settings persistence
- Hosted as a static site on GitHub Pages

## Browser Compatibility

Works in all modern browsers with:
- localStorage support
- CSS Grid and Flexbox
- Print media queries
- `@page` CSS rules (for print suggestions)

## License

Free to use and modify for personal or commercial purposes.

## Contributing

Feel free to open issues or submit pull requests for improvements!
