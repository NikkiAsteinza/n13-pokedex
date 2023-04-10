
export function fillPokeDetails(detailsContainerId,pokeData) {
    const pokeDetailsContainer = document.getElementById(detailsContainerId)
    pokeDetailsContainer.innerHTML = ""
    const pokeDetailContent = document.createElement("div")
    pokeDetailContent.setAttribute("id", "poke-detail-content")
  
    createPokeDetailContent(pokeData, pokeDetailContent);
    createDetailName(pokeData, pokeDetailsContainer);
    pokeDetailsContainer.append(pokeDetailContent)
  }

function createPokeDetailContent(pokeData, pokeDetailContent) {
  createDetailTypes(pokeDetailContent, pokeData);
  createDetailForms(pokeDetailContent, pokeData);
  createDetailAbitilies(pokeDetailContent, pokeData);
  createDetailMoves(pokeDetailContent,pokeData);
}

  
  function createStatsData(container, stats)
  {
    const statsContainer = document.createElement("div");
    statsContainer.setAttribute("id", "poke-detail-stats-container");
    for (let stat = 0; stat < stats.length; stat++) {
      const element = stats[stat];
      const statEntryContainer = document.createElement("div");
      statEntryContainer.classList.add("poke-detail-stat-entry");
  
      const details = createDetailLine(element.base_stat, "poke-stat");

      const statName = element.stat.name
      const header = createHeader(statName , "stats-header");
      statEntryContainer.append(header)
      statEntryContainer.append(details)
      statsContainer.append(statEntryContainer)
    }
    container.append(statsContainer)
  
  }

function createDetailName(pokeData, pokeDetailContent) {

  const headerContainer = document.createElement("div");
  headerContainer.setAttribute("id", "poke-detail-header");

    const pokeName = document.createElement("h2");
    pokeName.setAttribute("id", "poke-detail-name");
    pokeName.classList.add("poke-detail");
    pokeName.innerText = pokeData.name.replace(
      pokeData.name[0],
      pokeData.name[0].toUpperCase()
    );
  
    const pokeNumber = document.createElement("span");
    pokeNumber.setAttribute("id", "poke-detail-number");
    pokeNumber.classList.add("poke-detail");
    pokeNumber.innerHTML += pokeData.number;
    pokeName.append(pokeNumber);
    headerContainer.append(pokeName);

    const pokeImage = document.createElement("img");
    pokeImage.setAttribute("id", "poke-detail-image");
    pokeImage.srcset = `${pokeData.image}`;
    headerContainer.append(pokeImage);

    createBaseExperienceLine(headerContainer, pokeData.baseExperience)
    createStatsData(headerContainer,pokeData.stats)
    pokeDetailContent.append(headerContainer)
  }

  function createDetailTypes(pokeDetailContent, pokeData) {
    const detailContainer = createDetailContainer("","detail-container")
    const detailHeader = createHeader("Types","detail-header");
    const detailContentContainer = createDetailContentContainer("","detail-content-container")
    detailContainer.append(detailHeader,detailContentContainer)
    pokeDetailContent.append(detailContainer)
   
    pokeData.types.forEach((element) => {
      detailContentContainer.append(createDetailLine(element.type.name,"poke-detail-entry"));
    });

  }

  function createDetailForms(pokeDetailContent, pokeData) {
    const detailContainer = createDetailContainer("","detail-container")
    const detailHeader = createHeader("Forms","detail-header");
    const detailContentContainer = createDetailContentContainer("","detail-content-container")
    detailContainer.append(detailHeader,detailContentContainer)
    pokeDetailContent.append(detailContainer)
    
    console.log(pokeData.forms)
    pokeData.forms.forEach((element) => {
      detailContentContainer.append(createDetailLine(element.name,"poke-detail-entry"));
    });

  }

  function createDetailMoves(pokeDetailContent, pokeData) {
    const detailContainer = createDetailContainer("","detail-container")
    const detailHeader = createHeader("Moves","detail-header")
    const detailContentContainer = createDetailContentContainer("","detail-content-container")
    detailContainer.append(detailHeader,detailContentContainer)
    pokeDetailContent.append(detailContainer)

    console.log(pokeData.moves)
    pokeData.moves.forEach((element) => {
      detailContentContainer.append(createDetailLine(element.move.name,"poke-detail-entry"));
    });
  }

  function createDetailAbitilies(pokeDetailContent, pokeData) {
    const detailContainer = createDetailContainer("","detail-container")
    const detailHeader = createHeader ("Abilities","detail-header")
    const detailContentContainer = createDetailContentContainer("","detail-content-container")
    detailContainer.append(detailHeader,detailContentContainer)
    pokeDetailContent.append(detailContainer)

    console.log(pokeData.abilities)
    pokeData.abilities.forEach((element) => {
      detailContentContainer.append(createDetailLine(element.ability.name,"poke-detail-entry"))
    });
  }

function createBaseExperienceLine(container, value)
{
  const baseExp = document.createElement("h4");
  baseExp.setAttribute("id", "poke-detail-base-exp");
  const baseExpLabel = document.createElement("span");
  baseExpLabel.innerText += "Base XP: ";
  baseExp.append(baseExpLabel)
  baseExp.innerText += `${value}`;
  container.append(baseExp);
}

function createDetailContentContainer(text, className){
  return createDetailContent("div",text, className)
}

function createDetailContainer(text, className){
  return createDetailContent("section",text, className)
}
function createHeader(text, className) {
  return createDetailContent("h3",text, className)
}

function createDetailLine(text, className) {
  return createDetailContent("p",text, className)
}

function createDetailContent(tag, text, className) {
    const content = document.createElement(tag);
    content.classList.add(`${className}`)
    content.innerText = text;
    return content;
  }