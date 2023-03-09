import { Recipe } from "../models/Recipe.js";

export class RecipesFactory {
    constructor(data, type) {
        if (type === 'json') {
            return new Recipe(data)
        } else {
            throw 'Unknown type format'
        }
    }
}