
/**
 * Représente la vue pour la sélection des ingrédients.
 */
class IngredientsView {
    constructor() {
        this.dropdownContainer = document.getElementById("ingredient-dropdown");
        this.ingredientList = document.getElementById("ingredient-list");
        this.tagContainer = document.getElementById("ingredient-tags");
        this.searchInput = document.getElementById("ingredient-search");
    }
    
   /**
   * Génère un dropdown avec les ingrédients et une barre de recherche pour filtrer les ingredients.
   * @param {Array<Object>} ingredients - La liste des ingrédients.
   */
    renderIngredientDropdown(ingredients) {
        this.ingredientList.innerHTML = "";
        const filteredIngredients = this.filterIngredients(ingredients);
        filteredIngredients.forEach((ingredient) => {
            const button = document.createElement("button");
            button.classList.add("ingredient-button");
            button.innerHTML = ingredient.ingredient;
            button.addEventListener("click", () => {
                this.addIngredient(ingredient);
            });
            this.ingredientList.appendChild(button);
        });
    }
    
    /**
    * Ajoute un ingrédient à la liste des ingrédients (tags) sélectionnés.
    * @param {Object} ingredient - L'ingrédient à ajouter.
    */
    addIngredient(ingredient) {
        const tag = document.createElement("span");
        tag.classList.add("ingredient-tag");
        tag.innerHTML = ingredient.ingredient;
        tag.addEventListener("click", () => {
            this.removeIngredient(ingredient);
        });
        this.tagContainer.appendChild(tag);
        // Dispatch custom event to notify controller that ingredient was added
        const ingredientAddedEvent = new CustomEvent("ingredient-added", { detail: ingredient });
        this.tagContainer.dispatchEvent(ingredientAddedEvent);
    }
    
    /**
    * Retire un ingrédient de la liste des ingrédients sélectionnés.
    * @param {Object} ingredient - L'ingrédient à retirer.
    */
    removeIngredient(ingredient) {
        const ingredientTags = Array.from(this.tagContainer.children);
        const tagToRemove = ingredientTags.find((tag) => tag.innerHTML === ingredient.ingredient);
        this.tagContainer.removeChild(tagToRemove);
        // Dispatch custom event to notify that ingredient was removed
        const ingredientRemovedEvent = new CustomEvent("ingredient-removed", { detail: ingredient });
        this.tagContainer.dispatchEvent(ingredientRemovedEvent);
    }

    /**
    * Filtre les ingrédients en fonction de la recherche de l'utilisateur.
    * @param {Array<Object>} ingredients - La liste des ingrédients.
    * @returns {Array<Object>} La liste des ingrédients filtrée.
    */
    filterIngredients(ingredients) {
        const searchTerm = this.searchInput.value.toLowerCase();
        return ingredients.filter((ingredient) => ingredient.ingredient.toLowerCase().includes(searchTerm));
    }
    
    /**
    * Met à jour le dropdown des ingrédients 
    * @param {Array<Object>} ingredients - La liste des ingrédients.
    */
    updateIngredientDropdown(ingredients) {
        this.renderIngredientDropdown(ingredients);
    }

    /**
    * Associe l'événement de filtre à la recherche d'ingrédients.
    * @param {Function} searchHandler - La fonction à exécuter lors de la recherche d'ingrédients.
    */
    bindFilterEvent(searchHandler) {
        this.searchInput.addEventListener("input", () => {
            const searchTerm = this.searchInput.value;
            searchHandler(searchTerm);
        });
    }
    
}
export default new IngredientsView();