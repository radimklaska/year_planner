// Get year from URL parameter
function getYearFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const yearParam = urlParams.get('year');
    const currentYear = new Date().getFullYear();

    if (yearParam === 'current') {
        return currentYear;
    } else if (yearParam === 'next') {
        return currentYear + 1;
    } else if (yearParam) {
        return parseInt(yearParam);
    }
    return currentYear;
}

// Get the day of week for a given date (0 = Monday, 6 = Sunday)
function getDayOfWeek(year, month, day) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    // Convert Sunday (0) to 6, and shift others down by 1
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
}

// Get number of days in a month
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Get month name
function getMonthName(month) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
}

// Generate calendar for a specific month
function generateMonth(year, month) {
    const monthRow = document.createElement('div');
    monthRow.className = 'month-row';

    // Month name
    const monthNameDiv = document.createElement('div');
    monthNameDiv.className = 'month-name';
    monthNameDiv.textContent = getMonthName(month);
    monthRow.appendChild(monthNameDiv);

    // Days grid
    const daysGrid = document.createElement('div');
    daysGrid.className = 'days-grid';

    // Get first day of month and number of days
    const firstDayOfWeek = getDayOfWeek(year, month, 1);
    const daysInMonth = getDaysInMonth(year, month);

    // Add empty cells before the first day
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        // Mark weekend columns (Saturday=5, Sunday=6)
        if (i % 7 === 5 || i % 7 === 6) {
            emptyCell.classList.add('weekend');
        }
        daysGrid.appendChild(emptyCell);
    }

    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = day;
        // Mark weekend columns
        const cellPosition = firstDayOfWeek + day - 1;
        if (cellPosition % 7 === 5 || cellPosition % 7 === 6) {
            dayCell.classList.add('weekend');
        }
        daysGrid.appendChild(dayCell);
    }

    // Add empty cells at the end to make all rows 37 cells wide
    const totalCells = firstDayOfWeek + daysInMonth;
    const maxCells = 37; // Maximum possible: 6 empty + 31 days
    const remainingCells = maxCells - totalCells;
    for (let i = 0; i < remainingCells; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        // Mark weekend columns
        const cellPosition = totalCells + i;
        if (cellPosition % 7 === 5 || cellPosition % 7 === 6) {
            emptyCell.classList.add('weekend');
        }
        daysGrid.appendChild(emptyCell);
    }

    monthRow.appendChild(daysGrid);
    return monthRow;
}

// Generate day of week header
function generateDayHeader() {
    const headerRow = document.createElement('div');
    headerRow.className = 'header-row';

    // Empty cell for month name column
    const emptyHeader = document.createElement('div');
    emptyHeader.className = 'month-name';
    headerRow.appendChild(emptyHeader);

    // Days grid header
    const daysHeaderGrid = document.createElement('div');
    daysHeaderGrid.className = 'days-grid';

    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Generate exactly 37 cells (maximum possible: 6 empty + 31 days)
    for (let i = 0; i < 37; i++) {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = dayNames[i % 7];
        // Mark weekend columns (Saturday=5, Sunday=6)
        if (i % 7 === 5 || i % 7 === 6) {
            dayHeader.classList.add('weekend');
        }
        daysHeaderGrid.appendChild(dayHeader);
    }

    headerRow.appendChild(daysHeaderGrid);
    return headerRow;
}

// Generate full year calendar
function generateCalendar(year) {
    const container = document.getElementById('calendar-container');
    container.innerHTML = '';

    // Year title
    const yearTitle = document.createElement('h2');
    yearTitle.className = 'year-title';
    yearTitle.textContent = year;
    container.appendChild(yearTitle);

    // Day of week header
    const dayHeader = generateDayHeader();
    container.appendChild(dayHeader);

    // Generate all 12 months
    for (let month = 0; month < 12; month++) {
        const monthRow = generateMonth(year, month);
        container.appendChild(monthRow);
    }
}

// Apply dynamic styles
function applyStyles(widthMM, heightMM, fontSizeMM, yearTitleSizeMM) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';

    // Remove existing dynamic style if present
    const existing = document.getElementById('dynamic-styles');
    if (existing) {
        existing.remove();
    }

    // Calculate month name column width based on font size
    // Approximate width needed for longest month name ("September")
    const monthNameWidth = fontSizeMM * 7;

    style.textContent = `
        .day-cell {
            width: ${widthMM}mm;
            height: ${heightMM}mm;
            font-size: ${fontSizeMM}mm;
        }
        .day-header {
            width: ${widthMM}mm;
            font-size: ${fontSizeMM}mm;
        }
        .month-name {
            font-size: ${fontSizeMM}mm;
            min-width: ${monthNameWidth}mm;
        }
        .year-title {
            font-size: ${yearTitleSizeMM}mm;
        }
    `;

    document.head.appendChild(style);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const year = getYearFromURL();
    generateCalendar(year);

    // Get all control elements
    const cellWidthInput = document.getElementById('cellWidth');
    const cellHeightInput = document.getElementById('cellHeight');
    const fontSizeInput = document.getElementById('fontSize');
    const yearTitleSizeInput = document.getElementById('yearTitleSize');
    const showYearTitleCheckbox = document.getElementById('showYearTitle');

    // Load saved settings from localStorage
    const savedWidth = localStorage.getItem('calendarCellWidth');
    const savedHeight = localStorage.getItem('calendarCellHeight');
    const savedFontSize = localStorage.getItem('calendarFontSize');
    const savedYearTitleSize = localStorage.getItem('calendarYearTitleSize');
    const savedShowYearTitle = localStorage.getItem('calendarShowYearTitle');

    if (savedWidth) cellWidthInput.value = savedWidth;
    if (savedHeight) cellHeightInput.value = savedHeight;
    if (savedFontSize) fontSizeInput.value = savedFontSize;
    if (savedYearTitleSize) yearTitleSizeInput.value = savedYearTitleSize;
    if (savedShowYearTitle !== null) showYearTitleCheckbox.checked = savedShowYearTitle === 'true';

    // Apply initial styles
    applyStyles(
        cellWidthInput.value,
        cellHeightInput.value,
        fontSizeInput.value,
        yearTitleSizeInput.value
    );

    // Apply initial year title visibility
    const yearTitle = document.querySelector('.year-title');
    if (!showYearTitleCheckbox.checked) {
        yearTitle.classList.add('hidden');
    }

    // Helper function to update all styles
    function updateStyles() {
        applyStyles(
            cellWidthInput.value,
            cellHeightInput.value,
            fontSizeInput.value,
            yearTitleSizeInput.value
        );
    }

    // Event listeners for all controls
    cellWidthInput.addEventListener('input', function() {
        updateStyles();
        localStorage.setItem('calendarCellWidth', this.value);
    });

    cellHeightInput.addEventListener('input', function() {
        updateStyles();
        localStorage.setItem('calendarCellHeight', this.value);
    });

    fontSizeInput.addEventListener('input', function() {
        updateStyles();
        localStorage.setItem('calendarFontSize', this.value);
    });

    yearTitleSizeInput.addEventListener('input', function() {
        updateStyles();
        localStorage.setItem('calendarYearTitleSize', this.value);
    });

    showYearTitleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            yearTitle.classList.remove('hidden');
        } else {
            yearTitle.classList.add('hidden');
        }
        localStorage.setItem('calendarShowYearTitle', this.checked);
    });

    // Set up print button
    const printButton = document.getElementById('printButton');
    printButton.addEventListener('click', function() {
        window.print();
    });
});
