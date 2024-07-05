module.exports = function(RED){

    function WayfindingAgentNode(config){
        RED.nodes.createNode(this,config);
        var node = this;
    }

    RED.nodes.registerType("WayfindingAgent",WayfindingAgentNode);

}