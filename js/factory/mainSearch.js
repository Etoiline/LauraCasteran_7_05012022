import { recipesArray } from '../index.js'
import { displayFilteredRecipes } from '../component/utils.js'

/*
*
*/

export default class MainSearch {
  constructor () {
    this.filteredRecipes = []
    this.initFilterRecipes()
    this.listener()
  }

  initFilterRecipes () {
    this.filteredRecipes = recipesArray
  }

  /**
   * Formatter une chaine de caractère :
   *     - mettre toute la chaine en minuscule
   *     - ôter les accents
   */
  formatString (chaine) {
    chaine = chaine.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    chaine = chaine.toLowerCase()
    return chaine
  }

  /*
  * surveille les entrées de l'utlisateur
  * et recherche à partir de 3 caractères
  */
  listener () {
    const searchInput = document.getElementById('search')
    // console.log('search input', searchInput)
    searchInput.addEventListener('input', () => {
      this.filteredRecipes = []
      if (searchInput.value.length >= 3) {
        const keyword = this.formatString(searchInput.value)
        // console.log('début de recherche')
        for (const recipe of recipesArray) {
          const recipeName = this.formatString(recipe.name)
          if (recipeName.includes(keyword)) {
            // console.log(recipe.name)
            this.filteredRecipes.push(recipe)
          } else {
            const recipeDescription = this.formatString(recipe.description)
            if (recipeDescription.includes(keyword)) {
            // console.log(recipe.description)
              this.filteredRecipes.push(recipe)
            } else {
              for (const ingredient of recipe.ingredientList) {
                if (this.formatString(ingredient).includes(keyword)) {
                  this.filteredRecipes.push(recipe)
                  break
                }
              }
            }
          }
        }
      } else {
        this.filteredRecipes = recipesArray.slice()
      }
      displayFilteredRecipes()
    })
  }
}
