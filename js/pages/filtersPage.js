import { goToDetailsPage } from "../pokedexController.js"
import { printRecoveredPokemonData } from "./filtersPage/cards/cardsController.js"
import PokePage from "./pokePage.js"

export default class FilterPage extends PokePage {
  constructor(number, name,containerId, sideBarSpecificInputContainer) {
    super(number, name,containerId, sideBarSpecificInputContainer)
  }
  
  async init(recoveredMappedData, recoveredMappedHabitatsData) {
    printRecoveredPokemonData(recoveredMappedData, recoveredMappedHabitatsData,this.container,goToDetailsPage)
  }
}
