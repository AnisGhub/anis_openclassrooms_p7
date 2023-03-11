import { Recipe } from "../models/Recipe.js";

export const RECIPES_DATA_TYPE = {JSON: "json data"};
export class RecipesFactory {
    constructor(data, type) {
        if (type === RECIPES_DATA_TYPE.JSON) {
            return new Recipe(data)
        } else {
            throw 'Unknown type format'
        }
    }
}