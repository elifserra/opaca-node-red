const apiUrl = "http://localhost:8000/agents";

module.exports = function(RED) {
    async function fetchData(node) {
        
        try {
            const response = await fetch(apiUrl, {
                method: 'GET'
            });

            // Retrieve the parameters from the configuration node
            node.name = config.name;
            node.action = config.action;
            node.parameters = config.parameters;


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
        
            node.warn(new Map(actions.map(i => [i.name, i]))) ;
        } catch (error) {
            node.error("Fetch error: " + error);
        }
    }
    function MyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', async function(msg) {
            fetchData(node);

            const action = node.action;
            const parameters = JSON.parse(node.parameters);

            // Example usage
            node.warn(`Action: ${action}, Parameters: ${JSON.stringify(parameters)}`);

        });
    }
    RED.nodes.registerType("opaca-actions", MyNode);
}
