var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/common_methods.js';
const helper_methods = require(path);

module.exports = function(RED){
    function ShelfAgentNode(config){
        RED.nodes.createNode(this,config);  
        var node = this;
        node.paramOutputs = config.paramOutputs;
        node.action = config.action;

        node.on('input', async function(msg){   
            console.log(helper_methods.toJsonString(node.paramOutputs,msg));
            await helper_methods.invokeAction(node.action, helper_methods.toJsonString(node.paramOutputs,msg), msg,node); // Invoke the action with parameters
            node.send(msg); // Send the message to the next node
        });

    }
    RED.nodes.registerType("ShelfAgent",ShelfAgentNode);
}