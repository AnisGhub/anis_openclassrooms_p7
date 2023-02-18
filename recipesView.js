/**
 * Représente une vue pour afficher une liste de recettes.
 */
class RecipesView {
    constructor() {
        this.recipesList = document.getElementById("recipes-list");
    }

     /**
     * Met à jour la vue avec une liste de recettes.
     * @param {Array} recipes - La liste des recettes à afficher.
     */
    updateView(recipes) {
        // Clear the existing list
        this.recipesList.innerHTML = ""; 
        if (recipes.length == 0) {
            this.recipesList.innerHTML = "Aucun résultat trouvé";
        } else {
            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];
                const li = document.createElement("li");
                li.innerHTML = recipe.name;
                this.recipesList.appendChild(li);
            }
        }
    }
    
}

// Exporte une instance unique de la classe RecipesView
export default new RecipesView();