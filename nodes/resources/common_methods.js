var token = null;

async function invokeAction(endpoint, actionParameters, msg, node) {
    // Construct the URL for the API call

    var queryString = toJsonString(actionParameters, msg); // Convert the action parameters to a JSON string

    var url = "http://10.42.6.107:8000/invoke/" + endpoint;
    try {
        // Make a POST request to the specified URL with the query string
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${token}`
            },
            body: queryString
        });
        //${node.context().global.get("token")}
        // Parse the JSON response and set the payload of the message
        await response.json().then(data => {
            msg.payload = data; 
        });

        console.log("INVOKEEE");
        console.log(msg.payload);

    } catch (error) {
        // Log any errors that occur during the API call
        node.error("INVOKE ACTION ERROR : " + error);    // In case of any error, this is displayed on the debug screen of node-red website
    }
}

/** TOJSONSTRING METHOD
 * Converts an array of parameters into a JSON string.
 * 
 * @param {array} parameterArray - An array of parameters to convert into JSON.
 * @param {object} msg - The message object from Node-RED containing payload and other information.
 * @returns {string} - The JSON string representation of the parameters.
 */
// This method is called by all agents {BaseAgent, FridgeAgent, HomeAssistantAgent, RoomBookingAgent, SensorAgent, ShelfAgent, WayFindingAgent}
// Actually, this methods returns the value that is a parameter for invokeAction method
function toJsonString(parameterArray, msg) {


    if(parameterArray.length === 0){
        return "{}";
    }

    var actualValue;
    var valueAsPassed;
    var jsonString = "{";
    var count = 0;
    var length = parameterArray.length - 1;

    parameterArray.forEach(parameter => {
        jsonString += "\"" + parameter.name + "\":"; // Add the parameter name to the JSON string
        (parameter.value === "payload" && parameter.typedInputType === 'msg') ? actualValue = msg.payload : actualValue = parameter.value; // Determine the actual value based on the parameter type and value
        parameter.type === "string" ? valueAsPassed = `"${actualValue}"` : valueAsPassed = actualValue; // Determine the value to pass based on the parameter type
        jsonString += valueAsPassed; // Add the value to the JSON string
        count !== length ? jsonString += "," : jsonString += "}"; // Add a comma if this is not the last element
        count++;
    });

    return jsonString;
}

/** FETCHOPACATOKENANDAGENTS METHOD
 * Fetches a token and retrieves agents, setting them in the Node-RED context.
 * 
 * @param {object} node - The Node-RED node context, used for logging errors and accessing global context.
 * @param {string} username - The username for authentication.
 * @param {string} password - The password for authentication.
 * @param {string} apiUrl - The API URL to fetch agents.
 * @param {string} loginUrl - The URL for logging in to obtain the token.
 * @param {object} RED - The RED object for accessing Node-RED administrative functions. Here it is used for posting every agent actions using node-red official httpAdmin. Endpoint is the agent-id
 */
// This method is called by just Opaca Action node to get the opaca token and agents
async function fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED) {
    // Create the authentication payload by stringifying username and password.
    var authentication = JSON.stringify({ username, password });
        // Make a POST request to the login URL to obtain a token
        var response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: authentication
        });

        // Extract the token from the response
        token = await response.text();

        RED.httpAdmin.get(`/token`, function(req, res) { // This is for sending all agents. Because invoke action node use all agents actions together
            res.json({ value: token});
        });
        //node.context().global.set("token", token);
    
        // Make a GET request to the API URL to fetch agents
        response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Parse the response to get the list of agents
        const agents = await response.json();

        RED.httpAdmin.get(`/agents`, function(req, res) { // This is for sending all agents. Because invoke action node use all agents actions together
            res.json({ value: agents});
        });

        // Set up routes for each agent to retrieve their actions
        agents.forEach(agent => {
            RED.httpAdmin.get(`/${agent.agentId}`, function(req, res) { // Every agent id is used as a enpoint.
                res.json({ value: agent.actions });
            });
        });

}

function makeNodeConfiguration(RED, node, config){
    RED.nodes.createNode(node,config);  
    node.agentCurrentActionParametersInfo = config.agentCurrentActionParametersInfo;
    node.on('input', async function(msg){ 
        if(node.agentCurrentActionParametersInfo  != null){
            node.warn(node.agentCurrentActionParametersInfo);
            await invokeAction(node.agentCurrentActionParametersInfo .actionName, node.agentCurrentActionParametersInfo.actionParameters, msg,node);
            node.send(msg);
        }
    });
}


function makeConfiguration(RED, node, config){

}



// Export the functions as a module
module.exports = {
    invokeAction,
    toJsonString,
    fetchOpacaTokenAndAgents,
    makeNodeConfiguration,
    makeConfiguration
};
