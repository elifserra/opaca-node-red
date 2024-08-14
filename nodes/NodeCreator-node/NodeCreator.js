module.exports = function(RED) {

    function NodeCreator(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', function(msg) {
            msg.payload = "Hello from NodeCreator";
            node.send(msg);
        });
    }
    RED.nodes.registerType("NodeCreator", NodeCreator);

};