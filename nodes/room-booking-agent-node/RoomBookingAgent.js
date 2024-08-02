const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED){
    function RoomBookingAgentNode(config){
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("RoomBookingAgent",RoomBookingAgentNode);
}