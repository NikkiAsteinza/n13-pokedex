import { createFilterArea } from "./pages/filtersPage/filters/filtersCreator.js";
import { getPokeDataFromFetch, getHabitatDataFromFetch } from "./utils/dataMapper.js";
import FilterPage from "./pages/filtersPage.js";
import DetailPage from "./pages/detailsPage.js";

const SCREEN_CONTAINER_ID = document.getElementById("screen-container"); // screenContainer
const SIDEBAR_ID = document.getElementById("buttons");
const BACK_BUTTON = document.getElementById("back-button-mobile");
const FILTER_BUTTON = document.getElementById("filter-button-mobile");
const PAGE_POKEDETAIL_CONTAINER_ID = "screen-detail-container"; // details
const PAGE_POKEDEX_CONTAINER_ID = "pokedex"; // allpokemonContainer
const body = document.getElementById("full-body");
const pokedexPages = [];
const pokemonMapped = [];
const habitats = [];

let currentPage;
let filters = {}; // To hold active filters
let filtersInitialized = false; // Track whether filters have been initialized

BACK_BUTTON.addEventListener("click", () => {
  pokedexPages[currentPage].hidePage();
  currentPage -= 1;
  pokedexPages[currentPage].showPage();
  if (currentPage === 0) {
    body.classList.remove("full-pokedex");
    SIDEBAR_ID.classList.remove("hidden");
    BACK_BUTTON.classList.add("hidden");
  }
});

FILTER_BUTTON.addEventListener("click", () => {
  const actualState = SIDEBAR_ID.style.display;
  SIDEBAR_ID.style.display = actualState === "block" ? "none" : "block";
});

export async function initPokedex(pokeApiUrl, offset, pokeApiHabitats) {
  if (!filtersInitialized) {
    // Create filters only once
    const filtersControllers = await createFilterArea(SIDEBAR_ID);
    const filtersPage = new FilterPage(0, "Pokedex", PAGE_POKEDEX_CONTAINER_ID, filtersControllers);
    pokedexPages.push(filtersPage);
    filtersInitialized = true;
  } else {
    // Update filter controls if needed
    updateFilterControls();
  }

  currentPage = 0;
  const mappedData = await getPokeDataFromFetch(pokeApiUrl, offset);
  restoreBackground();
  const recoveredMappedHabitatsData = await getHabitatDataFromFetch(pokeApiHabitats);
  
  // Filter and set Pokémon data
  const filteredData = filterPokemons(mappedData);
  setPokemonsMapped(filteredData);
  setHabitatsMapped(recoveredMappedHabitatsData);

  pokedexPages[currentPage].init(pokemonMapped, habitats);

  const detailPage = new DetailPage(1, "Poke Details", PAGE_POKEDETAIL_CONTAINER_ID, "");
  pokedexPages.push(detailPage);
}

export function restoreBackground() {
  SCREEN_CONTAINER_ID.style.backgroundImage = "url('resources/background-4.gif')";
}

export function setNotFound() {
  SCREEN_CONTAINER_ID.style.backgroundImage = "url('resources/404-armadilllo.gif')";
}

export function goToDetailsPage(pokeNumber) {
  body.classList.add("full-pokedex");
  SIDEBAR_ID.classList.add("hidden");
  BACK_BUTTON.classList.remove("hidden");
  pokedexPages[currentPage].hidePage();
  currentPage += 1;
  pokedexPages[1].fillPokeDetails(pokemonMapped[pokeNumber - 1]);
  pokedexPages[1].showPage();
}

function setHabitatsMapped(mappedData) {
  habitats.length = 0; // Clear existing data
  mappedData.forEach(habitat => habitats.push(habitat));
  console.log("Stored mapped habitats data");
  console.log(habitats);
}

function setPokemonsMapped(mappedData) {
  // Avoid duplicates by checking existing Pokémon
  const existingNames = new Set(pokemonMapped.map(p => p.name));
  mappedData.forEach(pokemon => {
    if (!existingNames.has(pokemon.name)) {
      pokemonMapped.push(pokemon);
      existingNames.add(pokemon.name);
    }
  });
  console.log("Stored mapped Pokémon data");
  console.log(pokemonMapped);
}

function filterPokemons(pokemonData) {
  // Apply filters to Pokémon data
  return pokemonData.filter(pokemon => {
    let match = true;
    for (const [key, value] of Object.entries(filters)) {
      if (pokemon[key] !== value) {
        match = false;
        break;
      }
    }
    return match;
  });
}

// Function to update filters based on user input
export function updateFilters(newFilters) {
  filters = { ...filters, ...newFilters };
  // Optionally, re-fetch or re-filter the Pokémon data if needed
  // For example, you might want to reload the data
  // initPokedex(pokeApiUrl, offset, pokeApiHabitats);
}

// Function to update filter controls if needed
function updateFilterControls() {
  // Implementation to update existing filter controls with new options or states
  console.log("Filters controls updated");
}
