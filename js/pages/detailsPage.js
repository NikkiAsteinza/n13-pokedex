import PokePage from "./pokePage.js"
import { fillPokeDetails } from "./detailsPage/detailsController.js"

export default class DetailPage extends PokePage{
    constructor(number,name,containerId,sideBarSpecificInputContainer,){
        super(number, name, containerId, sideBarSpecificInputContainer)
    }

     fillPokeDetails(pokeData)
    {
        fillPokeDetails(this.container,pokeData)
    }
}