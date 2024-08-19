const imports = require('../../nodes/resources/imports.js');                     // This is the import statement for the imports.js file. This file is used to import all the necessary dependencies required for the agent node to work properly.
const js_common_methods = imports.js_common_methods_import;                      // This is the import statement for the js_common_methods object. This object contains all the common methods that are used by the agent node.

module.exports = function(RED){                                                  // Export the function that defines the agent
    function HomeAssistantAgentNode(config){                                     // This function is the definition of the agent node. It takes a config object as a
        js_common_methods.makeNodeConfiguration(RED, this, config);              // This line of code calls the makeNodeConfiguration method from the js_common_methods object. This method is used to create the node configuration.
    } 
    RED.nodes.registerType("HomeAssistantAgent",HomeAssistantAgentNode);         // This line of code registers the agent node with the name "HomeAssistantAgent".
}