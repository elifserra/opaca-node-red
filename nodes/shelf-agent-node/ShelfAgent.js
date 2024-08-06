const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED){
    
    function ShelfAgentNode(config){
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("ShelfAgent",ShelfAgentNode);
}