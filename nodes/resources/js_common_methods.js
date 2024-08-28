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
async function invokeAction(endpoint, actionParameters,nextNodeMsgChoice, msg) {

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

            let sendedData = {
                data : data,
                nextNodeMsgChoice : nextNodeMsgChoice
            }

            console.log(sendedData);

            msg.payload = sendedData;
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
        jsonString += "\"" + parameter.name + "\":";                                                                // Add the parameter name to the json string.
        if(parameter.typedInputType === 'msg') {                                   // If the parameter is payload and the type of the input is msg then the value of the parameter is the value of the payload.
            if(parameter.type === "array" || parameter.type === "tuple"){                                           // If the parameter type is array or tuple then the value of the parameter is the array of the value of the payload.
                /*
                    When the parameter type is array or tuple then we need to make sure that the value of the payload is array.
                */
                let formattedArray = parameter.value;                               // Get the value of the payload.
                let inputArray = [];                                            // Create an empty array to store the value of the payload.
                // If the size of the msg.payload is greater than 1 then the value of the payload is array of the value of the payload.
                // When msg payload has one element then it is not array. However the parameter type is array. So, in the catch block we push the value of formattedArray to the inputArray.
                // This issue is just about msg payload. The value of the payload is array but it is not recognized as array. So, we need to make sure that the value of the payload is array.
                try{
                    // Push the value of each element of  the payload to the inputArray.
                    formattedArray.forEach(item =>{
                        inputArray.push(item);
                    });
                }                                                      
                catch(e){
                    // If the value of the payload is not array then push the value of the payload to the inputArray to be able to use as array or tuple.
                    inputArray.push(formattedArray);
                }                  
                valueAsPassed = JSON.stringify(inputArray);    // Convert the array to json string.                                                
            }
            else if(parameter.type === "string"){
                valueAsPassed = `"${parameter.value}"`;           // If the parameter type is string then the value of the parameter is the value of the payload.
            }
            else{ 
                valueAsPassed = parameter.value;                 // If the parameter type is not array or string then the value of the parameter is the value of the payload.
            }
        }
        else{
            // If the parameter is not payload then the value of the parameter is the value of the parameter.
            // But we need to again make sure control of the parameter type. If the parameter type is array then the value of the parameter is the array of the value of the parameter.
            if(parameter.type === "array" || parameter.type === "tuple"){
                valueAsPassed = parameter.value.split(",").map(item => item.trim());       // Split the value of the parameter by comma and map each element to the valueasPassed.
            }
            else if(parameter.type === "string"){
                valueAsPassed = `"${parameter.value}"`;                                     // If the parameter type is string then the value of the parameter is the value of the parameter.
            }
            else{
                valueAsPassed = parameter.value;                                           // If the parameter type is not array or string then the value of the parameter is the value of the parameter.
            }
        }

        jsonString += valueAsPassed;                                                      // Add the value of the parameter to the json string.
        count !== length ? jsonString += "," : jsonString += "}";                         // If the parameter is not the last parameter then add comma to the json string. Otherwise add closing curly brace.
        count++;                                                                          // Increment the count.
    });

    console.log(jsonString);
    
    /*
        Here I add the console.log to log the json string. This is important to log the json string to see the format of the json string.
        If somebody will imporove this project, this method is crucial to see the format of the json string.
        I believe this method is likely to change in regard to the new type of parameters. So, it is important to log the json string and see the format of the json string.
    */
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
    var allMsgInputs = new Set();
    var msgCounter = 0;
    var control = [];

    node.on('input', async function(msg){ 
        if(node.agentCurrentActionParametersInfo  != null){

            console.log("Input is received");
            console.log(msg.payload);

           var numberOfMsgPayloads = node.agentCurrentActionParametersInfo.actionParameters.filter(parameter => parameter.typedInputType === 'msg').length;

           node.agentCurrentActionParametersInfo.actionParameters.forEach(parameter => {
                if(parameter.typedInputType === 'msg'){
                    allMsgInputs.add(msg.payload);
                }
           });

           if(numberOfMsgPayloads === allMsgInputs.size){
            
                console.log("All inputs are received");
                console.log(allMsgInputs);
                
                                // Set'i diziye dönüştür
                let myArray = Array.from(allMsgInputs);

                // Dizi üzerinde sıralama işlemi yap
                myArray.sort((a, b) => {
                    return a.nextNodeMsgChoice - b.nextNodeMsgChoice;
                });

                console.log(myArray);

                myArray.forEach(item => {
                    var isFound = false;
                    node.agentCurrentActionParametersInfo.actionParameters.forEach(parameter => {    
                        if(parameter.value === "payload" && parameter.typedInputType === 'msg' && isFound === false){
                            parameter.value = item.data;
                            isFound = true;
                        }
                    });
                });


                allMsgInputs = new Set();

                node.warn(node.agentCurrentActionParametersInfo); 

                await invokeAction(node.agentCurrentActionParametersInfo.actionName, node.agentCurrentActionParametersInfo.actionParameters, node.agentCurrentActionParametersInfo.nextNodeMsgChoice, msg);
                node.send(msg);    // Send the output of the action as input to the next node. In invokeAction function, the output of the action is stored in the msg.payload. and send this msg to the next node.
           }
           
           

        }
    });
}


module.exports = {
    invokeAction,
    toJsonString,
    fetchOpacaTokenAndAgents,
    makeNodeConfiguration,
};
