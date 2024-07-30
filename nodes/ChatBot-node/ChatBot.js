module.exports = function(RED) {
    function ChatBot(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var openaiAPIKey = process.env.OPENAI_API_KEY;
        var loginUrl = process.env.LOGIN_URL;
        console.log("Login URL: " + loginUrl);
        console.log("OpenAI API Key: " + openaiAPIKey);
        RED.httpAdmin.get('/openAIKey', function(req, res) {
            res.json({ value: openaiAPIKey });
        });


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
            node.warn(openaiAPIKey);
            node.send(msg);
        });
    }
    RED.nodes.registerType("ChatBot", ChatBot);
};