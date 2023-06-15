import {
  showCardsByFilter as showCardsByFilters,
  clearFilter,
} from "../cards/cardsController.js";

import Filter from "./filter.js"
import IdFilter from "./idFilter.js"

const filters = []
function applySelectedFilters() {
  const isMobile = navigator.userAgentData.mobile; 
  if(isMobile){
    const filtersContainer = document.getElementById("buttons")
    filtersContainer.style.display ="none"
  }   
    showCardsByFilters(filters)
    const clearFilterButton = document.getElementById("clear-filter");
    clearFilterButton.classList.remove("hidden")
    const applyButton = document.getElementById("apply-filter");
    applyButton.classList.add("hidden")
}

export function clearTextFilter() {
  clearFilter();
  const applyButton = document.getElementById("apply-filter");
  applyButton.classList.remove("hidden")
  const clearFilterButton = document.getElementById("clear-filter");
  clearFilterButton.classList.add("hidden")
}

function createFilters(){
  filters.push(new IdFilter(
      "id",
      "switchfilter-id",
      "filter-id"))
  filters.push(
    new Filter(
      "name",
      "switchfilter-name",
      "filter-name"))
   filters.push(new Filter(
      "type",
      "switchtype-filter",
      "type-filter"))
   filters.push( new Filter(
      "habitat",
      "switchhabitat-filter",
      "habitat-filter"))
}

export function initController() {
  createFilters()

  const applyButton = document.getElementById("apply-filter");
  applyButton.addEventListener("click", applySelectedFilters)

  const clearFilterButton = document.getElementById("clear-filter");
  clearFilterButton.addEventListener("click", clearTextFilter);
}