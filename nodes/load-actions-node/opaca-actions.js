const apiUrl = "http://10.42.6.107:8000/agents";
const loginUrl = "http://10.42.6.107:8000/login";


async function setGlobalValue(variableName, value) {
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

module.exports = function(RED) {
    async function fetchData(node, username, password) {
        var authentication = JSON.stringify({ username, password });
        
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: authentication
            });
            
            const token = await response.text();
            node.context().global.set("token", token);
        } catch (error) {
            console.error("Fetch OPACA error: " + error);
        }
        
        const token = node.context().global.get("token");

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            data.forEach(agent => {
                node.context().global.set(agent.agentId, agent.actions);
            });
            
            const actions = data.flatMap(agent => agent.actions || []);
            return actions;

        } catch (error) {
            node.error("Fetch OPACA SECOND error: " + error);
        }
    }

    function MyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.username = config.username;
        this.password = config.password;

        
        node.on('input', async function() {
           var actions =  await fetchData(node, node.username, node.password);
           node.warn(actions);

        });

        setGlobalValue("token", this.context().global.get("token"));

    }

    RED.nodes.registerType("opaca-actions", MyNode);

    

};
