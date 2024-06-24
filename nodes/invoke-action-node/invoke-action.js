
module.exports = function(RED) {
    function MyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', async function(msg) {
            
            node.send(msg);
        });
    }
    RED.nodes.registerType("invoke-action", MyNode);
}
