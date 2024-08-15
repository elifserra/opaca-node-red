// Description: This is the main file for the camera node. This node is responsible for sending the detected objects to the next node in the flow.
module.exports = function(RED) {

    // This array will store the detected objects
    var detectedObjects = [];

    // This function is responsible for creating the camera node
    function CustomWebcamNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        // This function is responsible for getting the OpenAI API key from the environment variables
        /*
            Do not forget that that environment variable should be saved in computer's environment variables.
        */
        // This function is responsible for getting the OpenAI API key from the environment variables
        var openaiAPIKey = process.env.OPENAI_API_KEY;
        // This function sends the OpenAI API key to the front-end html file in order to get openAI API key from the html file
        RED.httpAdmin.get('/openAIKey', function(req, res) {
            res.json({ value: openaiAPIKey });
        });

        // This function is responsible for getting the detected objects from the front-end html file
        RED.httpAdmin.post('/detectedObjects', function(req, res) {
            detectedObjects = req.body;
            // get the detected objects from the front-end html file
            detectedObjects = detectedObjects["detectedObjects"];
            // display the detected objects in the node red editor
            node.warn(detectedObjects);
        });

        /*
          Here is important first you should make detection in the front-end html file and then send the detected objects to the node red editor.
          Then you can use the inject node to inject the camera node and send the detected objects to the next node in the flow.
        */
        node.on('input', function() {
            // send the detected objects to the next node in the flow
            var msg = {
                payload: detectedObjects[0]
            }
            node.send(msg);
        });

    }
    // Register the camera node
    RED.nodes.registerType("camera", CustomWebcamNode);
    
}
