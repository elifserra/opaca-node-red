module.exports = function(RED) {
    function ChatBot(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var openaiAPIKey = process.env.OPENAI_API_KEY;
        RED.httpAdmin.get('/openAIKey', function(req, res) {
            res.json({ value: openaiAPIKey });
        });

        node.on('input', function(msg) {
            node.warn("ChatBot node called");
            node.warn(openaiAPIKey);
            node.send(msg);
        });
    }
    RED.nodes.registerType("ChatBot", ChatBot);
};