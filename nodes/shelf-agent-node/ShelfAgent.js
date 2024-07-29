var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/constants.js';
const helper_methods = require(path);

module.exports = function(RED){
    function ShelfAgentNode(config){
        RED.nodes.createNode(this,config);  
        var node = this;
        this.paramOutputs = config.paramOutputs;
        this.parameters = config.parameters;
        this.action = config.action;
        this.agentId = config.agentId;
        this.actions = config.actions;

        var actions = null;
        try{
            actions = node.context().global.get(this.agentId);
        }
        catch(error){
            
        }
    

        node.on('input', async function(msg){   
            console.log(helper_methods.toJsonString(node.paramOutputs,msg));
            await helper_methods.invokeAction(node.action, helper_methods.toJsonString(node.paramOutputs,msg), msg,node); // Invoke the action with parameters
            node.send(msg); // Send the message to the next node
            node.warn(actions); // Log the actions for debugging
        });

    }
    RED.nodes.registerType("ShelfAgent",ShelfAgentNode);
}