const imports = require('../resources/imports.js'); 
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED){
    function ServletAgentNode(config){
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("ServletAgent",ServletAgentNode);
}