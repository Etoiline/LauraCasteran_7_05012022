import { ingredientsClass, recipesArray } from '../index.js'
import { displayFilteredRecipes } from './utils.js'

/*
* cliquer sur un ingrédient dans la liste afin de le sélectionner
* l'ajouter dans la liste des filtres actifs
* le supprimer de la liste des tags (on ne peut pas sélectionner deux fois le même)
*/
export function selectIngredient () {
  // console.log('select ingr')
  const ingredientsItems = document.querySelectorAll('li.ingredient-item')
  const divSelectedTag = document.getElementsByClassName('search-tags__ingredients')[0]
  ingredientsItems.forEach(ingredientsItem => {
    ingredientsItem.addEventListener('click', () => {
      // console.log('clic tag ingredients', ingredientsItem)
      ingredientsClass.selectedIngredients.add(ingredientsItem.textContent)
      const spanTag = document.createElement('span')
      spanTag.setAttribute('class', 'd-flex')
      const pTag = document.createElement('p')
      pTag.textContent = ingredientsItem.textContent
      spanTag.appendChild(pTag)
      // const buttonTag = document.createElement('button')
      // buttonTag.setAttribute('type', 'button')
      // buttonTag.setAttribute('class', 'btn-close')
      // buttonTag.setAttribute('id', 'btn-close-perso')
      // buttonTag.setAttribute('aria-label', 'Close')
      const buttonTag = document.createElement('i')
      buttonTag.setAttribute('class', 'fas fa-times btn-close-perso')
      buttonTag.addEventListener('click', closeEvent)
      spanTag.appendChild(buttonTag)
      divSelectedTag.appendChild(spanTag)
      // console.log('current', ingredientsClass.currentIngredients, ingredientsItem)
      ingredientsClass.currentIngredients.delete(ingredientsItem.textContent)
      // console.log('liste', ingredientsClass.currentIngredients)
      ingredientsClass.showIngredients()
      // closeBtn()
      selectRecipeWithFilterIngredient()
    })
  })
}

let cpt = 0
/*
* permet à l'utilisateur de rechercher un ingrédient
* met à jour la liste à chaque caractère tapé
*/
export function listener () {
  const searchInput = document.getElementsByClassName('ingredient-search__input')[0]
  // console.log('search input', searchInput)
  const ingredientSearch = new Set()
  searchInput.addEventListener('input', () => {
    cpt += 1
    console.log('listener', cpt)
    ingredientSearch.clear()
    const ingredientsItems = document.querySelectorAll('li.ingredient-item')
    ingredientsItems.forEach(ingredientItem => ingredientItem.remove())
    ingredientsClass.currentIngredients.forEach(ingredient => {
      if (ingredient.toLowerCase().match(searchInput.value.toLowerCase())) {
        // ingredientsClass.currentIngredients.add(ingredient)
        ingredientSearch.add(ingredient)
      }
    })
    ingredientsClass.showIngredients(ingredientSearch)
  })
}

function closeEvent (event) {
// supprimer l'élément de la liste des filtres et des éléments sélectionnés
  // et le rajouter dans la liste des tags
  const closeButton = event.target
  ingredientsClass.currentIngredients.add(closeButton.parentNode.firstChild.textContent)
  ingredientsClass.currentIngredients = new Set(Array.from(ingredientsClass.currentIngredients).sort())
  ingredientsClass.showIngredients()
  // console.log('tab', ingredientsClass.selectedIngredients)
  ingredientsClass.selectedIngredients.delete(closeButton.parentNode.firstChild.textContent)
  // console.log('parent', closeButton.parentNode.parentNode, 'child', closeButton.parentNode)
  closeButton.parentNode.parentNode.removeChild(closeButton.parentNode)
  // ingredientsClass.filteredRecipes.push(selectRecipeWithFilterIngredient())
  selectRecipeWithFilterIngredient()
}

/* Fonction qui parcourt les recettes
* et sélectionne celles qui contiennent les ingrédients filtrés */
function selectRecipeWithFilterIngredient () {
  // console.log('appel selectrecipe')
  const recipesToDisplay = []
  ingredientsClass.filteredRecipes.splice(0, ingredientsClass.filteredRecipes.length)
  // console.log('selectrecipe', displayedRecipes)
  recipesArray.forEach(recipe => {
    let recipeToDisplayBool = true
    ingredientsClass.selectedIngredients.forEach(ingredient => {
      const result = recipe.ingredientList.includes(ingredient)
      if (!result) {
        recipeToDisplayBool = false
      }
    })
    if (recipeToDisplayBool === true) {
      recipesToDisplay.push(recipe)
      ingredientsClass.filteredRecipes.push(recipe)
    }
  })
  displayFilteredRecipes()
}
