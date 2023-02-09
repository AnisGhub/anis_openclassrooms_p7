
class IngredientsView {
    constructor() {
        this.dropdownContainer = document.getElementById("ingredient-dropdown");
        this.tagContainer = document.getElementById("ingredient-tags");
    }
    
    renderIngredientDropdown(ingredients) {
        this.dropdownContainer.innerHTML = "";
        ingredients.forEach((ingredient) => {
            const button = document.createElement("button");
            button.classList.add("ingredient-button");
            button.innerHTML = ingredient.ingredient;
            button.addEventListener("click", () => {
                this.addIngredient(ingredient);
            });
            this.dropdownContainer.appendChild(button);
        });
    }
    
    addIngredient(ingredient) {
        const tag = document.createElement("span");
        tag.classList.add("ingredient-tag");
        tag.innerHTML = ingredient.ingredient;
        tag.addEventListener("click", () => {
            this.removeIngredient(ingredient);
        });
        this.tagContainer.appendChild(tag);
        // Dispatch custom event to notify controller that ingredient was added
        const ingredientAddedEvent = new CustomEvent("ingredient-added", { detail: ingredient });
        this.tagContainer.dispatchEvent(ingredientAddedEvent);
    }
    
    removeIngredient(ingredient) {
        const ingredientTags = Array.from(this.tagContainer.children);
        const tagToRemove = ingredientTags.find((tag) => tag.innerHTML === ingredient.ingredient);
        this.tagContainer.removeChild(tagToRemove);
        // Dispatch custom event to notify that ingredient was removed
        const ingredientRemovedEvent = new CustomEvent("ingredient-removed", { detail: ingredient });
        this.tagContainer.dispatchEvent(ingredientRemovedEvent);
    }
    
    updateIngredientDropdown(ingredients) {
        this.renderIngredientDropdown(ingredients);
    }
    
}
export default new IngredientsView();