const apiUrl = "http://localhost:8000/agents";

module.exports = function(RED) {
    async function fetchData(node) {
        
        try {
            const response = await fetch(apiUrl, {
                method: 'GET'
            });
            const actions = [];
            const data = await response.json().then( data => {
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
            return null;
        }
    }
    function MyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', async function(msg) {
            const x = fetchData(node);
        });
    }
    RED.nodes.registerType("opaca-actions", MyNode);
}
