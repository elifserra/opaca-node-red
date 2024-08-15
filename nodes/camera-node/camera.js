module.exports = function(RED) {

    var detectedObjects = [];

    function CustomWebcamNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.detectedObjects = config.detectedObjects;
        var openaiAPIKey = process.env.OPENAI_API_KEY;
        RED.httpAdmin.get('/openAIKey', function(req, res) {
            res.json({ value: openaiAPIKey });
        });

        

        RED.httpAdmin.post('/detectedObjects', function(req, res) {
            detectedObjects = req.body;
            detectedObjects = detectedObjects["detectedObjects"];
            
            node.warn(detectedObjects);

        });

        node.on('input', function() {
            var msg = {
                payload: detectedObjects[0]
            }
            node.send(msg);
        });

    }
    RED.nodes.registerType("camera", CustomWebcamNode);
    
}
