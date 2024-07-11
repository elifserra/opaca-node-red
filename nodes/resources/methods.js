async function getActionsFromJavaScript(variableName){
    const response = await fetch(`http://localhost:3000/variable/${variableName}`, { method: 'GET' });
    const data = await response.json();
    return data.value;
}

async function getData(that){
    console.log("Agent ID changedddddddddddddddddddddddd");
    that.actions = await getActionsFromJavaScript(that.agentId);
    that.actionsList = that.actions.map(action => action.name);
    that.actionParams = that.actions.map(action => [action.name, action.parameters]);
    $("#node-input-action").empty().append(`<option value=${that.action}>${that.action}</option>`);
        that.actionsList.forEach(action => {
            $("#node-input-action").append(`<option value="${action}">${action}</option>`);
    });
}


async function saveParameters(node) {
    var types = {};
    node.nodeParametersBoxes.forEach(box => {
        var inputElement = $(`#${box.id}`);
        box.value = inputElement.val(); // Retrieve the value from the input field.
        types[box.id] = inputElement.typedInput('type');
    });

    node.defaultTypes = types;

    console.log(node.defaultTypes);

    var parameters = {};
    node.nodeParametersBoxes.forEach(box => {
        parameters[box.id] = box.value; // Assign values to parameters.
        node.paramOutputs.forEach(param => {
            if (param.id === box.id) {
                param.value.value = box.value; // Update parameter output values.
            }
        });
    });

    node.parameters = parameters;
    console.log(node.parameters);

    RED.nodes.dirty(true); // Mark node as dirty to indicate changes.
    RED.nodes.node(node.id).parameters = node.parameters;
    RED.nodes.node(node.id).paramOutputs = node.paramOutputs;

}

export {getData, saveParameters, getActionsFromJavaScript};