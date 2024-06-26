// Description: This file contains the code for the node that invokes the action on the device.
module.exports = function(RED) {

    function MyNode(config) {
        RED.nodes.createNode(this, config);                                // creating the node
        var node = this;                                                   // creating a reference to the node

        // Retrieve the parameters from the configuration node 
        node.name = config.name;                                          // name of the node
        node.action = config.action;                                      // selected action to be invoked
        node.actionsList = config.actionsList;                            // list of actions
        node.actionParams = config.actionParams;                          // map arameters of the action
        node.parameters = config.parameters;                              // list of parameters

        node.on('input', function(msg) {      
            node.warn(node.parameters);    
            msg.payload = node.parameters;
            node.send(msg);                                               // sending the message to the next node 
        });

    }
    
   RED.nodes.registerType("invoke-action", MyNode);                       // registering the node

}
