var token = null;

async function invokeAction(endpoint, actionParameters, msg) {

    var queryString = toJsonString(actionParameters, msg);

    var url = "http://10.42.6.107:8000/invoke/" + endpoint;
    try {
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${token}`
            },
            body: queryString
        });
        
        await response.json().then(data => {
            msg.payload = data; 
        });

    } catch (error) {
        console.error('Error:', error);
    }
}


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
        jsonString += "\"" + parameter.name + "\":"; 
        (parameter.value === "payload" && parameter.typedInputType === 'msg') ? actualValue = msg.payload : actualValue = parameter.value; 
        parameter.type === "string" ? valueAsPassed = `"${actualValue}"` : valueAsPassed = actualValue; 
        jsonString += valueAsPassed; 
        count !== length ? jsonString += "," : jsonString += "}"; 
        count++;
    });

    return jsonString;
}


async function fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED) {

    var authentication = JSON.stringify({ username, password });

        var response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: authentication
        });


        token = await response.text();

        RED.httpAdmin.get(`/token`, function(req, res) { 
            res.json({ value: token});
        });
    
        response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const agents = await response.json();

        RED.httpAdmin.get(`/agents`, function(req, res) { 
            res.json({ value: agents});
        });

        agents.forEach(agent => {
            RED.httpAdmin.get(`/${agent.agentId}`, function(req, res) { 
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
            await invokeAction(node.agentCurrentActionParametersInfo .actionName, node.agentCurrentActionParametersInfo.actionParameters, msg);
            node.send(msg);
        }
    });
}


module.exports = {
    invokeAction,
    toJsonString,
    fetchOpacaTokenAndAgents,
    makeNodeConfiguration,
};
