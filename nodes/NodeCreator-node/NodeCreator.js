const imports = require('../resources/imports.js');                                 // This is the import statement for the imports.js file. This file is used to import all the necessary dependencies required for the agent node to work properly.
const node_config_path          = imports.node_config_file_path_import;             // This is the import statement for the node_config_path variable. This variable contains the path to the node config file.
const packageJsonPath = imports.package_json_file_path_import;                      // This is the import statement for the packageJsonPath variable. This variable contains the path to the package.json file.
const repositoryPath = imports.repository_path_import;                              // This is the import statement for the repositoryPath variable. This variable contains the path to the repository where the custom nodes are stored.
const fs = imports.file_system_import;                                              // This is the import statement for the fs object. This object is used to interact with the file system.
// This node task is to create a new agent node if the opaca framework has a new agent.
// 
module.exports = function(RED) {
    // This function is used to create the node configuration.
    function NodeCreator(config) {
        // Create the node.
        RED.nodes.createNode(this, config);
        const node = this;
        node.on('input', function(msg) {
            msg.payload = "Hello from NodeCreator";
            node.send(msg);
        });
    }
    // Register the node.
    RED.nodes.registerType("NodeCreator", NodeCreator);

        // This function is used to send the node_config.json file to the Node-RED editor.
    // This file contains the configuration of the agent nodes that are available in the Node-RED editor.
    // The file is sent as a response to the request made by the Node-RED editor.
    // We have NodeCreator node to create a new node. When we create a new node, we need to update the node_config.json file.
    // This file is used to store the configuration of the agent nodes that are available in the Node-RED editor.
    /*
        If the opaca framework has a new agent, initially it is not available in the node-red editor.
        However, we can create a new agent node by using the NodeCreator node. When we create a new agent node, we need to update the node_config.json file.
        To update the node_config.json file, we need to send the updated config to the server. This is done by sending a POST request to the /update_node_config endpoint.
    */
        RED.httpAdmin.get('/node_config.json', function(req, res) {
            const filePath = node_config_path;
            fs.readFile(filePath, 'utf8', function(err, data) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.type('application/json').send(data);
                }
            });
        });
    
        // When the config of the agent node is updated, it means it is time to create the new agent node html and js files.
        // More importantly, we need to update the package.json file to make the new agent node available in the Node-RED editor.
        // For a new node to be seen in the Node-RED editor, we need to update the package.json file.
        // When the create agent button is clicked, the NodeCreator node sends a POST request to the /update_node_config endpoint.
        RED.httpAdmin.post('/update_node_config', function(req, res) {
            // Get the updated config and the name of the config from the request body
            const fetchedData = req.body;
            const updatedConfig = fetchedData.config;  // Get the updated config from the request body
            const configName = fetchedData.configName; // Get the name of the config from the request body
            
            /*
                As you see7 in the all agent nodes, we have a js file and an html file.
                To be more moduler, we have agent, action and parameter classes.It enable us to create a new agent node easily.
                As you see, creating new node it is not a hard job. Because I made it easy.
                Even if you do not know how to create a new agent node, you can create a new node by using the NodeCreator node.
                You do not need to worry about the details of the node creation. You just need to fill the required fields in the NodeCreator node.
                The NodeCreator node will create the new node for you.
            */
           
            // Create the JS file content. It is common for all agent nodes. But we need to change the name of the agent node.
            const jsContent = ` const imports = require('../../nodes/resources/imports.js');                     // This is the import statement for the imports.js file. This file is used to import all the necessary dependencies required for the agent node to work properly.
    const js_common_methods = imports.js_common_methods_import;                      // This is the import statement for the js_common_methods object. This object contains all the common methods that are used by the agent node.
    
    module.exports = function(RED){                                                  // Export the function that defines the agent
        function ${configName}Node(config){                                          // This function is the definition of the agent node. It takes a config object as a
            js_common_methods.makeNodeConfiguration(RED, this, config);              // This line of code calls the makeNodeConfiguration method from the js_common_methods object. This method is used to create the node configuration.
        } 
        RED.nodes.registerType("${configName}",${configName}Node);                   // This line of code registers the agent node with the name "${configName}".
    }`;
    
            // Create the HTML file content. It is common for all agent nodes. But we need to change the name of the agent node.
            const htmlContent = `<!-- This file is the HTML file for the ${configName} node. It is responsible for the visual representation of the node in the Node-RED editor. -->
    
    <!-- The following script tag includes the common html methods that are used in the HTML files of the nodes. -->
    <script type="text/javascript" src="html_common_methods.js"></script>
    
    <!-- The following script tag is responsible for registering the ${configName} node in the Node-RED editor. -->
    <script type="text/javascript">
        makeNodeRegistration("${configName}");  // Make the ${configName} node available in the Node-RED editor
    </script>`;
            
            // Create the directory path, pay attention this is the path of the agent node directory. It should be inside of the nodes directory.
            const dirPath = `${repositoryPath}/${configName}-node`;
            // Create the file paths for js file
            const jsFilePath = `${dirPath}/${configName}.js`;
            // Create the file paths for html file
            const htmlFilePath = `${dirPath}/${configName}.html`;
    
            // Create directory if it doesn't exist
            fs.mkdir(dirPath, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating directory:', err);
                    return res.status(500).send('Failed to create directory');
                }
    
                // Write JS file
                fs.writeFile(jsFilePath, jsContent, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing JS file:', err);
                        return res.status(500).send('Failed to create JS file');
                    }
    
                    // Write HTML file
                    fs.writeFile(htmlFilePath, htmlContent, 'utf8', (err) => {
                        if (err) {
                            console.error('Error writing HTML file:', err);
                            return res.status(500).send('Failed to create HTML file');
                        }
    
                        // First read the package.json file
                        fs.readFile(packageJsonPath, 'utf8', (err, data) => {
                            if (err) {
                                console.error('Error reading package.json:', err);
                                return res.status(500).send('Failed to read package.json');
                            }
        
                            let packageJson = JSON.parse(data);
                            // Add the new node to the package.json file
                            packageJson['node-red']['nodes'][configName] = `/nodes/${configName}-node/${configName}.js`;
    
                            // Write the updated package.json back to the file
                            fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', (err) => {
                                if (err) {
                                    console.error('Error writing package.json:', err);
                                    return res.status(500).send('Failed to update package.json');
                                }
        
                                // Write the updated config back to the node_config.json file
                                fs.writeFile(node_config_path, JSON.stringify(updatedConfig, null, 2), 'utf8', function(err) {
                                    if (err) {
                                        console.error('Error writing config file:', err);
                                        res.status(500).send('Failed to save config');
                                    } else {
                                        res.send('Config and package.json updated successfully');
                                    }
                                });
                            });
                        });
    
                    });
                });
            });
            
        });

};