module.exports = function(RED){

    function RoomBookingAgentNode(config){
        RED.nodes.createNode(this,config);
        var node = this;
    }

    RED.nodes.registerType("RoomBookingAgent",RoomBookingAgentNode);

}