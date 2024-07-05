async function sendActionstoHTML(variableName, value) {
    try {
        const response = await fetch(`http://localhost:3000/variable/${variableName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: value })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = function(RED){
    function ShelfAgentNode(config){
        RED.nodes.createNode(this,config);  
        var node = this;
        this.agentId = config.agentId;
        this.actions = config.actions;

        var actions = node.context().global.get(this.agentId);
        sendActionstoHTML(`actions`, actions);

        node.on('input', async function(msg){   
            node.send({payload : actions}); // Send the actions to the next node
            node.warn(actions); // Log the actions for debugging
        });

    }
    RED.nodes.registerType("ShelfAgent",ShelfAgentNode);
}