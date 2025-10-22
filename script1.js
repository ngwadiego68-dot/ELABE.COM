/**
* ELABE Academic Portal - script.js
* * This file handles basic interactive functionality for the site.
*/

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. Basic Search Functionality (Temporary)
    // -----------------------------------------------------------------
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            // Allows the user to press 'Enter' key to search
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    function handleSearch() {
        const query = searchInput.value.trim();

        if (query.length > 2) {
            // Since this site is hosted on GitHub Pages (static HTML),
            // a functional search requires more complex coding (or a service).
            // For now, we provide a message to the user.
            alert(`Searching for "${query}"...\n\n(Note: Full site search functionality is coming soon! For now, please navigate through the Subjects menu.)`);
           
            // In the future, you can implement:
            // window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;

        } else if (query.length > 0) {
            alert("Please enter at least 3 characters to search.");
        }
    }

    // -----------------------------------------------------------------
    // 2. Add More Interactive Functions Here (Future Development)
    // -----------------------------------------------------------------
   
    // Example: Highlight the current page in the navigation menu
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
   
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.borderBottom = '2px solid var(--secondary-color)';
            link.style.color = 'var(--secondary-color)';
        }
    });
});