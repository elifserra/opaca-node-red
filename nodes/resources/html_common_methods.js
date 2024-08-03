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
        this.currentAction = null;
    }

    async fetchAgentActions() {
        var fetchedAgent = await fetch(`${this.agentID}`).then(response => response.json());
        var fetchedActions = fetchedAgent.value;
        this.actions = [];
        fetchedActions.forEach(action => {
            this.actions.push(new Action(action.name,action.parameters));
        });
    }

    applyChangesForActionChange(){ 
        this.currentAction = this.actions.find(action => action.actionName === $("#node-input-action").val());
        $("#node-input-action").val(this.currentAction.actionName);
        this.currentAction.parameterHtml = "";
        
        for(var key in this.currentAction.actionParameters){
            this.currentAction.parameterHtml += `<label for="${this.currentAction.actionParameters[key].name}">${this.currentAction.actionParameters[key].name}</label><input type="text" id="${this.currentAction.actionParameters[key].name}" value="${""}" placeholder="${""}">`;
        }

        $("#parameters-container").html(this.currentAction.parameterHtml);

        for(var key in this.currentAction.actionParameters){
            $(`#${this.currentAction.actionParameters[key].name}`).typedInput({
                types: ['str', 'msg'],
                default: this.currentAction.actionParameters[key].typedInputType,
                typefield: $(`#${this.currentAction.actionParameters[key].name}-type`)
            });
        }
            

    }
}


class Action{
    constructor(actionName,actionParameters){
        this.actionName = actionName;
        this.actionParameters = [];
        for(var key in actionParameters){
            this.actionParameters.push(new Parameter(key,actionParameters[key].type));
        }
        this.parameterHtml = "";
    }

    saveParametersHtml(){
        if(this.actionParameters){
            this.parameterHtml = "";
            for(var key in this.actionParameters){
                this.parameterHtml += `<label for="${this.actionParameters[key].name}">${this.actionParameters[key].name}</label><input type="text" id="${this.actionParameters[key].name}" value="${this.actionParameters[key].value}" placeholder="${""}">`;
            }
        }
        $("#parameters-container").empty().append(this.parameterHtml);

        for(var key in this.actionParameters){
            $(`#${this.actionParameters[key].name}`).typedInput({
                types: ['str', 'msg'],
                default: this.actionParameters[key].typedInputType,
                typefield: $(`#${this.actionParameters[key].name}-type`)
            });
        }

    }

    sendJsSide(){
        const dataToSend = {
            actionName : this.actionName,
            queryString : this.toJsonString()

        }
        $.ajax({
            url: 'currentAction',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dataToSend)
        });
    }

    saveParameters(){

        this.actionParameters.forEach(parameter=>{
            var inputElement = $(`#${parameter.name}`);
            parameter.value = inputElement.val();
            parameter.typedInputType = inputElement.typedInput('type');
        })

        this.sendJsSide();

        RED.nodes.dirty(true); 

    }

    display(){
        console.log("çekno");
    }

    toJsonString() {
        var actualValue;
        var valueAsPassed;
        var jsonString = "{";
        var count = 0;
        var length = this.actionParameters.length - 1;
    
        this.actionParameters.forEach(parameter => {
            jsonString += "\"" + parameter.name + "\":"; 
            actualValue = parameter.value;
            parameter.type === "string" ? valueAsPassed = `"${actualValue}"` : valueAsPassed = actualValue;
            jsonString += valueAsPassed;
            count !== length ? jsonString += "," : jsonString += "}";
            count++;
        });
    
        return jsonString;
    }

    async invokeAction(queryString){
        var data = await fetch('token').then(response=>response.json());
        const token = data.value;
        var url = "http://10.42.6.107:8000/invoke/" + this.actionName;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                    Authorization: `Bearer ${token}`
                },
                body: queryString
            });

            var result = response.json();
            return result;

        } catch (error) {
            console.log(error);
            return null;
        }

    }


    async handleInvokeAction(){
        this.saveParameters();
        var query_string = this.toJsonString();
        var result = await this.invokeAction(query_string); // Invoke the action with parameters
        const resultContainer = document.getElementById('result-container');
        const resultText = document.getElementById('result-text');
        resultText.textContent = result;
        resultContainer.classList.remove('hidden');
    }




    

}

class Parameter {
    constructor(name, type, value = "") {
        this.name = name;
        this.type = type;
        this.value = value;
        this.typedInputType = "str";
    }
}


common_defaults = {
    name: { value: "" },
    agentId: { value: "" },
    actions: { value: null },
    actionsList: { value: [] },
    actionParams: { value: [] },
    action: { value: "" },
    paramsHtml: { value: "" },
    paramOutputs: { value: [] },
    nodeParametersBoxes: { value: [] },
    parameters: { value: [] },
    defaultTypes: { value: [] },
    isAgentIDChanged: { value: false },
    agent:{value:null}
}


async function getParametersOfSelectedAgent(that){
    var data = await fetch(`${that.agentId}`).then(response => response.json());
    that.actions = data.value;
    that.actionsList = that.actions.map(action => action.name);
    that.actionParams = that.actions.map(action => [action.name, action.parameters]);
    $("#node-input-action").empty().append(`<option value=${that.action}>${that.action}</option>`);
        that.actionsList.forEach(action => {
            $("#node-input-action").append(`<option value="${action}">${action}</option>`);
    });
}


async function getThisAgentNodeActions(that){

    var data = await fetch(`${that.agentId}`).then(response => response.json());
    that.actions = data.value;
    that.actionsList = that.actions.map(action => action.name);
    that.actionParams = that.actions.map(action => [action.name, action.parameters]);
}

function updateParametersHtmlSection(that){
    if (that.parameters) {
        that.paramsHtml = "";
        for (var key in that.parameters) {
            that.paramsHtml += `<label for="${key}">${key}</label><input type="text" id="${key}" value="${that.parameters[key]}" placeholder="${that.parameters[key]}">`;
        }
    }
    $("#parameters-container").empty().append(that.paramsHtml);

    for (var key in that.parameters) {
        $(`#${key}`).typedInput({
            types: ['str', 'msg'],
            default: that.defaultTypes[key],
            typefield: $(`#${key}-type`)
        });
    }
}

async function applyChangesForAgentChange(that){
    that.agentId = $("#node-input-agentId").val();
    $("#node-input-name").val(that.agentId);
    that.paramsHtml = "";
    that.nodeParametersBoxes = [];
    that.paramOutputs = [];
    that.action = "";
    that.parameters = {};
    $("#parameters-container").empty().append(that.paramsHtml);
    getParametersOfSelectedAgent(that);
    $("#node-input-action").empty();
}

function applyChangesForActionChange(that){
    that.action = $("#node-input-action").val();
    $("#node-input-action").val(that.action);
    var selectedActionParams = that.actionParams.find(action => action[0] === that.action);
    var params = selectedActionParams[1];
    that.paramsHtml = "";
    that.nodeParametersBoxes = [];
    that.paramOutputs = [];
    for (var key in params) {
        that.paramsHtml += `<label for="${key}">${key}</label>
                            <input type="text" id="${key}" placeholder="${params[key].type}">`;
        that.nodeParametersBoxes.push({ id: `${key}`, value: null });
        that.paramOutputs.push({ id: `${key}`, value: new Parameter(key, params[key].type, null) });
    }
    $("#parameters-container").empty().append(that.paramsHtml);

    for (var key in params) {
        $(`#${key}`).typedInput({
            types: ['str', 'msg'],
            default: 'str',
            typefield: $(`#${key}-type`)
        });
    }
}



async function saveParameters(node) {
    var types = {};
    node.nodeParametersBoxes.forEach(box => {
        var inputElement = $(`#${box.id}`);
        box.value = inputElement.val(); 
        types[box.id] = inputElement.typedInput('type');
    });

    node.defaultTypes = types;

    var parameters = {};
    node.nodeParametersBoxes.forEach(box => {
        parameters[box.id] = box.value; 
        node.paramOutputs.forEach(param => {
            if (param.id === box.id) {
                param.value.value = box.value; 
            }
        });
    });

    node.parameters = parameters;

    RED.nodes.dirty(true); 

}

function appendTheCommonHTMLFile(){
    fetch('http://127.0.0.1:1880/common_html_template.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        document.querySelector('#dialog-form').innerHTML += data;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

async function invokeActionForHTMLSide(endpoint, queryString,node) {

    var data = await fetch('token').then(response=>response.json());
    const token = data.value;
    // Construct the URL for the API call
    var url = "http://10.42.6.107:8000/invoke/" + endpoint;
    try {
        // Make a POST request to the specified URL with the query string
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${token}`
            },
            body: queryString
        });

        var result = response.json();
        return result;
        //${node.context().global.get("token")}
        // Parse the JSON response and set the payload of the message

    } catch (error) {
        // Log any errors that occur during the API call
        node.error("INVOKE ACTION ERROR : " + error);    // In case of any error, this is displayed on the debug screen of node-red website
        return null;
    }
}

function toJsonStringForHTMLSide(parameterArray) {
    var actualValue;
    var valueAsPassed;
    var jsonString = "{";
    var count = 0;
    var length = parameterArray.length - 1;

    // Loop through each element in the parameter array
    parameterArray.forEach(element => {
        // Add the parameter name to the JSON string
        jsonString += "\"" + element.value.name + "\":"; 
        actualValue = element.value.value;

        // Determine the actual value based on the parameter type and value
        element.value.type === "string" ? valueAsPassed = `"${actualValue}"` : valueAsPassed = actualValue;

        // Add the value to the JSON string
        jsonString += valueAsPassed;

        // Add a comma if this is not the last element
        count !== length ? jsonString += "," : jsonString += "}";
        count++;
    });

    return jsonString;
}

async function handleInvokeAction(that){
    document.getElementById("invoke-action-button").addEventListener('click', async function(){
        saveParameters(that); // this is crucial
        var query_string = toJsonStringForHTMLSide(that.paramOutputs);
        var result = await invokeActionForHTMLSide(that.action,query_string,that); // Invoke the action with parameters
        // Show the result in the result container
        const resultContainer = document.getElementById('result-container');
        const resultText = document.getElementById('result-text');
        resultText.textContent = result;
        resultContainer.classList.remove('hidden');
    })
}

async function commonOnEditPrepareFunction(node, agentId){

    appendTheCommonHTMLFile();

    node.agentId = agentId;

    await getThisAgentNodeActions(node);

    updateParametersHtmlSection(node);

    $("#node-input-agentId").on('change', async function() {
        applyChangesForAgentChange(node);
    }.bind(this));

    $("#node-input-action").empty().append(`<option value=${node.action}>${node.action}</option>`);
    node.actionsList.forEach(action => {
        $("#node-input-action").append(`<option value="${action}">${action}</option>`);
    });

    $("#node-input-action").on('change', function(){
        applyChangesForActionChange(node);
    }.bind(this)); 

    handleInvokeAction(node);
}
