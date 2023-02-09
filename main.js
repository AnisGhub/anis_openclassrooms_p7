
// demo avec chatgpt

// avec methode d'array
// function searchRecipes(recipes, searchTerm) {
//     if (searchTerm.length < 3) {
//         return [];
//     }
//     return recipes.filter(function(recipe) {
//         return recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
//     });
// }

let recipes = [];

// fetch recipes
fetch("/data.json")
  .then(response => response.json())
  .then(data => {
    recipes = data;
  })
  .catch(error => console.error(error));



// filter recipes
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const recipesList = document.getElementById("recipes-list");
searchButton.addEventListener('click', function(e) {
    e.preventDefault(); 
    const searchTerm = searchInput.value;
    const filteredRecipes = searchRecipes(recipes, searchTerm);
    // clear the existing list
    recipesList.innerHTML = ""; 
    if(filteredRecipes.length == 0) {
        recipesList.innerHTML = "Aucun résultat trouvé";
    }else {
        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i];
            const li = document.createElement("li");
            li.innerHTML = recipe.name
            recipesList.appendChild(li);
        }
    }
})


// sans methode d'array
function searchRecipes(recipes, searchTerm) {
    if (searchTerm.length < 3) {
        return [];
    }
    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipes[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
            filteredRecipes.push(recipes[i]);
        }else{
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                    filteredRecipes.push(recipes[i]);
                    break;
                }
            }
        }
    }
    return filteredRecipes;
}


// const jsonRecipes = JSON.stringify(recipes);
// const blob = new Blob([jsonRecipes], {type : 'application/json'});
// const link = document.createElement('a');
// link.href = URL.createObjectURL(blob);
// link.download = "recipes.json";
// link.click();