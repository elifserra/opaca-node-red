var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/common_methods.js';
const helper_methods = require(path);

module.exports = function(RED){
    function FridgeAgentNode(config){
        helper_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("FridgeAgent",FridgeAgentNode);
}