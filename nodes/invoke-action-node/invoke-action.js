// Import the helper methods from the specified path
var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/common_methods.js';
const helper_methods = require(path);

module.exports = function(RED) {
    /**
     * Node-RED custom node definition for "invoke-action".
     * This node invokes an action on a specified endpoint, sending a query string and handling the response.
     * 
     * @param {object} config - Node configuration provided by the Node-RED editor.
     */
    function InvokeActionNode(config) {
        // Create the node with the provided configuration
        RED.nodes.createNode(this, config);
        var node = this; 
        node.paramOutputs = config.paramOutputs; // Parameters for the action
        node.action = config.action; // The action to be invoked

        /**
         * Event handler for node input.
         * Invokes the specified action with the given parameters.
         * 
         * @param {object} msg - The message object from Node-RED containing payload and other information.
         */
        node.on('input', async function(msg) {
            // Invoke the action with parameters
            await helper_methods.invokeAction(node.action, helper_methods.toJsonString(node.paramOutputs, msg), msg, node);
            // Send the updated message object
            node.send(msg);
        });
    }

    // Register the node type in Node-RED
    RED.nodes.registerType("invoke-action", InvokeActionNode);
};
