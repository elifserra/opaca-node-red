module.exports = function(RED){
    function ShelfAgentNode(config){
        RED.nodes.createNode(this,config);  
        var node = this;
    }
    RED.nodes.registerType("ShelfAgent",ShelfAgentNode);
}