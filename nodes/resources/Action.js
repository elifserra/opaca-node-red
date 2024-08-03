class Action{
    constructor(actionName,actionParameters){
        this.actionName = actionName;
        this.actionParameters = [];
        actionParameters.forEach(parameter => {
            this.actionParameters.push(new Parameter(parameter.name,parameter.type));
        });
    }

    toString(){
        return `ActionName: ${this.actionName}, ActionParameters: ${this.actionParameters.forEach(parameter => parameter.toString())}`;
    }

}