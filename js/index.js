import { recipes } from '../data/recipes.js'

import Recipe from './factory/recipe.js'
import Ingredients from './factory/ingredient.js'
import Appliance from './factory/appliance.js'
import Ustensil from './factory/ustensil.js'

import MainSearch from './factory/mainSearch.js'

console.table(recipes)

export const recipesArray = []
export const displayedRecipes = []
const divRecipes = document.getElementsByClassName('recipes')[0]

// initialisation des dropdowns
export const ingredientsClass = new Ingredients()
export const applianceClass = new Appliance()
export const ustensilsClass = new Ustensil()

// initialisation de la recherche principale
export const mainSearchClass = new MainSearch()

// initialisation des recettes et du tableau recettes affichées
// initialisation des recettes filtrées selon les tags
recipes.forEach((recipe, index) => {
  const recipeObject = new Recipe(recipe)
  recipesArray.push(recipeObject)
  divRecipes.appendChild(recipeObject.recipeFactory())
  displayedRecipes.push(recipeObject)
  ingredientsClass.filteredRecipes.push(recipeObject)
  applianceClass.filteredRecipes.push(recipeObject)
  ustensilsClass.filteredRecipes.push(recipeObject)
})

// mise en place des dropdowns
const dropdownIngredients = document.getElementsByClassName('ingredient-search')[0]
dropdownIngredients.addEventListener('show.bs.dropdown', function () {
  dropdownIngredients.setAttribute('class', 'btn-group ingredient-search ingredient-search-onclick')
  ingredientsClass.showIngredients()
})
dropdownIngredients.addEventListener('hide.bs.dropdown', function () {
  dropdownIngredients.setAttribute('class', 'btn-group ingredient-search')
  const searchInput = document.getElementsByClassName('ingredient-search__input')[0]
  searchInput.value = 'Rechercher un ingrédient'
})

const dropdownAppliance = document.getElementsByClassName('appliance-search')[0]
dropdownAppliance.addEventListener('show.bs.dropdown', function () {
  dropdownAppliance.setAttribute('class', 'btn-group appliance-search appliance-search-onclick')
  applianceClass.showAppliance()
})
dropdownAppliance.addEventListener('hide.bs.dropdown', function () {
  dropdownAppliance.setAttribute('class', 'btn-group appliance-search')
  const searchInput = document.getElementsByClassName('appliance-search__input')[0]
  searchInput.value = 'Rechercher un appareil'
})

const dropdownUstensil = document.getElementsByClassName('ustensil-search')[0]
dropdownUstensil.addEventListener('show.bs.dropdown', function () {
  dropdownUstensil.setAttribute('class', 'btn-group ustensil-search ustensil-search-onclick')
  ustensilsClass.showUstensil()
})
dropdownUstensil.addEventListener('hide.bs.dropdown', function () {
  dropdownUstensil.setAttribute('class', 'btn-group ustensil-search')
  const searchInput = document.getElementsByClassName('ustensil-search__input')[0]
  searchInput.value = 'Rechercher un ustensile'
})
