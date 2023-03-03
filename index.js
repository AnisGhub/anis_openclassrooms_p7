import recipesView from "./recipesView.js";



const searchInput = document.getElementById("search-input");

const dropdownContainer = document.getElementById("ingredient-dropdown");
const ingredientList = document.getElementById("ingredient-list");
const tagContainer = document.getElementById("tags");


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
        alert("Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard.");
    }
}
    
   
    

/**
* Trie les recettes selon différents critères de recherche.
*
* @function
* @param {Array} recipes - Les recettes à trier.
* @returns {Array} - Un tableau trié de recettes.
*/
function sort(recipes) {
    let sortedRecipes = [];
    sortedRecipes = sortByKeyword(recipes);
    sortedRecipes = sortByIngredients(recipes);
    //sortedRecipes = sortByAppliance(recipes);
    // sortedRecipes = sortByUstensils();
    
    return sortedRecipes;
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
* Trie les recettes en fonction d'un terme de recherche saisi par l'utilisateur.
*
* @function
* @param {Array} recipes - Les recettes à trier.
* @returns {Array} - Un tableau trié de recettes.
*/
function sortByKeyword(recipes) {
    const searchTerm = searchInput.value;
    if (!searchTerm || searchTerm.length < 3) {
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
* Trie les recettes en fonction des tags d'ingrédients sélectionnés par l'utilisateur.
*
* @function
* @param {Array} recipes - Les recettes à trier.
* @returns {Array} - Un tableau trié de recettes.
*/
function sortByIngredients(recipes) {
    const selectedTags = Array.from(tagContainer.querySelectorAll(".ingredient-tag"));
    const selectedIngredients = selectedTags.map(tag => tag.innerHTML);
    
    // Si aucun ingrédient n'est sélectionné, retourne toutes les recettes
    if (selectedTags.length === 0) {
        return recipes;
    }
    
    const filteredRecipes = [];
    // Parcours toutes les recettes et vérifie si elles contiennent tous les ingrédients sélectionnés
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let containsAllIngredients = true;
        // Vérifie si chaque ingrédient sélectionné est présent dans la recette
        for (let j = 0; j < selectedIngredients.length; j++) {
            const selectedIngredient = selectedIngredients[j];
            let foundIngredient = false;
            // Vérifie si l'ingrédient sélectionné est présent dans la recette
            for (let k = 0; k < recipe.ingredients.length; k++) {
                const recipeIngredient = recipe.ingredients[k].ingredient;
                if (recipeIngredient === selectedIngredient) {
                    foundIngredient = true;
                    break;
                }
            }
            // Si l'ingrédient sélectionné n'est pas présent dans la recette, sort de la boucle
            if (!foundIngredient) {
                containsAllIngredients = false;
                break;
            }
        }
        // Si la recette contient tous les ingrédients sélectionnés, l'ajoute au tableau des recettes filtrées
        if (containsAllIngredients) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
}
    
    
/**
* Met à jour la liste d'ingrédients (dans le dropdown) dans l'interface utilisateur.
*
* @function
* @param {Array} ingredients - La liste d'ingrédients à afficher.
* @returns {void}
*/
function renderIngredients(ingredients) {
    ingredientList.innerHTML = "";
    // pour la recherche d'un ingredient
    //const filteredIngredients = this.filterIngredients(ingredients);
    ingredients.forEach((ingredient) => {
        const button = document.createElement("button");
        button.classList.add("ingredient-button");
        button.innerHTML = ingredient.ingredient;
        button.addEventListener("click", () => {
            addIngredient(ingredient);
        });
        ingredientList.appendChild(button);
    });
}
    
/**
* Ajoute un ingrédient à la liste des tags sélectionnés.
*
* @function
* @param {Object} ingredient - L'objet ingrédient à ajouter.
* @returns {void}
*/
async function addIngredient(ingredient) {
    try {
        // Check if ingredient already exists in tags
        const existingTags = tagContainer.querySelectorAll(".ingredient-tag");
        for (let i = 0; i < existingTags.length; i++) {
            if (existingTags[i].innerHTML === ingredient.ingredient) {
                return;
            }
        }
        // appel api qui donne les parametres ( page = 1 => limite resultars) 
        const recipes = await fetchRecipes();
        
        // Create new tag and add to tag container
        const tag = document.createElement("span");
        tag.classList.add("ingredient-tag");
        tag.innerHTML = ingredient.ingredient;
        tag.addEventListener("click", () => {
            removeIngredient(ingredient);
        });
        tagContainer.appendChild(tag);
        
        // Trie les recettes et met à jour l'affichage
        let sortedRecipes = sort(recipes);
        renderIngredients(uniqueIngredients(sortedRecipes)); 
        recipesView.updateView(sortedRecipes);
        
    } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard.");
    }
}

        
/**
* Retire un ingrédient de la liste des tags sélectionnés.
*
* @function
* @param {Object} ingredient - L'objet ingrédient à retirer.
* @returns {void}
*/
async function removeIngredient(ingredient) {
    try {
        const ingredientTags = Array.from(tagContainer.querySelectorAll(".ingredient-tag"));
        const tagToRemove = ingredientTags.find((tag) => tag.innerHTML === ingredient.ingredient);
        if (tagToRemove) {
            tagContainer.removeChild(tagToRemove);
            
            // Récupère la liste des recettes depuis l'API
            const recipes = await fetchRecipes();
            
            // Trie les recettes et met à jour l'affichage
            let sortedRecipes = sort(recipes);
            renderIngredients(uniqueIngredients(sortedRecipes)); 
            recipesView.updateView(sortedRecipes);
        }
        
    } catch (error) {
        console.error(error);
        alert(
            "Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard."
            );
            // Add back the ingredient tag to the tag container
            const tag = document.createElement("span");
            tag.classList.add("ingredient-tag");
            tag.innerHTML = ingredient.ingredient;
            tag.addEventListener("click", () => {
                removeIngredient(ingredient);
            });
            tagContainer.appendChild(tag);
    }
}
            
/**
* Recherche des ingrédients correspondant au terme de recherche.
*
* @function
* @param {string} searchTerm - Le terme de recherche.
* @returns {void}
*/
function searchIngredients(searchTerm) {}
            
            
            
/**
* Initialise l'application.
*
* @async
* @function
* @returns {void}
*/
async function init() {
    try {
        
        // Récupère la liste des recettes depuis l'API
        const recipes = await fetchRecipes();
        
        // Trie les recettes et met à jour l'affichage
        let sortedRecipes = sort(recipes);
        renderIngredients(uniqueIngredients(sortedRecipes)); 
        recipesView.updateView(sortedRecipes);
        
        
        // Event Listener management pour les recherches 
        searchInput.addEventListener("input", (e) => {
            sortedRecipes = sort(recipes);
            renderIngredients(uniqueIngredients(sortedRecipes));
            recipesView.updateView(sortedRecipes);
        });
        
        // ingredientsView.bindFilterEvent((searchTerm) => {
        //   const filteredIngredients = filterIngredients(searchTerm, recipes);
        //   ingredientsView.updateIngredientDropdown(filteredIngredients);
        // });
        
    } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard.");
    }
}
                
                
init();
