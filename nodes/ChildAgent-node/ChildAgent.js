var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/constants.js';
const constants = require(path);

module.exports = function(RED) {
    function ChildAgentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            constants.sendActionstoHTML('ChildAgent', msg.payload); // Send the action to the HTML
        });
    }
    RED.nodes.registerType("ChildAgent", ChildAgentNode);
}
