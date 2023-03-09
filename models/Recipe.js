export class Recipe {
    constructor(recipe) {
        this.id = recipe.id
        this.name = recipe.name
        this.servings = recipe.servings
        this.ingredients = recipe.ingredients
        this.time = recipe.time
        this.description = recipe.description
        this.appliance = recipe.appliance
        this.ustensils = recipe.ustensils
    }
}