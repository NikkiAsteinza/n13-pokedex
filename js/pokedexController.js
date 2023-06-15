import  {createFilterArea} from "./pages/filtersPage/filters/filtersCreator.js";
import { getPokeDataFromFetch,getHabitatDataFromFetch } from "./utils/dataMapper.js";

import FilterPage from "./pages/filtersPage.js";
import DetailPage from "./pages/detailsPage.js";

const SCREEN_CONTAINER_ID = document.getElementById("screen-container") // screenContainer
const SIDEBAR_ID = document.getElementById("buttons")
const BACK_BUTTON = document.getElementById("back-button-mobile")
const FILTER_BUTTON = document.getElementById("filter-button-mobile")
const PAGE_POKEDETAIL_CONTAINER_ID = "screen-detail-container" // details
const PAGE_POKEDEX_CONTAINER_ID = "pokedex" // allpokemonContainer
const body = document.getElementById("full-body");
const pokedexPages = []
const pokemonMapped = []
const habitats = []

let currentPage;
BACK_BUTTON.addEventListener("click",()=>{
    pokedexPages[currentPage].hidePage()
    currentPage -=1
    pokedexPages[currentPage].showPage()
    if(currentPage === 0){
        body.classList.remove("full-pokedex")
        SIDEBAR_ID.classList.remove("hidden")
        BACK_BUTTON.classList.add("hidden")
    }
})

FILTER_BUTTON.addEventListener("click",()=>{
    const actualState = SIDEBAR_ID.style.display
    SIDEBAR_ID.style.display =actualState === "block" ? "none":"block"
})

export async function initPokedex(pokeApiUrl,numberOfPokemonToShow,pokeApiHabitats){
    const filtersControllers =  await createFilterArea(SIDEBAR_ID)
    const filtersPage = new FilterPage(
    0,"Pokedex",PAGE_POKEDEX_CONTAINER_ID,filtersControllers)
    pokedexPages.push(filtersPage)
    currentPage = 0
    const mappedData = await getPokeDataFromFetch(pokeApiUrl,numberOfPokemonToShow)
    restoreBackground();
    const recoveredMappedHabitatsData = await getHabitatDataFromFetch(pokeApiHabitats)
    setPokemonsMapped(mappedData);
    setHabitatsMapped(recoveredMappedHabitatsData)
    
    pokedexPages[currentPage].init(pokemonMapped,habitats)

    const detailPage = new DetailPage(
        1,"Poke Details", PAGE_POKEDETAIL_CONTAINER_ID,"")
    pokedexPages.push(detailPage)
}

export function restoreBackground(){
    SCREEN_CONTAINER_ID.style.backgroundImage = "url('resources/background-4.gif')";
}
export function setNotFound(){
    SCREEN_CONTAINER_ID.style.backgroundImage = "url('resources/not-found.png')";
}

export function goToDetailsPage(pokeNumber){

    body.classList.add("full-pokedex")
    SIDEBAR_ID.classList.add("hidden")
    BACK_BUTTON.classList.remove("hidden")
    pokedexPages[currentPage].hidePage()
    currentPage +=1
    pokedexPages[1].fillPokeDetails(pokemonMapped[pokeNumber-1])
    pokedexPages[1].showPage()
}

function setHabitatsMapped(mappedData) {
    mappedData.forEach(habitat => {
        habitats.push(habitat)
    });
  console.log("Stored mapped habitats data");
  console.log(habitats);
}

function setPokemonsMapped(mappedData) {
    mappedData.forEach((pokemon)=>{
        pokemonMapped.push(pokemon)
    })
    console.log("Stored mapped pokemon data");
    console.log(pokemonMapped);
  }