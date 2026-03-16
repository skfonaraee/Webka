// js/filters.js
let selectedGenres = [];
let maxGenres = 5;

function initFilters() {
    const clearFiltersBtn = document.getElementById('clearFilters');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const sortSelect = document.getElementById('sortBy');
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    // Initialize year selects
    initYearSelects();
    
    // Add event listeners to filter inputs
    document.querySelectorAll('input[name="country"]').forEach(input => {
        input.addEventListener('change', handleCountryFilter);
    });
    
    document.querySelectorAll('input[name="status"]').forEach(input => {
        input.addEventListener('change', applyFilters);
    });
}

function renderGenreFilters() {
    const genreFilter = document.getElementById('genreFilter');
    if (!genreFilter) return;
    
    genreFilter.innerHTML = '';
    
    allGenres.sort().forEach(genre => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.innerHTML = `
            <input type="checkbox" name="genre" value="${genre}">
            <span>${genre}</span>
        `;
        
        const checkbox = label.querySelector('input');
        checkbox.addEventListener('change', function() {
            handleGenreChange(this.value, this.checked);
        });
        
        genreFilter.appendChild(label);
    });
}

function handleGenreChange(genre, isChecked) {
    const selectedCount = document.getElementById('selectedGenresCount');
    
    if (isChecked) {
        if (selectedGenres.length < maxGenres) {
            selectedGenres.push(genre);
        } else {
            // If already at max, uncheck the checkbox
            event.target.checked = false;
            alert(`You can select up to ${maxGenres} genres only.`);
            return;
        }
    } else {
        selectedGenres = selectedGenres.filter(g => g !== genre);
    }
    
    if (selectedCount) {
        selectedCount.textContent = `${selectedGenres.length}/${maxGenres}`;
    }
    
    // Auto-apply filters when genre changes
    applyFilters();
}

function handleCountryFilter() {
    const allCheckbox = document.querySelector('input[name="country"][value="all"]');
    const otherCheckboxes = document.querySelectorAll('input[name="country"]:not([value="all"])');
    
    if (this.value === 'all' && this.checked) {
        // If "All" is checked, uncheck others
        otherCheckboxes.forEach(cb => cb.checked = false);
    } else if (this.value !== 'all' && this.checked) {
        // If a specific country is checked, uncheck "All"
        allCheckbox.checked = false;
    }
    
    applyFilters();
}

function initYearSelects() {
    const yearFrom = document.getElementById('yearFrom');
    const yearTo = document.getElementById('yearTo');
    
    if (!yearFrom || !yearTo) return;
    
    // Get min and max years from dramas
    const years = dramas.map(d => d.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    
    // Populate "From" dropdown
    yearFrom.innerHTML = '<option value="">From</option>';
    for (let year = maxYear; year >= minYear; year--) {
        yearFrom.innerHTML += `<option value="${year}">${year}</option>`;
    }
    
    // Populate "To" dropdown
    yearTo.innerHTML = '<option value="">To</option>';
    for (let year = maxYear; year >= minYear; year--) {
        yearTo.innerHTML += `<option value="${year}">${year}</option>`;
    }
    
    yearFrom.addEventListener('change', applyFilters);
    yearTo.addEventListener('change', applyFilters);
}

function applyFilters() {
    // Use window.allDramas if available (for ongoing page), otherwise use dramas
    const baseArray = window.allDramas ? window.allDramas : dramas;
    let filteredDramas = [...baseArray];
    
    // Apply year filter
    const yearFrom = document.getElementById('yearFrom')?.value;
    const yearTo = document.getElementById('yearTo')?.value;
    
    if (yearFrom) {
        filteredDramas = filteredDramas.filter(d => d.year >= parseInt(yearFrom));
    }
    
    if (yearTo) {
        filteredDramas = filteredDramas.filter(d => d.year <= parseInt(yearTo));
    }
    
    // Apply country filter
    const selectedCountries = Array.from(document.querySelectorAll('input[name="country"]:checked'))
        .map(cb => cb.value)
        .filter(v => v !== 'all');
    
    if (selectedCountries.length > 0) {
        filteredDramas = filteredDramas.filter(d => selectedCountries.includes(d.country));
    }
    
    // Apply status filter
    const selectedStatus = document.querySelector('input[name="status"]:checked')?.value;
    if (selectedStatus && selectedStatus !== 'all') {
        filteredDramas = filteredDramas.filter(d => d.status === selectedStatus);
    }
    
    // Apply genre filter
    if (selectedGenres.length > 0) {
        filteredDramas = filteredDramas.filter(d => 
            selectedGenres.some(genre => d.genres.includes(genre))
        );
    }
    
    // Apply sorting
    const sortBy = document.getElementById('sortBy')?.value || 'popularity';
    filteredDramas = sortDramas(filteredDramas, sortBy);
    
    // Render filtered results
    renderDramaGrid(filteredDramas);
}

function sortDramas(dramasList, sortBy) {
    const sorted = [...dramasList];
    
    switch(sortBy) {
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.sort((a, b) => b.year - a.year);
        case 'oldest':
            return sorted.sort((a, b) => a.year - b.year);
        case 'title':
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'popularity':
        default:
            // Sort by votes (popularity) as a proxy
            return sorted.sort((a, b) => b.votes - a.votes);
    }
}

function clearFilters() {
    // Reset year selects
    const yearFrom = document.getElementById('yearFrom');
    const yearTo = document.getElementById('yearTo');
    if (yearFrom) yearFrom.value = '';
    if (yearTo) yearTo.value = '';
    
    // Reset country filter
    document.querySelectorAll('input[name="country"]').forEach(cb => {
        cb.checked = (cb.value === 'all');
    });
    
    // Reset status filter
    document.querySelector('input[name="status"][value="all"]').checked = true;
    
    // Reset genre filter
    selectedGenres = [];
    document.querySelectorAll('input[name="genre"]').forEach(cb => {
        cb.checked = false;
    });
    
    const selectedCount = document.getElementById('selectedGenresCount');
    if (selectedCount) {
        selectedCount.textContent = '0/5';
    }
    
    // Reset sort
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) sortSelect.value = 'popularity';
    
    // Apply reset filters
    applyFilters();
}