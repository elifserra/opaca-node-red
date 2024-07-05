module.exports = function(RED){

    function SensorsAgentNode(config){
        RED.nodes.createNode(this,config);
        var node = this;
    }

    RED.nodes.registerType("SensorsAgent",SensorsAgentNode);

}