export class Model {
    constructor() {
        this.state = {
            recipes: [],
            filteredRecipes: []
            // currentTagsingredients: [],
            // currentTagsMaterial: [],
            // currentRecipe: null,
            // favoriteRecipes: []
        }
    }
    
    async fetchRecipes() {
        try {
            const response = await fetch("/data.json");
            const data = await response.json();
            this.state.recipes = data;
        } catch (error) {
            throw error;
        }
    }
    
    searchRecipes(searchTerm) {
        if (searchTerm.length < 3) {
            return this.state.filteredRecipes;
        }
        let filteredRecipes = [];
        for (let i = 0; i < this.state.recipes.length; i++) {
            if (this.state.recipes[i].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            this.state.recipes[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
                filteredRecipes.push(this.state.recipes[i]);
            } else {
                for (let j =0; j < this.state.recipes[i].ingredients.length; j++) {
                    if (this.state.recipes[i].ingredients[j].ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                        filteredRecipes.push(this.state.recipes[i]);
                        break;
                    }
                }
            }
        }
        return filteredRecipes;
    }
    

    // {
    //     ingredients: [this.states.currentIngredients],
    //     material: [this.states.currentMaterial]
    // }

    // Lait de coco ou jus de citron
    // parcours recette
    // parcours ingredients
    // parcours le materiel
        // si materiel match
    //parcours 

    // sans methode d'array
    filterRecipesByIngredient(ingredient) {
        const filteredRecipes = [];
        for (let i = 0; i < this.state.recipes.length; i++) {
            const recipe = this.state.recipes[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase() === ingredient.ingredient.toLowerCase()) {
                    filteredRecipes.push(recipe);
                    break;
                }
            }
        }
        this.state.filteredRecipes = filteredRecipes;
        return filteredRecipes;
    }

    // avec methode d'array
    // filterRecipesByIngredient(ingredient) {
    //     const filteredRecipes = this.state.recipes.filter((recipe) => recipe.ingredients.includes(ingredient));
    //     this.state.filteredRecipes = filteredRecipes;
    //     return filteredRecipes;
    // }
    


    // avec methode d'array
    // todo a corriger
    removeIngredientFromFilter(ingredient) {
       
        return this.state.recipes;
    }


    // prendre en compte les miniscules/maj
    // uniqueIngredients(recipes) {

    //     // On récupère la liste des ingrédients des recettes filtrés (avec doublons => title Maj / Min)
    //     const ingredientsDoublons = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient));

    //     const ingredientsList = [];

    //     const ingredientsUnique = ingredientsDoublons.filter(ingredient => {
            
    //         // On check si l'ingredient est déjà selectioné
    //         const ingredientTitle = ingredient.ingredient.toLowerCase();
    //         if(!ingredientsList.includes(ingredientTitle)){
    //             ingredientsList.push(ingredientTitle)
    //             return true;
    //         }

    //         return false;
    //     })

    //     console.log(ingredientsUnique)

    //     return ingredientsUnique;
    // }

    // sans methode de tableau 
    uniqueIngredients(recipes) {
        const ingredients = [];
        const ingredientsList = [];
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                if(!ingredientsList.includes(ingredient)){
                    ingredientsList.push(ingredient);
                    ingredients.push(recipe.ingredients[j]);
                }
            }
        }
        return ingredients;
    }

// // avec methode de tableau 
//     uniqueIngredients(recipes) {
//         const ingredientsList = new Set();
//         const uniqueIngredients = recipes.flatMap(recipe => recipe.ingredients)
//             .filter(ingredient => {
//                 const ingredientTitle = ingredient.ingredient.toLowerCase();
//                 if (!ingredientsList.has(ingredientTitle)) {
//                     ingredientsList.add(ingredientTitle);
//                     return true;
//                 }
//                 return false;
//             });
//         return uniqueIngredients;
//     }




    
    // recuperer la data et rechercher 
    // debile de recuperer la liste a chaque fois 
    
    // async searchRecipes(searchTerm) {
    //     if(searchTerm.length < 3) {
    //         return;
    //     }
    //     try {
    //         const response = await fetch("/data.json");
    //         const data = await response.json();
    //         let filteredRecipes = [];
    //         for (let i = 0; i < data.length; i++) {
    //             if (data[i].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //             data[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
    //                 filteredRecipes.push(data[i]);
    //             }else{
    //                 for (let j = 0; j < data[i].ingredients.length; j++) {
    //                     if (data[i].ingredients[j].ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
    //                         filteredRecipes.push(data[i]);
    //                         break;
    //                     }
    //                 }
    //             }
    //         }
    //         return filteredRecipes;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    
    
    // avec des metode de tableau
    // async searchRecipes(searchTerm) {
    //     if(searchTerm.length < 3) {
    //         return;
    //     }
    //     try {
    //         const response = await fetch("/data.json");
    //         const data = await response.json();
    //         this.recipes = data.filter(
    //             recipe =>
    //               recipe.name.toLowerCase().includes(searchTerm) ||
    //               recipe.description.toLowerCase().includes(searchTerm) ||
    //               recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
    //           );
    //         return this.recipes;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    
    
    
    // quand jaurai un backend jenvoie le term et renvoie une liste, qd la liste est chargé actualise les filtres
    // et je selon si c'est enorme ou pas je peux mettre en place une pagination
    // un tag fonctionne aussi comme un searchTerm si il est ajouter faut appeler le serveur et actualiser le reste des filtres
    
    // async searchRecipes(searchTerm) {
    //     if (searchTerm.length < 3) {
    //         return [];
    //     }
    //     try{
    //         const response = await fetch(`https://your-server.com/api/recipes?q=${searchTerm}`);
    //         const data = await response.json();
    //         this.recipes = data;
    //         return this.recipes;
    //     }catch(error){
    //         console.error(error)
    //     }
    // }
    
    
    // // A way to set current recipe
    // setCurrentRecipe(recipe) {
    //     this.state.currentRecipe = recipe;
    // }
    // // A way to add recipe to favorites
    // addToFavorites(recipe) {
    //     this.state.favoriteRecipes.push(recipe);
    // }
    
    // // A way to remove recipe from favorites
    // removeFromFavorites(recipe) {
    //     this.state.favoriteRecipes = this.state.favoriteRecipes.filter(r => r !== recipe);
    // }
}