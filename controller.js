import { Model } from "./model.js";
import searchView from "./searchView.js";
import recipesView from "./recipesView.js";
import ingredientsView from "./ingredientsView.js";


class Controller {
    constructor() {
        this.searchView = searchView;
        this.recipesView = recipesView;
        this.ingredientsView = ingredientsView;
        this.model = new Model();
        this.bindEvents();
        this.init();
    }
    
    async init() {
        try {
            await this.model.fetchRecipes();
            this.model.state.filteredRecipes = this.model.state.recipes;
            this.recipesView.updateView(this.model.state.filteredRecipes);
            this.ingredientsView.renderIngredientDropdown(this.model.uniqueIngredients(this.model.state.filteredRecipes));
        } catch (error) {
            console.error(error);
            alert("Une erreur s'est produite lors de la récupération des recettes. Veuillez réessayer plus tard.");
        }
    }
    
    bindEvents() {
        this.searchView.bindSearchEvent(() => {
            const searchTerm = this.searchView.getSearchTerm();
            const filteredRecipes = this.model.searchRecipes(searchTerm);
            // update the view
            this.recipesView.updateView(filteredRecipes);
            this.ingredientsView.updateIngredientDropdown(this.model.uniqueIngredients(filteredRecipes));
        });
        
        this.ingredientsView.tagContainer.addEventListener("ingredient-added", (event) => {
            const ingredient = event.detail;
            const filteredRecipes = this.model.filterRecipesByIngredient(ingredient);
            this.recipesView.updateView(filteredRecipes);
            // mettre a jour la liste des ingredients avec les ingredients de liste filtré des recette
            this.ingredientsView.updateIngredientDropdown(this.model.uniqueIngredients(filteredRecipes));
        });
        this.ingredientsView.tagContainer.addEventListener("ingredient-removed", (event) => {
            const ingredient = event.detail;
            // todo 
            const filteredRecipes = this.model.removeIngredientFromFilter(ingredient);
            this.recipesView.updateView(filteredRecipes);
            this.ingredientsView.updateIngredientDropdown(this.model.uniqueIngredients(filteredRecipes));
        });
        
        
    }
    
    
}

const app = new Controller();