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
        this.actions = null;
        this.token = null;
    }

    async fetchAgentActions() {
        this.actions = [];
        this.token = await fetch('token').then(response=>response.json());
        this.token = this.token.value;
        var fetchedAgent = await fetch(`${this.agentID}`).then(response => response.json());
        var fetchedActions = fetchedAgent.value;
        fetchedActions.forEach(action => {
            this.actions.push(new Action(action.name,action.parameters,this.token));
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

    async appenTheSelectedAgentCommonHtml(){

        await fetch('http://127.0.0.1:1880/common_html_template.html')
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


    async oneditPrepareFunction(){

        var agent = this;

        this.appenTheSelectedAgentCommonHtml();

        await this.fetchAgentActions();

        if(this.currentAction != null){
            this.currentAction.saveParametersHtml();
        }

        $("#node-input-action").empty().append(`<option value=${""}>${this.currentAction === null ? "" : this.currentAction.actionName}</option>`);
        this.actions.forEach(action => {
            $("#node-input-action").append(`<option value="${action.actionName}">${action.actionName}</option>`);
        });

        $("#node-input-action").on('change', function(){
            this.applyChangesForActionChange();
        }.bind(this)); 

        $("#invoke-action-button").on('click', async function(){
            agent.currentAction.handleInvokeAction();
        });

    }

    oneditSaveFunction(node){
        if(this.currentAction != null){
            this.currentAction.saveParameters(true,node);
        }
    }

    oneditCancelFunction(node){
        if(this.currentAction != null){
            this.currentAction.saveParameters(true,node);
        }
    }

}


class Action{
    constructor(actionName,actionParameters,token){
        this.token = token;
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
        /*
        $.ajax({
            url: 'CurrentActionParametersInfo',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(dataToSend)
        });*/
        return dataToSend;
        
    }

    saveParameters(sendFlag,node){

        console.log("saveParameters");

        this.actionParameters.forEach(parameter=>{
            var inputElement = $(`#${parameter.name}`);
            parameter.value = inputElement.val();
            parameter.typedInputType = inputElement.typedInput('type');
        })

        if(sendFlag === true){
            node.agentCurrentActionParametersInfo = this.sendJsSide();
            console.log("node.agentCurrentActionParametersInfo");
            console.log(node.agentCurrentActionParametersInfo);
        }

        RED.nodes.dirty(true); 

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
        var url = "http://10.42.6.107:8000/invoke/" + this.actionName;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                    Authorization: `Bearer ${this.token}`
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
        this.saveParameters(false);
        var query_string = this.toJsonString();
        var result = await this.invokeAction(query_string); // Invoke the action with parameters
        $("#result-text").text(result);
        $("#result-container").removeClass("hidden");
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


const shelfAgentName = "ShelfAgent";
const shelfAgentLabel = "Shelf Agent";
const shelfAgentID = "shelf-agent";
const shelfAgentColor = "red";
const shelfAgentIcon = "shelf-agent";
const shelfAgentCategory = "ZEKI";
const shelfAgentNumberOfInputs = 1;
const shelfAgentNumberOfOutputs = 1;

const fridgeAgentName = "FridgeAgent";
const fridgeAgentLabel = "Fridge Agent";
const fridgeAgentID = "fridge-agent";
const fridgeAgentColor = "gray";
const fridgeAgentIcon = "fridge-agent";
const fridgeAgentCategory = "ZEKI";
const fridgeAgentNumberOfInputs = 1;
const fridgeAgentNumberOfOutputs = 1;

const wayFindingAgentName = "WayFindingAgent";
const wayFindingAgentLabel = "Way Finding Agent";
const wayFindingAgentID = "way-finding-agent";
const wayFindingAgentColor = "green";
const wayFindingAgentIcon = "way-finding-agent";
const wayFindingAgentCategory = "ZEKI";
const wayFindingAgentNumberOfInputs = 1;

const sensorAgentName = "SensorAgent";
const sensorAgentLabel = "Sensor Agent";
const sensorAgentID = "servlet-agent";
const sensorAgentColor = "brown";
const sensorAgentIcon = "servlet-agent";
const sensorAgentCategory = "ZEKI";
const sensorAgentNumberOfInputs = 1;
const sensorAgentNumberOfOutputs = 1;

const homeAssistantAgentName = "HomeAssistantAgent";
const homeAssistantAgentLabel = "Home Assistant Agent";
const homAssistantAgentID = "home-assistant-agent";
const homeAssistantAgentColor = "orange";
const homeAssistantAgentIcon = "home-assistant-agent";
const homeAssistantAgentCategory = "ZEKI";
const homeAssistantAgentNumberOfInputs = 1;
const homeAssistantAgentNumberOfOutputs = 1;

const roomBookingAgentName = "RoomBookingAgent";
const roomBookingAgentLabel = "Room Booking Agent";
const roomBookingAgentID = "room-booking-agent";
const roomBookingAgentColor = "white";
const roomBookingAgentIcon = "room-booking-agent";
const roomBookingAgentCategory = "ZEKI";
const roomBookingAgentNumberOfInputs = 1;
const roomBookingAgentNumberOfOutputs = 1;







