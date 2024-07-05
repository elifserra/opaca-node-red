module.exports = function(RED) {

    function HomeAssistantNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

    }
    RED.nodes.registerType("HomeAssistantAgent", HomeAssistantNode);
}
