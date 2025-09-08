import { getPokemonDetails } from "../../utils/dataMapper.js"; // Adjust the path as needed

export async function fillPokeDetails(detailsContainerId, pokemonId) {
  console.log(pokemonId);
  const pokeDetailsContainer = document.getElementById(detailsContainerId);
  pokeDetailsContainer.innerHTML = "";

  // Fetch and map the Pokémon data
  const pokeData = await getPokemonDetails(pokemonId);

  const pokeDetailContent = document.createElement("div");
  pokeDetailContent.setAttribute("id", "poke-detail-content");

  createPokeDetailContent(pokeData, pokeDetailContent);
  createDetailName(pokeData, pokeDetailContent);
  pokeDetailsContainer.append(pokeDetailContent);
}

function createPokeDetailContent(pokeData, pokeDetailContent) {
  createDetailTypes(pokeDetailContent, pokeData);
  createDetailForms(pokeDetailContent, pokeData);
  createDetailAbilities(pokeDetailContent, pokeData);
  createDetailMoves(pokeDetailContent, pokeData);
}

function createDetailName(pokeData, pokeDetailContent) {
  const headerContainer = document.createElement("div");
  headerContainer.setAttribute("id", "poke-detail-header");

  const pokeName = document.createElement("h2");
  pokeName.setAttribute("id", "poke-detail-name");
  pokeName.classList.add("poke-detail");
  pokeName.innerText = pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1);

  const pokeNumber = document.createElement("span");
  pokeNumber.setAttribute("id", "poke-detail-number");
  pokeNumber.classList.add("poke-detail");
  pokeNumber.innerText = `#${pokeData.number}`;
  pokeName.append(pokeNumber);
  headerContainer.append(pokeName);

  const pokeImage = document.createElement("img");
  pokeImage.setAttribute("id", "poke-detail-image");
  pokeImage.src = pokeData.image;
  headerContainer.append(pokeImage);

  createBaseExperienceLine(headerContainer, pokeData.baseExperience);
  createStatsData(headerContainer, pokeData.stats);
  pokeDetailContent.append(headerContainer);
}

function createDetailTypes(pokeDetailContent, pokeData) {
  const detailContainer = createDetailContainer("", "detail-container");
  const detailHeader = createHeader("Types", "detail-header");
  const detailContentContainer = createDetailContentContainer("", "detail-content-container");
  detailContainer.append(detailHeader, detailContentContainer);
  pokeDetailContent.append(detailContainer);

  pokeData.types.forEach(type => {
    detailContentContainer.append(createDetailLine(type, "poke-detail-entry"));
  });
}

function createDetailForms(pokeDetailContent, pokeData) {
  const detailContainer = createDetailContainer("", "detail-container");
  const detailHeader = createHeader("Forms", "detail-header");
  const detailContentContainer = createDetailContentContainer("", "detail-content-container");
  detailContainer.append(detailHeader, detailContentContainer);
  pokeDetailContent.append(detailContainer);

  pokeData.forms.forEach(form => {
    detailContentContainer.append(createDetailLine(form, "poke-detail-entry"));
  });
}

function createDetailMoves(pokeDetailContent, pokeData) {
  const detailContainer = createDetailContainer("", "detail-container");
  const detailHeader = createHeader("Moves", "detail-header");
  const detailContentContainer = createDetailContentContainer("", "detail-content-container");
  detailContainer.append(detailHeader, detailContentContainer);
  pokeDetailContent.append(detailContainer);

  pokeData.moves.forEach(move => {
    detailContentContainer.append(createDetailLine(move, "poke-detail-entry"));
  });
}

function createDetailAbilities(pokeDetailContent, pokeData) {
  const detailContainer = createDetailContainer("", "detail-container");
  const detailHeader = createHeader("Abilities", "detail-header");
  const detailContentContainer = createDetailContentContainer("", "detail-content-container");
  detailContainer.append(detailHeader, detailContentContainer);
  pokeDetailContent.append(detailContainer);

  pokeData.abilities.forEach(ability => {
    detailContentContainer.append(createDetailLine(ability, "poke-detail-entry"));
  });
}

function createBaseExperienceLine(container, value) {
  const baseExp = document.createElement("h4");
  baseExp.setAttribute("id", "poke-detail-base-exp");
  baseExp.innerText = `Base XP: ${value}`;
  container.append(baseExp);
}

function createDetailContentContainer(text, className) {
  return createDetailContent("div", text, className);
}

function createDetailContainer(text, className) {
  return createDetailContent("section", text, className);
}

function createHeader(text, className) {
  return createDetailContent("h3", text, className);
}

function createDetailLine(text, className) {
  return createDetailContent("p", text, className);
}

function createDetailContent(tag, text, className) {
  const content = document.createElement(tag);
  content.classList.add(className);
  content.innerText = text;
  return content;
}
