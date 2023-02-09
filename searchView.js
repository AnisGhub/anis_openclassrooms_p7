class SearchView {
    constructor() {
        this.searchInput = document.getElementById("search-input");
        this.searchButton = document.getElementById("search-button");
    }
    getSearchTerm() {
      return this.searchInput.value
    }
    bindSearchEvent(searchHandler) {
        this.searchInput.addEventListener("input", (e) => {
            searchHandler();
        });
        this.searchButton.addEventListener("click", (e) => {
            e.preventDefault();
            searchHandler();
        });
    }
}

// pour avoir une seule instance 
export default new SearchView();