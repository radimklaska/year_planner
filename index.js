document.addEventListener('DOMContentLoaded', function() {
    const customYearInput = document.getElementById('customYear');
    const goButton = document.getElementById('goButton');

    function navigateToYear() {
        const year = parseInt(customYearInput.value);

        // Validate year
        if (isNaN(year) || year < 1 || year > 9999) {
            alert('Please enter a valid year between 1 and 9999');
            return;
        }

        // Navigate to calendar page with the specified year
        window.location.href = `calendar.html?year=${year}`;
    }

    // Handle button click
    goButton.addEventListener('click', navigateToYear);

    // Handle Enter key press
    customYearInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            navigateToYear();
        }
    });
});
