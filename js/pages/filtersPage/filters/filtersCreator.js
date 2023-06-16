import  {initController} from "./filtersController.js";

export async function createFilterArea(parentContainer)
{
    const filtersContainer = document.createElement("div")
    filtersContainer.setAttribute("id", "searchBox");
    
    const filterAreaTitle = document.createElement("h3")
    filterAreaTitle.classList.add("filters-header");
    filterAreaTitle.innerText ="Filters"
    
    parentContainer.append(filterAreaTitle)
    
    createFilterById(filtersContainer, "filter-id","Number");
    createFilterById(filtersContainer, "filter-name","Name");
    
    const typesDropdown = createDropdownFilterById(filtersContainer, "type-filter","Type");
    const habitatDropdown = createDropdownFilterById(filtersContainer, "habitat-filter","Habitat");

    const clearFilterButton = document.createElement("button");
    clearFilterButton.setAttribute("id", "clear-filter");
    clearFilterButton.classList.add("poke-button");
    clearFilterButton.classList.add("filter-button");
    clearFilterButton.classList.add("hidden");
    clearFilterButton.innerHTML ="Clear";

    const applyFilterButton = document.createElement("button")
    applyFilterButton.setAttribute("id", "apply-filter")
    applyFilterButton.classList.add("poke-button")
    applyFilterButton.classList.add("filter-button")
    applyFilterButton.innerHTML ="Apply"
   

    parentContainer.append(filtersContainer)
    parentContainer.append(clearFilterButton, applyFilterButton)

    createDataDropdown(await fetchPokemonTypes(),typesDropdown)
    createDataDropdown(await fetchPokemonHabitats(),habitatDropdown)
    initController()
    return "searchBox"
}

function createFilterById(searchBox, filterId,title) {

    const filterContainer = document.createElement("div")
    filterContainer.classList.add("filterContainer")

    const idTextInput = document.createElement("input");
    idTextInput.setAttribute("id", filterId);
    idTextInput.setAttribute("type", "text");
    idTextInput.classList.add("filter-input");
    idTextInput.classList.add("hidden");

    const idFilterTitle = document.createElement("h2")
    idFilterTitle.innerText = title
    idFilterTitle.classList.add("filterTitle");
    filterContainer.append(idFilterTitle)

    const filterSwitch = createFilterSwitch(filterId);
    filterContainer.append(filterSwitch)
    searchBox.append(filterContainer,idTextInput)
}

function createFilterSwitch(filterId) {
    const switchID = "switch" + filterId;
    const filterSwitch = document.createElement("label");
    filterSwitch.classList.add("switch");
    const filterSwitchInput = document.createElement("input");
    filterSwitchInput.setAttribute("type", "checkbox");
    filterSwitchInput.setAttribute("id", switchID);
    filterSwitchInput.classList.add("switch-input")
    const span = document.createElement("span");
    span.classList.add("slider");
    span.classList.add("round");

    filterSwitch.append(filterSwitchInput);
    filterSwitch.append(span);
    return filterSwitch;
}

function createDropdownFilterById(searchBox, filterId,title) {

    const filterContainer = document.createElement("div")
    filterContainer.classList.add("filterContainer")

    let dropdown = document.createElement("select");
    dropdown.setAttribute("id", filterId);
    dropdown.classList.add("filter-input");
    dropdown.classList.add("hidden");

    const idFilterTitle = document.createElement("h2")
    idFilterTitle.innerText = title
    idFilterTitle.classList.add("filterTitle")
    filterContainer.append(idFilterTitle)

    const filterSwitch = createFilterSwitch(filterId);
    filterContainer.append(filterSwitch)

    searchBox.append(filterContainer,dropdown)
    return dropdown
}

async function fetchPokemonTypes() {
    const pokeApiTypeUrl = "https://pokeapi.co/api/v2/type"
    const typePetition = await fetch(pokeApiTypeUrl);
    const typePetitionResponse = await typePetition.json();
    return  typePetitionResponse
}

function createDataDropdown(recievedData, targetDropdown) {
    const data = []

    for (let index = 0; index < recievedData.count; index++) {
      const element = recievedData.results[index];
      data.push(element);
      const option = document.createElement("option");
      option.innerHTML = element.name;
      targetDropdown.append(option);
    }
}

async function fetchPokemonHabitats() {
    const pokeApiTypeUrl = "https://pokeapi.co/api/v2/pokemon-habitat"
    const typePetition = await fetch(pokeApiTypeUrl);
    const typePetitionResponse = await typePetition.json();
    return  typePetitionResponse
}