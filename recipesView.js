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
        article.classList.add("recette");
        // Add ingredients as classes to the article
        recipe.ingredients.forEach((ingredient) => {
          const ingredientClass = ingredient.ingredient.replace(/\s+/g, "-").toLowerCase();
          article.classList.add(`ingredients-${ingredientClass}`);
        });
        // Add appliance as class to the article
        const applianceClass = recipe.appliance.replace(/\s+/g, "-").toLowerCase();
        article.classList.add(`appliance-${applianceClass}`);
        // Add ustensils as classes to the article
        recipe.ustensils.forEach((ustensil) => {
          const ustensilClass = ustensil.replace(/\s+/g, "-").toLowerCase();
          article.classList.add(`ustensils-${ustensilClass}`);
        });
        // Add content to the article
        article.innerHTML = `
          <div class="image-recette"></div>
          <div class="contenu-recette">
            <h1 class="titre-recette">${recipe.name}</h1>
            <span class="temps-preparation">${recipe.time} min</span>
            <div class="liste-ingredient">
              ${recipe.ingredients.map((ingredient) => `
                <span class="type-ingredient">${ingredient.ingredient}<span class="nombre-ingredient">${ingredient.quantity ? " " + ingredient.quantity : ""}${ingredient.unit ? " " + ingredient.unit : ""}</span></span>
              `).join("")}
            </div>
            <div class="description-recette">
              <p>${recipe.description}</p>
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
