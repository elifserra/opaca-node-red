// Import the helper methods from the specified path
var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/common_methods.js';
const helper_methods = require(path);

module.exports = function(RED) {
    function InvokeActionNode(config) {
        helper_methods.makeNodeConfiguration(RED, this, config);
    }

    RED.nodes.registerType("invoke-action", InvokeActionNode);
};
