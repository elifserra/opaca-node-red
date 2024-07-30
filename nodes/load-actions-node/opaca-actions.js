const apiUrl = "http://10.42.6.107:8000/agents";
const loginUrl = "http://10.42.6.107:8000/login";
var path = 'C:/Users/orucc/Desktop/Coding_Projects/opaca-node-red/nodes/resources/constants.js';
const helper_methods = require(path);


module.exports = function(RED) {

    function MyNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.username = config.username;
        this.password = config.password;
        
        node.on('input', async function() {
           var actions = await  helper_methods.fetchData(node, node.username, node.password,apiUrl,loginUrl,RED);
           node.warn(actions);
        });

        //helper_methods.setGlobalValue("token", this.context().global.get("token"));

    }
    RED.nodes.registerType("opaca-actions", MyNode);
};
