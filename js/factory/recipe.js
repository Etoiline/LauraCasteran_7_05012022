/* eslint-disable no-unused-vars */
export default class Recipe {
  constructor (dataRecipe) {
    this.id = dataRecipe.id
    this.name = dataRecipe.name
    this.servings = dataRecipe.servings
    this.ingredients = dataRecipe.ingredients
    this.time = dataRecipe.time
    this.description = dataRecipe.description
    this.appliance = dataRecipe.appliance
    this.ustensils = dataRecipe.ustensils
    this.ingredientList = []
    this.recipesToDisplay = []
    this.displayedRecipe = [] // liste des recettes affichées
    this.setIngredientList()
  }

  /**
   * créée la liste des ingrédients
   * @returns
   */
  setIngredientList () {
    this.ingredients.forEach(item => {
      this.ingredientList.push(item.ingredient.toLowerCase())
    })
  }

  /**
     * crée et retourne la vue d'une recette
     */
  recipeFactory () {
    // const article = document.createElement('article')
    const img = document.createElement('img')
    const figure = document.createElement('figure')
    figure.setAttribute('class', 'figure')
    const figcaption = document.createElement('figcaption')
    figcaption.setAttribute('class', 'figure-figcaption')
    img.setAttribute('src', './data/toque.png')
    img.setAttribute('class', 'figure-img')
    img.setAttribute('alt', 'photo recette')
    const divTitleName = document.createElement('div')
    divTitleName.setAttribute('class', 'title-name  d-flex flex-nowrap justify-content-between')
    const pTitle = document.createElement('h2')
    pTitle.setAttribute('class', 'title')
    pTitle.textContent = this.name
    const divTime = document.createElement('div')
    divTime.setAttribute('class', 'time d-flex flex-nowrap')
    const iClock = document.createElement('i')
    iClock.setAttribute('class', 'far fa-clock')
    const pTime = document.createElement('p')
    pTime.setAttribute('class', 'nbTime')
    pTime.textContent = this.time + ' min'
    divTime.appendChild(iClock)
    divTime.appendChild(pTime)

    divTitleName.appendChild(pTitle)
    divTitleName.appendChild(divTime)

    const divRecette = document.createElement('div')
    divRecette.setAttribute('class', 'recette d-flex flex-nowrap justify-content-between')

    const divDescription = document.createElement('div')
    divDescription.setAttribute('class', 'description')
    divDescription.textContent = this.description

    divRecette.appendChild(this.ingredientsFactory())
    divRecette.appendChild(divDescription)

    figcaption.appendChild(divTitleName)
    figcaption.appendChild(divRecette)

    figure.appendChild(img)
    figure.appendChild(figcaption)
    return figure
  }

  // Crée la partie ingrédients
  ingredientsFactory () {
    const ulIngredients = document.createElement('ul')
    ulIngredients.setAttribute('class', ' ingredients list-unstyled')
    this.ingredients.forEach((item, index) => {
      const liIngredient = document.createElement('li')
      liIngredient.setAttribute('class', '')
      const pName = document.createElement('p')
      pName.setAttribute('class', 'nameIngredient')
      pName.textContent = item.ingredient
      liIngredient.appendChild(pName)
      if (item.quantity) {
        pName.textContent = item.ingredient + ':'
        const pQuantity = document.createElement('span')
        pQuantity.setAttribute('class', 'quantity')
        if (item.unit) {
          if (item.unit === 'grammes') {
            pQuantity.textContent = item.quantity + 'gr'
          } else if (item.unit.includes('soupe')) {
            pQuantity.textContent = item.quantity + item.unit.slice(0, -8)
          } else {
            pQuantity.textContent = item.quantity + item.unit
          }
        } else {
          pQuantity.textContent = item.quantity
        }
        pName.appendChild(pQuantity)
      }
      ulIngredients.appendChild(liIngredient)
    })

    return ulIngredients
  }

  /*
  * Supprime les recettes et affiche seulement celles filtrées
  */
  displayFilteredRecipes () {
    const divRecipes = document.getElementsByClassName('recipes')[0]
    divRecipes.innerHTML = ''
    if (this.recipesToDisplay.length === 0) {
      divRecipes.innerHTML = '<p> Aucune recette correspondante</p>'
    } else {
      this.recipesToDisplay.forEach(recipe => {
        divRecipes.appendChild(recipe.recipeFactory())
      })
    }
  }
}
