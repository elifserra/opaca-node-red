module.exports = function(RED) {
    function BaseAgentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
    }
    RED.nodes.registerType("BaseAgent", BaseAgentNode);
}