import Filter from "./filter.js"

export default class IdFilter extends Filter{

    constructor(name, checkboxId, inputId){
        super(name, checkboxId, inputId)
    }

    handleSwitch(){
        const  targetState = super.handleSwitch()
        console.log("id filter turned: "+targetState)
        if(targetState){
            const otherFilters = document.getElementsByClassName("switch-input")
            console.log(otherFilters.length)
            for(let i = 0 ; i < otherFilters.length; i++){
                const element = document.getElementsByClassName("switch-input")[i]
                if(element.checked && element.id != this.checkboxId){
                    element.click()
                }
            }
        }
    }
}