async function invokeAction(endpoint,queryString,msg,node) {
    var url = "http://10.42.6.107:8000/invoke/" + endpoint;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${node.context().global.get("token")}`
            },
            body: queryString
        });
        
        await response.json().then(data => {
            msg.payload = data; 
        });

    } catch (error) {
        node.error("INVOKE ACTION ERROR : " + error);
    }
}

function toJsonString(parameterArray, msg) {

    var actualValue;
    var valueAsPassed;
    var jsonString = "{";
    var count = 0;
    var length = parameterArray.length - 1;

    parameterArray.forEach(element => {

        jsonString += "\"" + element.value.name + "\":"; 

        element.value.value === "payload" ? actualValue = msg.payload : actualValue = element.value.value; 
        element.value.type === "string" ? valueAsPassed = `"${actualValue}"` : valueAsPassed = actualValue;

        jsonString += valueAsPassed;
        count !== length ? jsonString += "," : jsonString += "}";

        count++;
    });

    return jsonString;
}


async function fetchOpacaTokenAndAgents(node, username, password, apiUrl, loginUrl,RED) {
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
        node.error();("FETCH OPACA TOKEN ERROR : " + error);
    }
    
    const token = node.context().global.get("token");
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const agents = await response.json();
        agents.forEach(agent => {
            RED.httpAdmin.get(`/${agent.agentId}`, function(req, res) {
                res.json({ value: agent.actions });
            });
        });

    } catch (error) {
        node.error("FETCH OPACA AGENTS ERROR: " + error);
    }
}

module.exports = {
    invokeAction,
    toJsonString,
    fetchOpacaTokenAndAgents
};
