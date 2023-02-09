class RecipesView {
    constructor() {
        this.recipesList = document.getElementById("recipes-list");
    }
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

// pour avoir une seule instance 
export default new RecipesView();