// Description: This file contains the code for the node that invokes the action on the device.
module.exports = function(RED) {

    function MyNode(config) {
        RED.nodes.createNode(this, config);                                // creating the node
        var node = this;                                                   // creating a reference to the node

        // Retrieve the parameters from the configuration node 
        node.name = config.name;                                          // name of the node
        node.action = config.action;                                      // selected action to be invoked
        node.actionsList = config.actionsList;                            // list of actions
        node.actionParams = config.actionParams;                          // map arameters of the action
        node.parameters = config.parameters;                              // list of parameters

        node.on('input', function(msg) {   
            node.warn(config.action);   
            node.warn(config.actionsList);
            node.warn(config.parameters);    
            msg.payload = node.parameters;
            node.send(msg);                                               // sending the message to the next node 
        });

    }
    
   RED.nodes.registerType("invoke-action", MyNode);                       // registering the node

}

/*
oneditprepare: async function() {

    var that = this;
    
    if(that.parameters){
        that.paramsHtml = "";
        for (var key in that.parameters) {
            that.paramsHtml += `<label for="${key}">${key}</label><input type="text" id="${key}" value="${that.parameters[key]}" placeholder="${that.parameters[key]}">`;
        }
    }
    
       
    $("#save-parameters-button").on('click', function () {

        that.nodeParametersBoxes.forEach(box => {
            var inputElement = $(`#${box.id}`);
            box.value = inputElement.val(); // Get the value of each input element
            that.parameters[box.id] = box.value;
        });

        console.log("Save parameters button clicked");
        //console.log(this.parameters);

    }.bind(this));

    async function fetchData() {
        const apiUrl = "http://localhost:8000/agents";
        var actList = [];    
        try {
            const response = await fetch(apiUrl, { method: 'GET' });
            const actions = [];
            const data = await response.json();
            data.forEach(agent => {
                if (agent.actions) {
                    agent.actions.forEach(action => {
                        actions.push(action);
                    });
                }
            });
            return actions;
        } catch (error) {
            console.error("Fetch error:", error);   
            return null;    
        }
    }


    var actions = await fetchData();                                                     // Fetch actions from API
    that.actionsList = actions.map(action => action.name);                               // Actions list
    that.actionParams = actions.map(action => [action.name,action.parameters]);          // Action parameters as key-value pairs key: {name: param}


    $("#node-input-action").empty().append(`<option value="${that.action}">${that.action}</option>`);
    that.actionsList.forEach(action => {
        $("#node-input-action").append(`<option value="${that.action}">${that.action}</option>`);
    });

    $("#parameters-container").empty().append(that.paramsHtml);

    $("#node-input-action").on('change', function() {
        that.action = $("#node-input-action").val();
        var selectedActionParams = that.actionParams.find(action => action[0] === that.action);
        var params = selectedActionParams[1];
        that.paramsHtml = "";
        that.parameters = [];
        that.nodeParametersBoxes = [];
        for (var key in params) {
            that.paramsHtml += `<label for="${key}">${key}</label><input type="text" id="${key}" placeholder="${params[key].type}">`;
            that.nodeParametersBoxes.push({ id: `${key}`, value: null });                     // Store the input boxes to access them later
        }
        $("#parameters-container").empty().append(that.paramsHtml);
    }.bind(this));



},



oneditsave: function() { 
    
    var that = this;

    that.nodeParametersBoxes.forEach(box => {
        var inputElement = $(`#${box.id}`);
        box.value = inputElement.val(); // Get the value of each input element
        that.parameters[box.id] = box.value;
    });
    
}
*/