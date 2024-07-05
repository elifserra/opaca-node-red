var BaseAgent = require("../BaseAgent-node/BaseAgent.js");
module.exports = function(RED) {

    function FridgeAgentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

    }
    RED.nodes.registerType("FridgeAgent", FridgeAgentNode);
}
