const apiUrl = "http://10.42.6.107:8000/agents";                                                        // apiURL for accessing agents
const loginUrl = "http://10.42.6.107:8000/login";                                                       // loginUrl for accessing token. This token will be used for getting agents
var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/common_methods.js';   // import the common_methods
const helper_methods = require(path);

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
        node.username = config.username;
        node.password = config.password;

        /**
         * Event handler for node input.
         * Authenticates with the Opaca service and retrieves actions.
         */
        node.on('input', async function() {
            // Fetch Opaca token and agents, and handle actions
            await helper_methods.fetchOpacaTokenAndAgents(node, node.username, node.password, apiUrl, loginUrl, RED);
        });
    }

    // Register the node type in Node-RED
    RED.nodes.registerType("opaca-access", OpacaAccesNode);
};
