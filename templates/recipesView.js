/**
 * Représente une vue pour afficher une liste de recettes.
 */class RecipesView {
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
        const article = document.createElement("article");
        article.setAttribute("id", recipe.id);
        article.setAttribute("data-nom", recipe.name);
        article.classList.add("recipe");
        // Add content to the article
        article.innerHTML = `
          <div class="recipe-image"></div>
          <div class="recipe-content">
            <div class="recipe-title-time">
              <h1 class="recipe-title">${recipe.name}</h1>
              <span class="prep-time">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
                </svg>
                ${recipe.time} min
              </span>
            </div>
            <div class="recipe-ingredients-desc">
              <div class="ingredient-list">
                ${recipe.ingredients.map((ingredient) => `
                  <span class="ingredient-type">${ingredient.ingredient}<span class="ingredient-quantity">${ingredient.quantity ? ": " + ingredient.quantity : ""}${ingredient.unit ? " " + ingredient.unit : ""}</span><br></span>
                `).join("")}
              </div>
              <div class="recipe-description">
                <p>${recipe.description}</p>
              </div>
            </div>
          </div>
        `;
        this.recipesList.appendChild(article);
      }
    }
  }
}

// Exporte une instance unique de la classe RecipesView
export default new RecipesView();
