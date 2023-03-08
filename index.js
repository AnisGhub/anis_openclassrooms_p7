import recipesView from "./recipesView.js";



const searchInput = document.getElementById("search-input");
const ingredientSearch = document.getElementById("ingredient-search");
const applianceSearch = document.getElementById("appliance-search");
const ustensilSearch = document.getElementById("ustensil-search");

const dropdownContainer = document.getElementById("ingredient-dropdown");
const ingredientList = document.getElementById("ingredient-list");
const applianceList = document.getElementById("appliance-list");
const ustensilList = document.getElementById("ustensil-list");
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
    sortedRecipes = sortByIngredients(sortedRecipes);
    sortedRecipes = sortByAppliance(sortedRecipes);
    sortedRecipes = sortByUstensils(sortedRecipes);
    
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
 * Retourne un tableau d'appareils unique (sans doublon) parmi toutes les recettes.
 *
 * @function
 * @param {Array} recipes - les recettes.
 * @returns {Array} Un tableau d'appareils unique.
 */
function uniqueAppliances(recipes) {
    const uniqueAppliances = [];
    const appliancesList = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const appliance = recipe.appliance.toLowerCase();
        if (!appliancesList.includes(appliance)) {
            appliancesList.push(appliance);
            uniqueAppliances.push(recipe.appliance);
        }
    }
    return uniqueAppliances;
}

/**
 * Retourne un tableau d'ustensiles unique (sans doublon) parmi toutes les recettes.
 *
 * @function
 * @param {Array} recipes - les recettes.
 * @returns {Array} Un tableau d'ustensiles unique.
 */
function uniqueUstensils(recipes) {
    const uniqueUstensils = [];
    const ustensilsList = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        for (let j = 0; j < recipe.ustensils.length; j++) {
            const ustensil = recipe.ustensils[j].toLowerCase();
            if (!ustensilsList.includes(ustensil)) {
                ustensilsList.push(ustensil);
                uniqueUstensils.push(recipe.ustensils[j]);
            }
        }
    }
    return uniqueUstensils;
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
            // Vérifie si l'ingrédient sélectionné est présent dans le titre ou la description de la recette
            if (recipe.name.toLowerCase().includes(selectedIngredient) || recipe.description.toLowerCase().includes(selectedIngredient)) {
                foundIngredient = true;
            } else {
                // Vérifie si l'ingrédient sélectionné est présent dans la liste des ingrédients de la recette
                for (let k = 0; k < recipe.ingredients.length; k++) {
                    const recipeIngredient = recipe.ingredients[k].ingredient;
                    if (recipeIngredient === selectedIngredient) {
                        foundIngredient = true;
                        break;
                    }
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
 * Trie les recettes en fonction de l'appareil sélectionné par l'utilisateur.
 *
 * @function
 * @param {Array} recipes - La liste des recettes à trier.
 * @returns {Array} La liste des recettes triées en fonction de l'appareil sélectionné par l'utilisateur.
 */
function sortByAppliance(recipes) {
    // Récupère le tag appareil sélectionné
    const selectedTag = tagContainer.querySelector(".appliance-tag");
    // Si aucun tag appareil n'est sélectionné, renvoie la liste des recettes non triées
    if (!selectedTag) {
      return recipes;
    }
    const selectedAppliance = selectedTag.innerHTML;
    const filteredRecipes = [];
  
    // Parcours chaque recette et ajoute celles qui correspondent à l'appareil sélectionné à la liste filtrée
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      if (recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase()) {
        filteredRecipes.push(recipe);
      }
    }
  
    return filteredRecipes;
}


/**
 * Trie les recettes en fonction des ustensiles sélectionnés.
 *
 * @function
 * @param {Array} recipes - Les recettes à trier.
 * @returns {Array} Un tableau de recettes triées.
 */
function sortByUstensils(recipes) {
    const selectedTags = Array.from(tagContainer.querySelectorAll(".ustensil-tag"));
    if (selectedTags.length === 0) {
        return recipes;
    }

    const selectedUstensils = selectedTags.map(tag => tag.innerHTML.toLowerCase());
    const filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const recipeUstensils = [];
        for (let i = 0; i < recipe.ustensils.length; i++) {
            recipeUstensils.push(recipe.ustensils[i].toLowerCase());
        }
        let includeRecipe = true;

        for (let j = 0; j < selectedUstensils.length; j++) {
            const selectedUstensil = selectedUstensils[j];
            if (!recipeUstensils.includes(selectedUstensil)) {
                includeRecipe = false;
                break;
            }
        }

        if (includeRecipe) {
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
* Met à jour la liste d'appareils (dans le dropdown) dans l'interface utilisateur.
*
* @function
* @param {Array} appliances - La liste d'appareils à afficher.
* @returns {void}
*/
function renderAppliances(appliances) {
    applianceList.innerHTML = "";
    appliances.forEach((appliance) => {
        const button = document.createElement("button");
        button.classList.add("ingredient-button");
        button.innerHTML = appliance;
        button.addEventListener("click", () => {
            addAppliance(appliance);
        });
        applianceList.appendChild(button);
    });
}


/**
* Met à jour la liste d'ustensiles (dans le dropdown) dans l'interface utilisateur.
*
* @function
* @param {Array} ustensils - La liste d'ustensils à afficher.
* @returns {void}
*/
function renderUstensils(ustensils) {
    ustensilList.innerHTML = "";
    ustensils.forEach((ustensil) => {
        const button = document.createElement("button");
        button.classList.add("ustensil-button");
        button.innerHTML = ustensil;
        button.addEventListener("click", () => {
            addUstensil(ustensil);
        });
        ustensilList.appendChild(button);
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
        renderAppliances(uniqueAppliances(sortedRecipes)); 
        renderUstensils(uniqueUstensils(sortedRecipes)); 
        recipesView.updateView(sortedRecipes);
        setupSearchEvents(sortedRecipes);

    } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard.");
    }
}


/**
* Ajoute un appareil à la liste des tags sélectionnés et met à jour l'affichage..
*
* @function
* @param {string} appliance - L'appareil à ajouter.
* @returns {void}
*/
async function addAppliance(appliance) {
    try {
        // Check if appliance already exists in tags
        const existingTags = tagContainer.querySelectorAll(".appliance-tag");
        for (let i = 0; i < existingTags.length; i++) {
            if (existingTags[i].innerHTML === appliance) {
                return;
            }
        }
        
        // Create new tag and add to tag container
        const tag = document.createElement("span");
        tag.classList.add("appliance-tag");
        tag.innerHTML = appliance;
        tag.addEventListener("click", () => {
            removeAppliance(appliance);
        });
        tagContainer.appendChild(tag);
        
        // Récupère la liste des recettes depuis l'API
        const recipes = await fetchRecipes();
        
        // Trie les recettes et met à jour l'affichage
        let sortedRecipes = sort(recipes);
        renderIngredients(uniqueIngredients(sortedRecipes)); 
        renderAppliances(uniqueAppliances(sortedRecipes));
        renderUstensils(uniqueUstensils(sortedRecipes));  
        recipesView.updateView(sortedRecipes);
        setupSearchEvents(sortedRecipes);
        
    } catch (error) {
        console.error(error);
        alert(
            "Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard."
            );
    }
}


/**
 * Ajoute un ustensile à la liste des tags et met à jour l'affichage.
 *
 * @function
 * @async
 * @param {string} ustensil - Le nom de l'ustensile à ajouter.
 * @returns {void}
 */
async function addUstensil(ustensil) {
    try {
        // Vérifie si l'ustensile existe déjà dans les tags
        const existingTags = tagContainer.querySelectorAll(".ustensil-tag");
        for (let i = 0; i < existingTags.length; i++) {
            if (existingTags[i].innerHTML === ustensil) {
                return;
            }
        }
        
        // Crée un nouveau tag et l'ajoute au conteneur de tags
        const tag = document.createElement("span");
        tag.classList.add("ustensil-tag");
        tag.innerHTML = ustensil;
        tag.addEventListener("click", () => {
            removeUstensil(ustensil);
        });
        tagContainer.appendChild(tag);
        
        // Récupère la liste des recettes depuis l'API
        const recipes = await fetchRecipes();
        
        // Trie les recettes et met à jour l'affichage
        let sortedRecipes = sort(recipes);
        renderIngredients(uniqueIngredients(sortedRecipes)); 
        renderAppliances(uniqueAppliances(sortedRecipes)); 
        renderUstensils(uniqueUstensils(sortedRecipes)); 
        recipesView.updateView(sortedRecipes);
        setupSearchEvents(sortedRecipes);
        
    } catch (error) {
        console.error(error);
        alert(
            "Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard."
        );
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
            renderAppliances(uniqueAppliances(sortedRecipes));
            renderUstensils(uniqueUstensils(sortedRecipes)); 
            recipesView.updateView(sortedRecipes);
            setupSearchEvents(sortedRecipes);
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
 * Retire un appareil de la liste des tags sélectionnés et met à jour la liste des recettes.
 *
 * @function
 * @param {string} appliance - L'appareil à retirer.
 * @returns {void}
 */
async function removeAppliance(appliance) {
    try {
        // Récupère le tag correspondant à l'appareil à retirer
        const applianceTags = Array.from(tagContainer.querySelectorAll(".appliance-tag"));
        const tagToRemove = applianceTags.find((tag) => tag.innerHTML === appliance);
        if (tagToRemove) {
            tagContainer.removeChild(tagToRemove);

            // Récupère la liste des recettes depuis l'API
            const recipes = await fetchRecipes();

            // Trie les recettes en fonction des tags sélectionnés et met à jour l'affichage
            let sortedRecipes = sort(recipes);
            renderIngredients(uniqueIngredients(sortedRecipes));
            renderAppliances(uniqueAppliances(sortedRecipes));
            renderUstensils(uniqueUstensils(sortedRecipes)); 
            recipesView.updateView(sortedRecipes);
            setupSearchEvents(sortedRecipes);
        }
    } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard.");
    }
}


/**
 * Retire un ustensile de la liste des tags sélectionnés et met à jour la liste des recettes.
 *
 * @function
 * @param {string} ustensil - L'appareil à retirer.
 * @returns {void}
 */
async function removeUstensil(ustensil) {
    try {
        // Remove tag from tag container
        const tags = tagContainer.querySelectorAll(".ustensil-tag");
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].innerHTML === ustensil) {
                tags[i].remove();
            }
        }

        // Récupère la liste des recettes depuis l'API
        const recipes = await fetchRecipes();
        
        // Trie les recettes et met à jour l'affichage
        let sortedRecipes = sort(recipes);
        renderIngredients(uniqueIngredients(sortedRecipes)); 
        renderAppliances(uniqueAppliances(sortedRecipes)); 
        renderUstensils(uniqueUstensils(sortedRecipes));
        recipesView.updateView(sortedRecipes);
        setupSearchEvents(sortedRecipes);
        
    } catch (error) {
        console.error(error);
        alert(
            "Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard."
            );
    }
}


/**
* Recherche des ingrédients dans le dropdown correspondant au terme de recherche.
* Si la recherche est vide, affiche la liste d'ingredients courante.
*
* @function
* @param {string} searchTerm - Le terme de recherche.
* @param {Array} sortedRecipes - Le tableau contenant la liste courante de recettes triées
*
*/
function searchIngredients(searchTerm, recipes) {
    const ingredientList = document.getElementById("ingredient-list");
    const ingredients = ingredientList.getElementsByTagName("button");
    if (searchTerm.length > 0) {
        for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        const name = ingredient.textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            ingredient.style.display = "inline-block";
        } else {
            ingredient.style.display = "none";
        }
        }
    } else {
        renderIngredients(uniqueIngredients(recipes));
    }
}

/**
* Recherche des appareils dans le dropdown correspondant au terme de recherche.
* Si la recherche est vide, affiche la liste d'appareils courante.
*
* @function
* @param {string} searchTerm - Le terme de recherche.
* @param {Array} sortedRecipes - Le tableau contenant la liste courante de recettes triées.
*
*/
function searchAppliances(searchTerm, recipes) {
    const applianceList = document.getElementById("appliance-list");
    const appliances = applianceList.getElementsByTagName("button");
    if (searchTerm.length > 0) {
        for (let i = 0; i < appliances.length; i++) {
            const appliance = appliances[i];
            const name = appliance.textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                appliance.style.display = "inline-block";
            } else {
                appliance.style.display = "none";
            }
        }
    } else {
        renderAppliances(uniqueAppliances(recipes));
    }
}

/**
* Recherche des ustensiles dans le dropdown correspondant au terme de recherche.
* Si la recherche est vide, affiche la liste d'ustensiles courante.
*
* @function
* @param {string} searchTerm - Le terme de recherche.
* @param {Array} sortedRecipes - Le tableau contenant la liste courante de recettes triées.
*
*/
function searchUstensils(searchTerm, recipes) {
    const ustensilList = document.getElementById("ustensil-list");
    const ustensils = ustensilList.getElementsByTagName("button");
    if (searchTerm.length > 0) {
        for (let i = 0; i < ustensils.length; i++) {
            const ustensil = ustensils[i];
            const name = ustensil.textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                ustensil.style.display = "inline-block";
            } else {
                ustensil.style.display = "none";
            }
        }
    } else {
        renderUstensils(uniqueUstensils(recipes));
    }
}


/**
 * Met en place les événements de recherche pour les ingrédients, les appareils et les ustensiles.
 * @function
 * @param {Array} recipes - Le tableau contenant la liste courante de recettes triées
 */
function setupSearchEvents(recipes) {
    ingredientSearch.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      searchIngredients(searchTerm, recipes);
    });
  
    applianceSearch.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      searchAppliances(searchTerm, recipes);
    });
  
    ustensilSearch.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      searchUstensils(searchTerm, recipes);
    });
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
        
        // Récupère la liste des recettes depuis l'API
        const recipes = await fetchRecipes();
        
        // Trie les recettes et met à jour l'affichage
        let sortedRecipes = sort(recipes);
        renderIngredients(uniqueIngredients(sortedRecipes)); 
        renderAppliances(uniqueAppliances(sortedRecipes));
        renderUstensils(uniqueUstensils(sortedRecipes));
        recipesView.updateView(sortedRecipes);
        
        
        // Event Listener management pour les recherches 
        searchInput.addEventListener("input", (e) => {
            sortedRecipes = sort(recipes);
            renderIngredients(uniqueIngredients(sortedRecipes));
            renderAppliances(uniqueAppliances(sortedRecipes));
            renderUstensils(uniqueUstensils(sortedRecipes)); 
            recipesView.updateView(sortedRecipes);
        });
        
        setupSearchEvents(sortedRecipes);

    } catch (error) {
        console.error(error);
        alert("Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard.");
    }
}


init();
