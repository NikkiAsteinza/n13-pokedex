export default class Filter{
    constructor(name, checkboxId, inputId){
        this.name = name
        this.checkboxElement = checkboxId
        this.inputElement = inputId

        this.initSwitch()
    }
    getInputValue(){
        const inputElemen = document.getElementById(this.inputElement);
        return inputElemen.value
    }
    getIsEnabled(){
        const inputElement = document.getElementById(this.inputElement);
        return  !inputElement.classList.toString().includes("hidden")
    }
    initSwitch(){
        const switcher = document.getElementById(this.checkboxElement) 
        switcher.addEventListener("change", () => { 
            this.handleSwitch() })
    }
    handleSwitch(){
        const inputElement = document.getElementById(this.inputElement);
        const targetState = inputElement.classList.toString().includes("hidden")
        
        if(targetState){
            inputElement.classList.remove("hidden")
        }
        else{
            inputElement.classList.add("hidden")
        }

        return targetState
    }
}