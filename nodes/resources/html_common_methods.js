async function disp(){
    console.log("kdschdk");
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