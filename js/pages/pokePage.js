 export default class PokePage {
    
    constructor(number, name,containerId, sideBarSpecificInputContainer) {
      this.number = number
      this.name = name
      this.container = containerId
      this.relatedInputContainer = sideBarSpecificInputContainer
      this.hasRelatedInput = sideBarSpecificInputContainer != "" ? false : true
    }

    showPage(){
        this.isHidden = false
        document.getElementById(this.container).classList.remove("hidden")
        if(this.relatedInputContainer)
          document.getElementById(this.relatedInputContainer).classList.remove("hidden")
        return this.name
      }

    hidePage(){
        this.isHidden = true
        document.getElementById(this.container).classList.add("hidden")
        if(this.relatedInputContainer)
          document.getElementById(this.relatedInputContainer).classList.add("hidden")
      }
  }