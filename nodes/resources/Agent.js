class Agent{
    constructor(agentName,agentLabel,agentID,agentColor,agentIcon,agentCategory,agentNumberOfInputs,agentNumberOfOutputs){
        this.agentName = agentName;
        this.agentLabel = agentLabel;
        this.agentID = agentID;
        this.agentColor = agentColor;
        this.agentIcon = agentIcon;
        this.agentCategory = agentCategory;
        this.agentNumberOfInputs = agentNumberOfInputs;
        this.agentNumberOfOutputs = agentNumberOfOutputs;

        var fetchedAgent = fetch(`${this.agentID}`).then(response => response.json());
        var fetchedActions = fetchedAgent.value;
        this.actions = [];
        fetchedActions.forEach(action => {
            this.actions.push(new Action(action.name,action.parameters));
        });

    }

    toString(){
        return `AgentName: ${this.agentName}, AgentID: ${this.agentID},Actions: ${this.actions.forEach(action => action.toString())}`;
    }
}
