var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/constants.js';
const helper_methods = require(path);

module.exports = function(RED){
    function SensorAgentNode(config){
        RED.nodes.createNode(this,config);  
        var node = this;
        node.paramOutputs = config.paramOutputs;
        node.action = config.action;

        node.on('input', async function(msg){   
            await helper_methods.invokeAction(node.action, helper_methods.toJsonString(node.paramOutputs,msg), msg,node); // Invoke the action with parameters
            node.send(msg); // Send the message to the next node
        });

    }
    RED.nodes.registerType("SensorAgent",SensorAgentNode);
}