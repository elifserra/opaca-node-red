// Description: This file contains the common methods used by the nodes in js side in the package.

// This variable is used to store the token that is used to authenticate the user.
/*
    The reason why this opaca token declared as global variable is because it is used in multiple functions in this file.
    fetchOpacaTokenAndAgents function is used to fetch the token and invokeAction function is used to invoke the action by sending the token in the header.
*/
var token = null; 

/**
 * 
 * @param {*} endpoint 
 * @param {*} actionParameters 
 * @param {*} msg 
 */
// This function is used to invoke the action by sending the action parameters to the endpoint.
// The endpoint which is actually action name is the url of the server where the action is to be invoked. 
async function invokeAction(endpoint, actionParameters, msg) {

    var queryString = toJsonString(actionParameters, msg);                                // Convert the action parameters to json string. 

    var url = "http://10.42.6.107:8000/invoke/" + endpoint;                               // The url of the server where the action is to be invoked.
    try {
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${token}`
            },
            body: queryString
        });

        /*
            Below code is very important to implement flow of the data from one node to another node.
            The response from the server is stored in the msg.payload to send the invoke actual result output as input to the next node.
        */
       
        await response.json().then(data => {
            msg.payload = data;                                 // Store the response from the server in the msg.payload.
            console.log("Response from the server: ", data);    // Log the response from the server.
        });

    } catch (error) {
        console.error('Error:', error);
    }
}




/** 
    * @param {*} parameterArray 
    * @param {*} msg
*/  
// This function is used to convert the action parameters to json string.

/*
    This function is important because it can be changed to convert the parameters to json string in any format.
    If the new type of parameter is added then the conversion of the parameter to json string can be done in this function by adding the new type of parameter.
    for example by adding exchange node required to include the array type of parameter in the action parameters. This will be added in this function.
*/
function toJsonString(parameterArray, msg) {

    if(parameterArray.length === 0){        // If there are no parameters then return empty json
        return "{}";
    }

    var valueAsPassed;
    var jsonString = "{";
    var count = 0;
    var length = parameterArray.length - 1;

    // Loop through the parameters and convert them to json string depending on the type of the parameter.
    parameterArray.forEach(parameter => {
        jsonString += "\"" + parameter.name + "\":"; 
        // here is the condition to check if the parameter is payload and the typedInputType is msg then the value of the parameter is the payload of the msg.
        if(parameter.value === "payload" && parameter.typedInputType === 'msg') {
            // But we need to again make sure control of the parameter type. If the parameter type is array then the value of the parameter is the array of the payload of the msg.
            parameter.type === "array" ? valueAsPassed = "[" + JSON.stringify(msg.payload)+"]":
            // If the parameter type is string then the value of the parameter is the string of the payload of the msg.
            parameter.type === "string" ? valueAsPassed = `"${msg.payload}"` :
            // If the parameter type is not array and string then the value of the parameter is the payload of the msg.
            valueAsPassed = msg.payload;
        }
        else{
            // If the parameter is not payload then the value of the parameter is the value of the parameter.
            // But we need to again make sure control of the parameter type. If the parameter type is array then the value of the parameter is the array of the value of the parameter.
            parameter.type === "array" ? valueAsPassed = "[" + JSON.stringify(parameter.value)+"]":  
            // If the parameter type is string then the value of the parameter is the string of the value of the parameter.
            parameter.type === "string" ? valueAsPassed = `"${parameter.value}"` : 
            // If the parameter type is not array and string then the value of the parameter is the value of the parameter.
            valueAsPassed = parameter.value; 
        }

        jsonString += valueAsPassed; 
        count !== length ? jsonString += "," : jsonString += "}"; 
        count++;
    });


    console.log("Json String: ", jsonString);    // Log the json string.

    return jsonString;        // Return the json string.
}






/**
 * 
 * @param {*} username
 * @param {*} password
 * @param {*} apiUrl
 * @param {*} loginUrl
 * @param {*} RED
 */

// This function is used to fetch the token and the agents from the server. And used by opaca access js file.
async function fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED) {

    var authentication = JSON.stringify({ username, password });    // Convert the username and password to json string.

        // Fetch the token from the server  by sending the username and password.
        var response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: authentication
        });

        // Store the token in the global variable.
        token = await response.text();


        /*
            Here is important. As I mentioned that there are two type invoke action method. One is called by js side and the other is called by hmtl side.
            The global token variable is used in js side invoke action method. But in html side invoke action method, the token is not available.
            So, the token is stored in the RED.httpAdmin.get method. This method is used to send the token to html side.
        */

       // Send the token to the html side.
        RED.httpAdmin.get(`/token`, function(req, res) { 
            res.json({ value: token});
        });
    
        // Fetch the agents from the server by sending the token in the header.
        response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // get the agents from the response.
        const agents = await response.json();

        // Send the agents to the html side. This is actully used by BaseAgent node because it needs to serve as all agents to the html side.
        RED.httpAdmin.get(`/agents`, function(req, res) { 
            res.json({ value: agents});
        });

        // Send the actions of each agent to the html side. This is used by the agent node to get the actions of the agent.
        // Every agent get the actions by sending the agent id to the server.
        agents.forEach(agent => {
            RED.httpAdmin.get(`/${agent.agentId}`, function(req, res) { 
                res.json({ value: agent.actions });
            });
        });

}




/**
 * 
 * @param {*} RED
 * @param {*} node
 * @param {*} config
 */
// This function is used to create the node configuration. It is common for all the nodes.
function makeNodeConfiguration(RED, node, config){
    RED.nodes.createNode(node,config);                                                        // Create the node.
    node.agentCurrentActionParametersInfo = config.agentCurrentActionParametersInfo;          // Store the agent current action parameters info in the node.
    node.on('input', async function(msg){ 
        if(node.agentCurrentActionParametersInfo  != null){
            node.warn(node.agentCurrentActionParametersInfo);                                 // Log the agent current action parameters info.
            // Invoke the action by sending the action parameters to the server. 
            /*
                The invokeAction function is called to invoke the action by sending the action parameters to the server.
                The action name and action parameters are passed to the invokeAction function. Calling this function in node.on('input') method is important.
                This enables the node to invoke the action when the input is received and enavle the flow of the data from one node to another node by sending the output of the action as input to the next node.
            */
            await invokeAction(node.agentCurrentActionParametersInfo .actionName, node.agentCurrentActionParametersInfo.actionParameters, msg);
            node.send(msg);    // Send the output of the action as input to the next node. In invokeAction function, the output of the action is stored in the msg.payload. and send this msg to the next node.
        }
    });
}


module.exports = {
    invokeAction,
    toJsonString,
    fetchOpacaTokenAndAgents,
    makeNodeConfiguration,
};
