// This node task is to create a new agent node if the opaca framework has a new agent.
// 
module.exports = function(RED) {
    // This function is used to create the node configuration.
    function NodeCreator(config) {
        // Create the node.
        RED.nodes.createNode(this, config);
        const node = this;
        node.on('input', function(msg) {
            msg.payload = "Hello from NodeCreator";
            node.send(msg);
        });
    }
    // Register the node.
    RED.nodes.registerType("NodeCreator", NodeCreator);

};