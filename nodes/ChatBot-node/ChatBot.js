module.exports = function(RED) {
    function ChatBot(config) {
        RED.nodes.createNode(this, config);
        var node = this;


        // Event listener kurma
        RED.events.on('input', function(event) {
            node.warn("ChatBot node received message: " + JSON.stringify(event.payload));
            if (event.id === node.id) {
                node.warn("ChatBot node received message: " + JSON.stringify(event.payload));
                
                // Alınan mesajı işleme ve başka bir node'a gönderme
                var msg = { payload: event.payload };
                node.send(msg);
            }
        });

        node.on('input', function(msg) {
            node.warn("ChatBot node called");
            node.send(msg);
        });
    }
    RED.nodes.registerType("ChatBot", ChatBot);
};