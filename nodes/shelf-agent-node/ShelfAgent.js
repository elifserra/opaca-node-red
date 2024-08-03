const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED){

    var currentAction = null;

    RED.httpAdmin.post('/currentAction', function(req, res) {
        currentAction = req.body;
    });

    function ShelfAgentNode(config){
        RED.nodes.createNode(this,config);  
        var node = this;
        node.on('input', async function(msg){   
            if(currentAction != null){
                await js_common_methods.invokeAction(currentAction.actionName, currentAction.queryString, msg,node);
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("ShelfAgent",ShelfAgentNode);
}