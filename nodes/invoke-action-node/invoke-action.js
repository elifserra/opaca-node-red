const apiUrl = "http://localhost:8000/agents";

var actionParams;
async function fetchData(node) {
        
    try {
        const response = await fetch(apiUrl, {
            method: 'GET'
        });

        const actions = [];
        await response.json().then( data => {
            data = data.map(o => o.actions);
            
            data.forEach(element =>
                element.forEach(element =>
                    actions.push(element)
                )
            );
            
        }
        );
        actionParams = actions.map(action => [action.name,action.parameters]);
        
       
    } catch (error) {
        node.error("Fetch error: " + error);
    }
}


module.exports = function(RED) {

    function MyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.parameters = config.parameters;

        //node.warn(config.parameters);

        node.on('input', async function(msg) {

            msg.payload = this.parameters;
            node.send(msg);
        });
    }
    
   RED.nodes.registerType("invoke-action", MyNode);

}

