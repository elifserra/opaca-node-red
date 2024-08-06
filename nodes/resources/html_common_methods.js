// Description: This file contains the common methods that are used in the html files of the nodes.
// This file url is sent via opaca-access.js file as http request to the agent nodes.
/*
        RED.httpAdmin.get('/html_common_methods.js', function(req, res) {
        const filePath = html_common_methods_path;
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.type('text/javascript').send(data);
            }
        });
    });
*/

// Above code is used to send the html_common_methods.js file to the nodes as http request.

// This file added as "<script type="text/javascript" src="html_common_methods.js">"</script> in the html files of the nodes.
// These methods are used to make the code more organized and clean and avoid redundancy.


// Agent class is used to create agent objects
class Agent{

    /**
     * @description Constructor of the Agent class
     * @param {string} agentName 
     * @param {string} agentID 
     */
    // Constructor of the Agent class
    constructor(agentName,agentID){
        this.agentName = agentName;  // assign the agent name
        this.agentID = agentID;      // assign the agent id
        this.currentAction = null;   // assign the current action as null whenever the action is selected, it will be assigned to the selected action
        this.actions = null;         // assign the actions as null, in fetchAgentActions method, it will be assigned to the fetched actions
        this.token = null;           // assign the token as null, in fetchAgentActions method, it will be assigned to the fetched token
    }

    /**
     * @description Fetch the agent actions from the opaca server
     */
    // Fetch the agent actions from the server
    async fetchAgentActions() {
        this.actions = [];                                                                                     // assign the actions as an empty array
        this.token = await fetch('token').then(response=>response.json());                                     // fetch the token from the server
        this.token = this.token.value;                                                                         // assign the token value to the token

        /*
            Here is important if this agent is not the invoke action agent, then fetch the agent actions from the server.
            Otherwise, fetch all the agents and their actions from the server beacuse invoke action agent can invoke all the agents' actions
        */
        if(this.agentName != invokeActionAgentName){                                                           
            var fetchedAgent = await fetch(`${this.agentID}`).then(response => response.json());              // fetch the agent actions from the server
            var fetchedActions = fetchedAgent.value;                                                          // assign the fetched actions to the fetchedActions
            fetchedActions.forEach(action => {
                this.actions.push(new Action(action.name,action.parameters,this.token));                      // create an action object for each action and push it to the actions array
            });
        }else{                                                                                                // if the agent is invoke action agent
            var allAgents = await fetch('agents').then(response => response.json()).then(data => data.value); // fetch all the agents from the server
            allAgents.forEach(agent => {
                var agentActions = agent.actions;                                                             // get the actions of the agent
                agentActions.forEach(action => {                                               
                    this.actions.push(new Action(action.name,action.parameters,this.token));                  // create an action object for each action and push it to the actions array
                });
            });
        }
    }

    /**
     * @description Apply the changes for the action change
     */
    // Apply the changes for the action change
    applyChangesForActionChange(){ 
        this.currentAction = this.actions.find(action => action.actionName === $("#node-input-action").val());  // find the selected action from the actions array  
        $("#node-input-action").val(this.currentAction.actionName);                                             // assign the selected action name to the action input
        this.currentAction.parameterHtml = "";                                                                  // assign the parameter html as an empty string
        
        /*
            Create the parameter html for the selected action by using the action parameters of the selected action.
            For each parameter, create a label and an input element and append them to the parameters-container div.
        */
        for(var key in this.currentAction.actionParameters){
            this.currentAction.parameterHtml += `<label for="${this.currentAction.actionParameters[key].name}">${this.currentAction.actionParameters[key].name}</label><input type="text" id="${this.currentAction.actionParameters[key].name}" value="${""}" placeholder="${this.currentAction.actionParameters[key].type}">`;
        }

        $("#parameters-container").html(this.currentAction.parameterHtml);                                      // append the parameter html to the parameters-container div
 
        /*
            For each parameter, create a typed input element and append it to the input element.
            The typed input element is used to get the type of the parameter whether it is a str or a msg.
            Here is important because depending on the parameter typedInputType we get parameter value as a string or a message.
            if it is str, it gets value directly from the input element, if it is msg, it gets value from the message object.
            This enable nodes to use previous node's output as an input for the agent node. It is crucial for the flow based programming.
        */
        for(var key in this.currentAction.actionParameters){
            $(`#${this.currentAction.actionParameters[key].name}`).typedInput({                                // create a typed input element
                types: ['str', 'msg'],                                                                         // set the types as str and msg
                default: this.currentAction.actionParameters[key].typedInputType,                              // set the default type as the typedInputType of the parameter
                typefield: $(`#${this.currentAction.actionParameters[key].name}-type`)                         // set the typefield as the input element
            });
        }   
    }

    /**
     * @description Apply the changes for the agent change
     * @param {string} changedAgentId 
     */
    // Apply the changes for the agent change. This method is used to apply the changes when the agent is changed and called when the agent is changed.
    // This method is called only by base agent node. Because the base agent node is the only node that can change the agent.
    applyChangesForAgentChange(changedAgentId){
        this.agentID = changedAgentId;                                                                        // assign the changed agent id to the agent id
        this.actionParameters = {};                                                                           // assign the action parameters as an empty object
        $("#parameters-container").empty();                                                                   // empty the parameters-container div
        $("#result-container").addClass("hidden");                                                            // add hidden class to the result-container div

        /*
            Here assign the current action as null because when the agent is changed, the current action should be null.
            the current action will be updated whenever the selected agent action is changed.
        */
        this.currentAction = null;                                                                            // assign the current action as null
    }

    /**
     *  @description Append the selected agent common html to the dialog form
     */
    // Append the selected agent common html to the dialog form. This method is used to append the common html template to the dialog form.
    // This method is not called by base agent node because the base agent node has its own common html template.
    async appenTheSelectedAgentCommonHtml(){

        await fetch('http://127.0.0.1:1880/common_html_template.html')                                      // fetch the common html template from opaca-access node js side
        .then(response => {                             
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector('#dialog-form').innerHTML += data;                                      // append the fetched data to the dialog form
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
        
    }

    /**
     * @description Prepare the agent node for the edit
     * @param {object} node 
     */
    // Prepare the agent node for the edit. This method is called whenever edit dialog is opened.
    async oneditPrepareFunction(node){

        var agent = this;                                // assign the this object to the agent. This is used to access the agent object in the inner functions.

        if(this.agentName != baseAgentName){             // if the agent is not the base agent, then append the selected agent common html to the dialog form. 
            this.appenTheSelectedAgentCommonHtml();      // Because the base agent has its own common html template.
        }

        await this.fetchAgentActions();                 // fetch the agent actions from the opaca server

        /*
            Belwo code is used to save the parameters html of the current action.
            it is important because when the edit dialog is opened, the parameters html of the current action should be saved.
        */
        if(this.currentAction != null){                 // if the current action is not null, save the parameters html of the current action
            this.currentAction.saveParametersHtml();
        }

        // Below code is used to append the agent actions to the action input element.
        $("#node-input-action").empty().append(`<option value=${""}>${this.currentAction === null ? "" : this.currentAction.actionName}</option>`); 
        this.actions.forEach(action => {
            $("#node-input-action").append(`<option value="${action.actionName}">${action.actionName}</option>`);  // append the agent actions to the action input element
        });

        // Below code is used to apply the changes for the action change when the action is changed.
        $("#node-input-action").on('change', function(){
            this.applyChangesForActionChange();                    // call the applyChangesForActionChange method when the action is changed
        }.bind(this));                                             
  
        // Below code is used to apply the changes for the agent change when the agent is changed.
        $("#invoke-action-button").on('click', async function(){
            agent.currentAction.handleInvokeAction(node);         // call the handleInvokeAction method of the current action when the invoke action button is clicked
        });

        // Display the node name in the name input element
        document.getElementById('node-input-name').value = node.name;

    }

    /**
     * @description Save the agent node
     * @param {object} node
     */
    // This method is used to save the selected acition parameters when the edit dialog is closed. When pressed done button, this method is called.
    oneditSaveFunction(node){
        // if the current action is not null, save the parameters of the current action
        if(this.currentAction != null){
            this.currentAction.saveParameters(true,node);
        }
    }

    // This method is used to save the selected acition parameters when the edit dialog is cancelled. When the cancel button is clicked, this method is called.
    oneditCancelFunction(node){
        // if the current action is not null, save the parameters of the current action
        if(this.currentAction != null){
            this.currentAction.saveParameters(true,node);
        }
    }

}

// Action class is used to create action objects
class Action{
    /**
     * 
     * @param {string} actionName 
     * @param {Array} actionParameters 
     * @param {string} token 
     */
    // Constructor of the Action class
    constructor(actionName,actionParameters,token){
        this.token = token;                                                           // assign the token to the token
        this.actionName = actionName;                                                 // assign the action name to the action name
        this.actionParameters = [];                                                   // assign the action parameters as an empty array
        for(var key in actionParameters){                                           
            this.actionParameters.push(new Parameter(key,actionParameters[key].type)); // create a parameter object for each parameter and push it to the action parameters array
        }
        this.parameterHtml = "";                                                       // assign the parameter html as an empty string
    }

    /**
     * @description Save the parameters html
     */
    // Save the parameters html. This method is used to save the parameters html of the current action. 
    saveParametersHtml(){
        // create the parameter html for the current action
        if(this.actionParameters){
            this.parameterHtml = "";
            for(var key in this.actionParameters){
                this.parameterHtml += `<label for="${this.actionParameters[key].name}">${this.actionParameters[key].name}</label><input type="text" id="${this.actionParameters[key].name}" value="${this.actionParameters[key].value}" placeholder="${this.actionParameters[key].type}">`;
            }
        }
        $("#parameters-container").empty().append(this.parameterHtml); // append the parameter html to the parameters-container div

        // Save the typed input elements for the parameters to be able to get the parameter value as a str or a msg
        for(var key in this.actionParameters){
            $(`#${this.actionParameters[key].name}`).typedInput({
                types: ['str', 'msg'],
                default: this.actionParameters[key].typedInputType,
                typefield: $(`#${this.actionParameters[key].name}-type`)
            });
        }

    }

    /**
     * @description Send the js side
     * @returns actionName and actionParameters
     */
    // Send the js side. This method is used to send the action name and action parameters to the js side to be able to call invokeAction method of the js side.
    /*
        Attention : There are two invokeAction method. One of them is in js side, the other one is in html side.
        For js side to be able to call invokeAction method of the js side, the action name and action parameters should be sent to the js side.
        Depending on the action name and action parameters, the js side will call the invokeAction method of the js side.
    */
    sendJsSide(){
        // create an object to send the action name and action parameters to the js side
        const dataToSend = {
            actionName : this.actionName,
            actionParameters : this.actionParameters
        }
    
        return dataToSend;        // return the dataToSend object
    }

    /**
     * @param {boolean} sendFlag
     * @param {object} node
     * @description Save the parameters
     */
    // Save the parameters. This method is used to save the parameters of the current action.
    // This method is called when the edit dialog is closed or cancelled. Because when the edit dialog is closed or cancelled, the parameters should be saved. To be able to send the parameters to the js side.  
    // And this method is useful when the edit dialog is reopened, the parameters should be saved to be able to display the previous parameters.
    saveParameters(sendFlag,node){
        //
        this.actionParameters.forEach(parameter=>{
            var inputElement = $(`#${parameter.name}`);
            parameter.value = inputElement.val();                          // get parameter value from the input element
            parameter.typedInputType = inputElement.typedInput('type');    // get the typedInputType of the parameter
        })

        // if the sendFlag is true, send the action name and action parameters to the js side
        /*
            This control is made because this method is called inside of the handleInvokeAction method.
            And this method is used for handling the invoke action for html side. Therefore, when the sendFlag is true, send the action name and action parameters to the js side.
        */
        if(sendFlag === true){
            node.agentCurrentActionParametersInfo = this.sendJsSide();
        }

        /*
            Below code is used to set the dirty flag as true. This is important because when the parameters are changed, the dirty flag should be set as true.
            Just because of node-red configuration sometimes does not save the changes. Therefore, to avoid this problem, the dirty flag should be set as true.
        */
        RED.nodes.dirty(true);                                    // set the dirty flag as true

        // set the node name as the name input element value
        node.name = document.getElementById('node-input-name').value;

    }

    /**
     * @description Convert the action parameters to json string
     * @returns jsonString {string}
     */
    // Convert the action parameters to json string. This method is used to convert the action parameters to json string to be able to use invoke action method of the html side.
    // This method is called in the handleInvokeAction method and result is given as parameter to the invokeAction method of the html side.
    toJsonString() {

        // if the action parameters length is 0, return an empty json string
        if(this.actionParameters.length === 0){
            return "{}";
        }

        var actualValue;
        var valueAsPassed;
        var jsonString = "{";
        var count = 0;
        var length = this.actionParameters.length - 1;
        // create a json string for the action parameters
        this.actionParameters.forEach(parameter => {
            jsonString += "\"" + parameter.name + "\":";                                                     // add the parameter name to the json string
            actualValue = parameter.value;                                                                   // get the parameter value
            parameter.type === "string" ? valueAsPassed = `"${actualValue}"` : valueAsPassed = actualValue;  // if the parameter type is string, add the value as a string, otherwise add the value as it is
            jsonString += valueAsPassed;                                                                     // add the value to the json string
            count !== length ? jsonString += "," : jsonString += "}";                                        // if the parameter is not the last parameter, add a comma, otherwise add a closing curly brace
            count++;                                                                                         // increase the count
        });
     
        return jsonString;                                                                                   // return the json string
    }

    /**
     * @description Invoke the action
     * @param {string} queryString
     */
    // Invoke the action. This method is used to invoke the action of the agent. 
    /*
        As mentioned above, There are two invokeAction method. One of them is in js side, the other one is in html side. This is for html side.
    */
    async invokeAction(queryString){
        // create the url for the action depending on the action name
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
            // get the result of the action
            var result = response.json();
            // return the result
            return result;

        } catch (error) {
            console.log(error);
            return null;
        }

    }

    /**
     * @description Handle the invoke action
     * @param {object} node
     */
    // Handle the invoke action. This method is used to handle the invoke action of the agent.
    async handleInvokeAction(node){
        // Here is important because when the invoke action button is clicked, the parameters should be saved to be able to use parameter values for invoking the action.
        this.saveParameters(false,node);
        // convert the action parameters to json string
        var query_string = this.toJsonString();
        console.log("Parameters");
        console.log(this.actionParameters);
        console.log(query_string);
        // invoke the action
        var result = await this.invokeAction(query_string);
        // display the result
        $("#result-text").text(result);
        // remove the hidden class from the result-container div to display the result
        $("#result-container").removeClass("hidden");
    }

}


// Parameter class is used to create parameter objects
class Parameter {
    /**
     * @description Constructor of the Parameter class
     * @param {string} name
     * @param {string} type
     * @param {string} value
     */
    constructor(name, type, value = "") {
        this.name = name;                                         // assign the name to the name
        this.type = type;                                         // assign the type to the type
        this.value = value;                                       // assign the value to the value
        this.typedInputType = "str";                              // assign the typedInputType as str
        /*
            Do not forget that the typedInputType is used to get the type of the parameter whether it is a str or a msg.
            It is not type of the parameter. It is type of input.
            Depending on the this info we get the parameter value from input element or previous node's output.
        */
    }
}


/*
    Below are the agent names, labels, colors, icons, categories, number of inputs and outputs of the agents.
    These are used to create agent objects and to display the agents in the node-red editor.
    Here we can change the properties without directing to the html files of the nodes.
    It is important because it makes the code more organized and clean and avoid redundancy.
    And it is useful to change the properties of the agents without changing the html files of the nodes.
*/

// if you add another agent you can first add the agent properties here and then add the agent to the html files of the nodes.

const invokeActionAgentName = "InvokeActionAgent";
const invokeActionAgentLabel = "Invoke Action Agent";
const invokeActionAgentColor = "yellow";
const invokeActionAgentIcon = "invoke-action-agent";
const invokeActionAgentCategory = "ZEKI";
const invokeActionAgentNumberOfInputs = 1;
const invokeActionAgentNumberOfOutputs = 1;


const baseAgentName = "BaseAgent";
const baseAgentLabel = "Base Agent";
const baseAgentColor = "gray";
const baseAgentIcon = "base-agent";
const baseAgentCategory = "ZEKI";
const baseAgentNumberOfInputs = 1;
const baseAgentNumberOfOutputs = 1;


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
const wayFindingAgentID = "wayfinding-agent";
const wayFindingAgentColor = "green";
const wayFindingAgentIcon = "wayfinding-agent";
const wayFindingAgentCategory = "ZEKI";
const wayFindingAgentNumberOfInputs = 1;
const wayFindingAgentNumberOfOutputs = 1;

const servletAgentName = "ServletAgent";
const servletAgentLabel = "Servlet Agent";
const servletAgentID = "servlet-agent";
const servletAgentColor = "brown";
const servletAgentIcon = "servlet-agent";
const servletAgentCategory = "ZEKI";
const servletAgentNumberOfInputs = 1;
const servletAgentNumberOfOutputs = 1;

const homeAssistantAgentName = "HomeAssistantAgent";
const homeAssistantAgentLabel = "Home Assistant Agent";
const homeAssistantAgentID = "home-assistant-agent";
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







