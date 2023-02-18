class SearchView {
    constructor() {
        this.searchInput = document.getElementById("search-input");
        this.searchButton = document.getElementById("search-button");
    }
    /**
     * Récupère le terme de recherche saisi par l'utilisateur.
     * @returns {string} Le terme de recherche.
     */
    getSearchTerm() {
      return this.searchInput.value
    }
    
    /**
     * Associe un gestionnaire d'événement à la saisie de recherche de l'utilisateur.
     * @param {function} searchHandler - Le gestionnaire d'événement à associer.
     */
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


// Exporte une instance unique de la classe SearchView.
export default new SearchView();