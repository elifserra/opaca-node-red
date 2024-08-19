module.exports = function(RED) {
    function ChatBot(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var openaiAPIKey = process.env.OPENAI_API_KEY;
        RED.httpAdmin.get('/openAIKey', function(req, res) {
            res.json({ value: openaiAPIKey });
        });
    }
    RED.nodes.registerType("ChatBot", ChatBot);
};