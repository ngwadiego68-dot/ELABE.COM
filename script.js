/**
* ELABE Academic Portal - script.js
* * Handles the site-wide interactive search functionality.
*/

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
   
    // The HTML file where search results will be displayed
    const SEARCH_RESULTS_PAGE = 'search-results.html';
    let searchIndex = []; // Array to hold the content from search_index.json

    // -----------------------------------------------------------------
    // 1. Fetch the Search Index on page load
    // -----------------------------------------------------------------
    fetch('search_index.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load search index.');
            }
            return response.json();
        })
        .then(data => {
            searchIndex = data;
            console.log('Search Index loaded successfully.');
        })
        .catch(error => {
            console.error('Error loading search index:', error);
            alert('Error loading search content. Please check the console.');
        });
   
    // -----------------------------------------------------------------
    // 2. Attach Search Handler to Button/Enter Key
    // -----------------------------------------------------------------
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', startSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                startSearch();
            }
        });
    }

    function startSearch() {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length < 2) {
            alert("Please enter at least 2 characters to start searching.");
            return;
        }
       
        if (searchIndex.length === 0) {
            alert("Search content is not yet available. Please try again later.");
            return;
        }

        // -----------------------------------------------------------------
        // 3. Search Logic: Filter the index based on the query
        // -----------------------------------------------------------------
        const results = searchIndex.filter(item => {
            // Check if the query matches the title, snippet, or any keyword
            const titleMatch = item.title.toLowerCase().includes(query);
            const snippetMatch = item.snippet.toLowerCase().includes(query);
            const keywordsMatch = item.keywords.some(keyword => keyword.toLowerCase().includes(query));
           
            return titleMatch || snippetMatch || keywordsMatch;
        });

        // -----------------------------------------------------------------
        // 4. Store Results and Redirect
        // -----------------------------------------------------------------
        // Store the filtered results in the browser's temporary storage (sessionStorage)
        sessionStorage.setItem('searchResults', JSON.stringify(results));
        sessionStorage.setItem('searchQuery', query);

        // Redirect the user to the dedicated results page
        window.location.href = SEARCH_RESULTS_PAGE;
    }

});