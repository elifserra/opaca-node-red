const apiUrl = "http://10.42.6.107:8000/agents";                                                        // apiURL for accessing agents
const loginUrl = "http://10.42.6.107:8000/login";                                                       // loginUrl for accessing token. This token will be used for getting agents
var common_methods_path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/common_methods.js';   // import the common_methods
const helper_methods = require(common_methods_path);

module.exports = function(RED) {
    /**
     * Node-RED custom node definition for "opaca-access".
     * This node authenticates with the Opaca service, retrieves available actions,
     * and makes them available within Node-RED.
     * 
     * @param {object} config - Node configuration provided by the Node-RED editor.
     */
    function OpacaAccesNode(config) {
        // Create the node with the provided configuration
        RED.nodes.createNode(this, config);
        var node = this;
        //node.username = config.credentials.username;
        //node.password = config.credentials.password;

        /**
         * Event handler for node input.
         * Authenticates with the Opaca service and retrieves actions.
         */
        node.on('input', async function() {
            // Fetch Opaca token and agents, and handle actions
            await helper_methods.fetchOpacaTokenAndAgents(node.username, node.password, apiUrl, loginUrl, RED);
        });
    }

    // Register the node type in Node-RED
    RED.nodes.registerType("opaca-access", OpacaAccesNode, {
        credentials: {
            username: { type: "text" },
            password: { type: "password" }
        }
    });
        // Create an HTTP endpoint for authorization
    RED.httpAdmin.post('/opaca-access/authorize', function(req, res) {
        const { username, password} = req.body;
        helper_methods.fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED)
            .then(() => res.json({ success: true }))
            .catch(err => res.json({ success: false, error: err.message }));
    });
};
