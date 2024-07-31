


async function getParametersOfSelectedAgent(that){
    console.log("getParametersOfSelectedAgent");
    console.log(that.agentId);
    var data = await fetch(`${that.agentId}`).then(response => response.json());
    that.actions = data.value;
    that.actionsList = that.actions.map(action => action.name);
    that.actionParams = that.actions.map(action => [action.name, action.parameters]);
    console.log(that.actions);
    console.log(that.actionsList);
    console.log(that.actionParams);
    $("#node-input-action").empty().append(`<option value=${that.action}>${that.action}</option>`);
        that.actionsList.forEach(action => {
            $("#node-input-action").append(`<option value="${action}">${action}</option>`);
    });
}


async function getThisAgentNodeActions(that){
    console.log("getThisAgentNodeActions");
    var data = await fetch(`${that.agentId}`).then(response => response.json());
    that.actions = data.value;
    that.actionsList = that.actions.map(action => action.name);
    that.actionParams = that.actions.map(action => [action.name, action.parameters]);
    console.log(that.actions);
    console.log(that.actionsList);
    console.log(that.actionParams);
}

function updateParametersHtmlSection(that){
    console.log("updateParametersHtmlSection");
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
    console.log("applyChangesForAgentChange");
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
    console.log("applyChangesForActionChange");
    that.action = $("#node-input-action").val();
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
    console.log("SAVEVVVVVE");
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
    console.log("commonOnEditPrepareFunction : "+agentId);
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