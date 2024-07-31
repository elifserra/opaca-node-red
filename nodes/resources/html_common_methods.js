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


async function commonOnEditPrepareFunction(agentId){
    var that = this;
    that.agentId = agentId;

    await getThisAgentNodeActions(that);

    updateParametersHtmlSection(that);

    $("#node-input-agentId").on('change', async function() {
        applyChangesForAgentChange(that);
    }.bind(this));

    $("#node-input-action").empty().append(`<option value=${that.action}>${that.action}</option>`);
    that.actionsList.forEach(action => {
        $("#node-input-action").append(`<option value="${action}">${action}</option>`);
    });

    $("#node-input-action").on('change', function(){
        applyChangesForActionChange(that);
    }.bind(this)); 
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
        // Append the fetched HTML template to the form
        document.querySelector('#dialog-form').innerHTML += data;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

async function invokeActionn(endpoint, queryString,node) {

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

function toJsonStringgg(parameterArray) {
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
        var query_string = toJsonStringgg(that.paramOutputs);
        var result = await invokeActionn(that.action,query_string,that); // Invoke the action with parameters
        // Show the result in the result container
        const resultContainer = document.getElementById('result-container');
        const resultText = document.getElementById('result-text');
        resultText.textContent = result;
        resultContainer.classList.remove('hidden');
    })
}
