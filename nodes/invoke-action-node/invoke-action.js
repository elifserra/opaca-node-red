/**
 * Function to invoke an action on the server.
 * @param {string} endpoint - The endpoint to invoke the action.
 * @param {string} queryString - The query string to send in the request body.
 * @param {object} msg - The message object to update with the response.
 */
async function invokeAction(endpoint, queryString, msg,node) {
    var url = "http://10.42.6.107:8000/invoke/" + endpoint;
    console.log(`INVOKE ACTIONN"+${node.context().global.get("token")}`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Inform the server that the body is JSON
                
                Authorization: `Bearer ${node.context().global.get("token")}`
                
            },
            body: queryString
        });
        
        await response.json().then(data => {
            msg.payload = data; // Update the message payload with the response data
        });
    } catch (error) {
        console.error("Fetch error: " + error); // Log any errors during the fetch
    }
}

/**
 * Convert an array of parameters to a JSON string.
 * @param {Array} parameterArray - The array of parameters to convert.
 * @returns {string} - The JSON string representation of the parameters.
 */
function toJsonString(parameterArray, msg) {
    var jsonString = "{";
    var length = parameterArray.length - 1;
    var count = 0;

    parameterArray.forEach(element => {
        jsonString += "\"" + element.value.name + "\":"; // Add parameter name

        if(element.value.value === "payload") jsonString += "\"" + msg.payload + "\"";
        else element.value.type === "string" ? jsonString += "\"" + element.value.value + "\"" : jsonString += element.value.value;
        count !== length ? jsonString += "," : jsonString += "}";

        count++;
    });

    console.log(jsonString); // Log the JSON string for debugging
    return jsonString; // Return the JSON string
}

async function setGlobalValue(variableName, value) {
    try {
        const response = await fetch(`http://localhost:3000/variable/${variableName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: value })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
/**
 * Module export function to define the custom Node-RED node.
 * @param {object} RED - The Node-RED module object.
 */
module.exports = function(RED) {
    /**
     * Constructor function for the custom node.
     * @param {object} config - The node configuration object.
     */
    function MyNode(config) {
        RED.nodes.createNode(this, config); // Create the node with the given configuration

        this.paramOutputs = config.paramOutputs; // Parameter outputs from configuration
        this.parameters = config.parameters; // Parameters from configuration
        this.action = config.action; // Action from configuration

        var node = this; // Store the node object

        console.log("from invoke"+node.context().global.get("token"))



        /**
         * Event handler for node input.
         * @param {object} msg - The input message object.
         */
        node.on('input', async function(msg) {
            await invokeAction(node.action, toJsonString(node.paramOutputs,msg), msg,node); // Invoke the action with parameters
            node.send(msg); // Send the updated message object
        });
    }

    // Register the custom node type with Node-RED
    RED.nodes.registerType("invoke-action", MyNode);

    
};