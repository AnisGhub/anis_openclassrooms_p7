import searchView from "./searchView.js";
import recipesView from "./recipesView.js";
import ingredientsView from "./ingredientsView.js";



/**
 * Récupère les recettes à partir d'un fichier JSON.
 *
 * @async
 * @function
 * @returns {Promise<Array>} toutes les recettes .
 */
async function fetchRecipes() {
  try {
    const response = await fetch("data.json");
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error(error);
    alert(
      "Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard."
    );
  }
}

/**
 * Retourne un tableau d'ingrédients unique (sans doublon) parmi toutes les recettes.
 *
 * @function
 * @param {Array} recipes - les recettes.
 * @returns {Array} Un tableau d'ingrédients unique.
 */
function uniqueIngredients(recipes) {
  const uniqueIngredients = [];
  const ingredientsList = [];
  for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
          if(!ingredientsList.includes(ingredient)){
              ingredientsList.push(ingredient);
              uniqueIngredients.push(recipe.ingredients[j]);
          }
      }
  }
  return uniqueIngredients;

}

/**
 * Filtre les recettes en fonction du terme de recherche.
 *
 * @function
 * @param {string} searchTerm - Le terme de recherche.
 * @param {Array} recipes - les recettes à filtrer.
 * @returns {Array} les recettes filtrées.
 */
function searchRecipes(searchTerm, recipes) {
    
    if (searchTerm.length < 3) {
        return recipes;
    }
    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipes[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredRecipes.push(recipes[i]);
        } else {
            for (let j =0; j < recipes[i].ingredients.length; j++) {
                if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                    filteredRecipes.push(recipes[i]);
                    break;
                }
            }
        }
    }
    return filteredRecipes;
    
}

/**
 * Filtre les recettes en fonction de l'ingrédient sélectionné et ajouter dans les tags
 *
 * @function
 * @param {Object} ingredient - L'ingrédient sélectionné.
 * @param {Array} recipes - les recettes courantes.
 * @returns {Array} les recettes filtré.
 */
function filterRecipesByIngredient(ingredient, recipes) {

  const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        for (let j = 0; j < recipe.ingredients.length; j++) {
            if (recipe.ingredients[j].ingredient.toLowerCase() === ingredient.ingredient.toLowerCase()) {
                filteredRecipes.push(recipe);
                break;
            }
        }
    }
    return filteredRecipes;
}


function filterIngredients(searchTerm, currentRecipes) {
 
}



/**
 * Initialise l'application.
 *
 * @async
 * @function
 * @returns {void}
 */
async function init() {
  try {
    const recipes = await fetchRecipes();
    let filteredRecipes = recipes;
    recipesView.updateView(filteredRecipes);
    ingredientsView.renderIngredientDropdown(uniqueIngredients(filteredRecipes));

    searchView.bindSearchEvent(() => {
      const searchTerm = searchView.getSearchTerm();
      filteredRecipes = searchRecipes(searchTerm, recipes);
      recipesView.updateView(filteredRecipes);
      ingredientsView.updateIngredientDropdown(uniqueIngredients(filteredRecipes));
    });

    // ingredientsView.bindFilterEvent((searchTerm) => {
    //   const filteredIngredients = filterIngredients(searchTerm, recipes);
    //   ingredientsView.updateIngredientDropdown(filteredIngredients);
    // });

    ingredientsView.tagContainer.addEventListener("ingredient-added", (event) => {
      const ingredient = event.detail;
      filteredRecipes = filterRecipesByIngredient(ingredient, filteredRecipes);
      recipesView.updateView(filteredRecipes);
      ingredientsView.updateIngredientDropdown(uniqueIngredients(filteredRecipes));
    });

    ingredientsView.tagContainer.addEventListener("ingredient-removed", (event) => {
      const ingredient = event.detail;
      filteredRecipes = filterRecipesByIngredient(ingredient, filteredRecipes);
      recipesView.updateView(filteredRecipes);
      ingredientsView.updateIngredientDropdown(uniqueIngredients(filteredRecipes));
    });
  } catch (error) {
    console.error(error);
    alert(
      "Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard."
    );
  }
}



init();
