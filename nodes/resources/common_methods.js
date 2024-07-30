/*
    The purpose of the common_methods.js file is to define and manage constants and utility functions that are used across the Node-RED custom nodes.
    This file includes functions like invokeAction, which is used to asynchronously invoke actions on specified endpoints, handle responses, and manage errors.
    The constants and functions in this file are intended to be reusable and provide a centralized location for common operations,
    ensuring consistency and reducing code duplication across different parts of the Node-RED application.
*/


/** INVOKE ACTION METHOD
 * Asynchronously invokes an action on a specified endpoint, sending a query string and handling the response.
 * 
 * @param {string} endpoint - The specific endpoint to call on the server.
 * @param {string} queryString - The query string to send in the body of the POST request.
 * @param {object} msg - The message object from Node-RED containing payload and other information.
 * @param {object} node - The Node-RED node context, used for logging errors and accessing global context.
 */
// This method is called by all agents {BaseAgent, FridgeAgent, HomeAssistantAgent, RoomBookingAgent, SensorAgent, ShelfAgent, WayFindingAgent}
async function invokeAction(endpoint, queryString, msg, node) {
    // Construct the URL for the API call
    var url = "http://10.42.6.107:8000/invoke/" + endpoint;
    try {
        // Make a POST request to the specified URL with the query string
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${node.context().global.get("token")}`
            },
            body: queryString
        });

        // Parse the JSON response and set the payload of the message
        await response.json().then(data => {
            msg.payload = data; 
        });

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
    var actualValue;
    var valueAsPassed;
    var jsonString = "{";
    var count = 0;
    var length = parameterArray.length - 1;

    // Loop through each element in the parameter array
    parameterArray.forEach(element => {
        // Add the parameter name to the JSON string
        jsonString += "\"" + element.value.name + "\":"; 

        // Determine the actual value based on the parameter type and value
        element.value.value === "payload" ? actualValue = msg.payload : actualValue = element.value.value; 
        element.value.type === "string" ? valueAsPassed = `"${actualValue}"` : valueAsPassed = actualValue;

        // Add the value to the JSON string
        jsonString += valueAsPassed;

        // Add a comma if this is not the last element
        count !== length ? jsonString += "," : jsonString += "}";
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
async function fetchOpacaTokenAndAgents(node, username, password, apiUrl, loginUrl, RED) {
    // Create the authentication payload by stringifying username and password.
    var authentication = JSON.stringify({ username, password });
    try {
        // Make a POST request to the login URL to obtain a token
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: authentication
        });

        // Extract the token from the response
        const token = await response.text();
        node.context().global.set("token", token);
        
    } catch (error) {
        // Log any errors that occur during the token fetch
        node.error("FETCH OPACA TOKEN ERROR : " + error);
    }

    // Retrieve the token from the global context
    const token = node.context().global.get("token");
    
    try {
        // Make a GET request to the API URL to fetch agents
        const response = await fetch(apiUrl, {
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

    } catch (error) {
        // Log any errors that occur during the agent fetch
        node.error("FETCH OPACA AGENTS ERROR: " + error);
    }
}

// Export the functions as a module
module.exports = {
    invokeAction,
    toJsonString,
    fetchOpacaTokenAndAgents
};
