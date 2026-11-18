# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A browser-based year calendar generator designed for large-scale printing. The application displays full-year calendars with months as rows and days aligned by week (Monday-Sunday). All days of each month appear in a single horizontal line. Features extensive customization options for cell dimensions, typography, and layout. Optimized for A0 landscape printing with grey weekend highlighting.

## Technology Stack

- Pure HTML, CSS, and JavaScript (no frameworks or build tools)
- Hosted on Cloudflare as an assets-only Worker (static site, `wrangler.jsonc`; see README "Deployment")
- localStorage for persisting user preferences

## Development

### Local Testing
Simply open `index.html` in a web browser. No build process or local server required.

### File Structure
- `index.html` - Homepage with year selection (current, next, or custom 1-9999)
- `index.js` - Custom year input validation and navigation
- `calendar.html` - Calendar display page with controls
- `calendar.js` - Calendar generation logic and settings management
- `styles.css` - All styling (includes print media queries and @page rules)
- `README.md` - Deployment notes
- `wrangler.jsonc`, `.assetsignore` - Cloudflare Worker config; `.assetsignore` lists repo files that are not part of the site (add new non-site files there)
- `.github/workflows/deploy.yml`, `tests/visual.spec.mjs` - deploy, PR previews, visual regression

## Architecture

### Calendar Layout
The calendar uses a unique horizontal layout:

1. **Header row**: Day names (Monday-Sunday) repeated 37 times to cover maximum month width
2. **Month rows**: Each of 12 months rendered as a single horizontal row
3. **Single-line days**: All 28-31 days appear in one continuous line (no wrapping)
4. **Column alignment**: Days align with day-of-week headers via empty leading cells
5. **Full rectangle**: Trailing empty cells pad each row to exactly 37 cells for alignment
6. **Weekend highlighting**: Saturday and Sunday columns have grey background (#e0e0e0)

### Calendar Generation Logic

**Year Selection**:
- URL parameter `?year=current`, `?year=next`, or `?year=NNNN` (1-9999)
- Home page provides quick links and custom year input

**Day Alignment** (calendar.js:17-23):
- `getDayOfWeek()` returns 0=Monday through 6=Sunday
- Empty cells position first day of month in correct column
- Example: January 2026 starts Sunday → 6 leading empty cells

**Month Generation** (calendar.js:39-99):
- Each month: month name column + 37-cell days grid
- Leading empty cells (0-6) for day alignment
- Day cells (28-31) with numbers
- Trailing empty cells to reach 37 total
- Weekend cells get `.weekend` class (calendar.js:63-93)

**Header Generation** (calendar.js:101-131):
- Repeats day names (Mon-Sun) for 37 cells
- Weekend headers also get `.weekend` class
- Same width as day cells for alignment

### Key Functions (calendar.js)

**Core Calendar Functions**:
- `getYearFromURL()` - Parses URL parameter (current/next/NNNN)
- `getDayOfWeek(year, month, day)` - Returns 0-6 where 0=Monday
- `getDaysInMonth(year, month)` - Handles leap years
- `getMonthName(month)` - Returns full month name
- `generateMonth(year, month)` - Creates DOM for one month row with weekend marking
- `generateDayHeader()` - Creates day-name header row with 37 cells
- `generateCalendar(year)` - Orchestrates full year generation

**Dynamic Styling** (calendar.js:155-190):
- `applyStyles(widthMM, heightMM, fontSizeMM, yearTitleSizeMM)` - Injects dynamic CSS
  - Day cells: configurable width/height/font-size
  - Day headers: configurable width/font-size (no height)
  - Month names: font-size + calculated min-width (fontSizeMM * 7)
  - Year title: configurable font-size

**Settings Management** (calendar.js:187-267):
- Loads 5 settings from localStorage on page load
- Event listeners for all controls update styles and save to localStorage
- Settings: cellWidth, cellHeight, fontSize, yearTitleSize, showYearTitle

### User Controls

All controls in calendar.html with localStorage persistence:

1. **Cell Width** (mm): Default 95mm, range 1-200mm, step 0.5
2. **Cell Height** (mm): Default 95mm, range 1-200mm, step 0.5
3. **Font Size** (mm): Default 16.5mm, range 1-50mm, step 0.5
   - Applies to: day numbers, day headers, month names
4. **Year Title Size** (mm): Default 70mm, range 2-100mm, step 0.5
5. **Show Year Title**: Checkbox, default unchecked
6. **Print Button**: Triggers `window.print()`

### Styling Architecture

**Key CSS Patterns**:
- All dimensions in millimeters for print accuracy
- `.month-row`: Flexbox container (month-name + days-grid)
- `.month-name`: Fixed 120px min-width (static), dynamic width (fontSizeMM * 7) for scaling
- `.days-grid`: Flexbox with `flex-wrap: nowrap` for single-line layout
- `.day-cell`: Fixed width/height from settings, top-right text alignment, no shrinking
- `.weekend`: Grey background (#e0e0e0) with print color preservation

**Print Optimization** (styles.css:214-242):
- `@page`: Suggests A0 landscape, 10mm margins
- Controls hidden during print
- Body: Flexbox vertical centering on page
- Weekend backgrounds preserved: `print-color-adjust: exact`
- Page break avoidance for header and month rows

### Design Constraints

- Black text on white background with grey weekends (for printing)
- All user-configurable sizes in millimeters (not pixels)
- Monday-first week alignment (European convention)
- No dependencies or build process for simplicity
- Horizontal scroll expected for large cell sizes
- Maximum month width: 37 cells (6 empty + 31 days)

### Important Implementation Details

1. **Month name column width**: Does NOT use cell width setting, scales with font size (fontSizeMM * 7) to accommodate longest month names while keeping alignment
2. **Day cell alignment**: `align-items: flex-start` and `justify-content: flex-end` positions day numbers in top-right corner
3. **Weekend detection**: Uses modulo 7 on cell position (calendar.js:63, 76, 91)
4. **localStorage keys**: calendarCellWidth, calendarCellHeight, calendarFontSize, calendarYearTitleSize, calendarShowYearTitle
5. **Year title visibility**: Toggled via `.hidden` class (display: none)
