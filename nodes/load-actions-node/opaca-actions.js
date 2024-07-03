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

        console.log("Global value set: ", value);
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
            console.log("Token obtained: ", token);
        } catch (error) {
            console.error("Fetch error: " + error);
        }
        
        const token = node.context().global.get("token");
        console.log("Stored token: ", token);

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            const actions = data.flatMap(agent => agent.actions || []);
            node.warn(new Map(actions.map(i => [i.name, i])));
        } catch (error) {
            node.error("Fetch error: " + error);
        }
    }

    function MyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.username = config.username;
        this.password = config.password;

        node.on('input', async function() {
            await fetchData(node, this.username, this.password);
        });

        setGlobalValue("token", this.context().global.get("token"));

    }

    RED.nodes.registerType("opaca-actions", MyNode);

    

};
