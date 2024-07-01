async function invokeAction(endpoint, queryString, msg){
    var url = "http://localhost:8000/invoke/" + endpoint;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Inform the server that the body is JSON
            },
            body: queryString
        })
        
        await response.json().then( data => {
            msg.payload = data;
        }
            
        );
       
    } catch (error) {
        console.error("Fetch error: " + error);
    }
}



function toJsonString(parameterArray) {

    //console.log("inside the function");
    var jsonString = "{";
    var length = parameterArray.length-1;
    var count = 0;


    parameterArray.forEach(element => {
        jsonString += "\"" + element.value.name + "\":";

        element.value.type === "string" ? jsonString += "\"" + element.value.value + "\"" : jsonString += element.value.value;
        count !== length ? jsonString += "," : jsonString += "}";

        count++;
    });
    console.log(jsonString);
   
    return jsonString;


}

module.exports = function(RED) {

    function MyNode(config) {
        RED.nodes.createNode(this, config);

        this.paramOutputs = config.paramOutputs;
        this.parameters = config.parameters;
        this.action = config.action;

        var node = this;

        node.on('input', async function(msg) {
            
            await invokeAction(node.action, toJsonString(node.paramOutputs), msg);

            node.send(msg);
            
        });
    }
    
    RED.nodes.registerType("invoke-action", MyNode);
}