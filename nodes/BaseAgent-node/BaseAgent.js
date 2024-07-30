var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/common_methods.js';
const helper_methods = require(path);

module.exports = function(RED){

    function BaseAgent(config){
        RED.nodes.createNode(this,config);  
        var node = this;
        node.paramOutputs = config.paramOutputs;
        node.action = config.action;
        
        node.on('input', async function(msg){   
            await helper_methods.invokeAction(node.action, helper_methods.toJsonString(node.paramOutputs,msg), msg,node);
            node.send(msg); 
        });

    }
    RED.nodes.registerType("BaseAgent",BaseAgent);
}