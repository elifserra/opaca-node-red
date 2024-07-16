// This file contains the methods that shared among all the nodes

async function sendActionstoHTML(variableName, value) {
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
 * Function to invoke an action on the server.
 * @param {string} endpoint - The endpoint to invoke the action.
 * @param {string} queryString - The query string to send in the request body.
 * @param {object} msg - The message object to update with the response.
 */
async function invokeAction(endpoint, queryString, msg,node) {
    var url = "http://10.42.6.107:8000/invoke/" + endpoint;
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
    /*var jsonString = "{";
    var length = parameterArray.length - 1;
    var count = 0;

    parameterArray.forEach(element => {
        jsonString += "\"" + element.value.name + "\":"; // Add parameter name

        if(element.value.value === "payload" && element.value.type === "string") jsonString += "\"" + msg.payload + "\"";
        else if(element.value.value === "payload")  jsonString += msg.payload;
        else element.value.type === "string" ? jsonString += "\"" + element.value.value + "\"" : jsonString += element.value.value;
        count !== length ? jsonString += "," : jsonString += "}";

        count++;
    });*/

    var actualValue;
    var valueAsPassed;

    parameterArray.forEach(element => {
        jsonString += "\"" + element.value.name + "\":"; // Add parameter name

        element.value.value === "payload" ? actualValue = msg.payload : actualValue = element.value.value; // if msg.payload is being used
        element.value.type === "string" ? valueAsPassed = `"${actualvalue}"` : valueAsPassed = actualvalue; // if str input is being used

        jsonString += valueAsPassed;
        count !== length ? jsonString += "," : jsonString += "}";

        count++;
    });

    return jsonString; // Return the JSON string
}


async function fetchData(node, username, password, apiUrl, loginUrl) {
    var authentication = JSON.stringify({ username, password });
    
    try {
        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: authentication
        });
        
        const token = await response.text();
        node.context().global.set("token", token);
    } catch (error) {
        console.error("Fetch OPACA error: " + error);
    }
    
    const token = node.context().global.get("token");

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        data.forEach(agent => {
            node.context().global.set(agent.agentId, agent.actions);
            sendActionstoHTML(agent.agentId, agent.actions);
        });
        
        const actions = data.flatMap(agent => agent.actions || []);
        return actions;

    } catch (error) {
        node.error("Fetch OPACA SECOND error: " + error);
    }
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


module.exports = {
    sendActionstoHTML,
    invokeAction,
    toJsonString,
    fetchData,
    setGlobalValue
};
