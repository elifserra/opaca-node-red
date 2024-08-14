const imports = require('../../nodes/resources/imports.js');
const js_commond_methods = imports.js_common_methods_import;
const apiUrl = imports.apiUrl_import;
const loginUrl = imports.loginUrl_import;
const html_common_methods_path = imports.html_common_methods_path_import;
const common_html_template_path = imports.common_html_template_path_import;
const node_config_path          = imports.node_config_file_path_import;
const packageJsonPath = imports.package_json_file_path_import;
const repositoryPath = imports.repository_path_import;
const fs = imports.file_system_import;


module.exports = function(RED) {

    function OpacaAccesNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.username = config.username;
        node.password = config.password;

        node.on('input', async function() {
            await js_commond_methods.fetchOpacaTokenAndAgents(node.username, node.password, apiUrl, loginUrl, RED);
            console.log(twoLevelsUp);
        });
    }

    RED.nodes.registerType("opaca-access", OpacaAccesNode);

    RED.httpAdmin.post('/opaca-access/authorize', function(req, res) {
        const { username, password} = req.body;
        js_commond_methods.fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED)
            .then(() => res.json({ success: true }))
            .catch(err => res.json({ success: false, error: err.message }));
    });


    RED.httpAdmin.get('/html_common_methods.js', function(req, res) {
        const filePath = html_common_methods_path;
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.type('text/javascript').send(data);
            }
        });
    });

    RED.httpAdmin.get('/common_html_template.html', function(req, res) {
        const filePath = common_html_template_path;
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.type('text/html').send(data);
            }
        });
    });


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

    RED.httpAdmin.post('/update_node_config', function(req, res) {
        const fetchedData = req.body;
        const updatedConfig = fetchedData.config;  // Get the updated config from the request body
        const configName = fetchedData.configName; // Get the name of the config from the request body
        

        const jsContent = ` const imports = require('../../nodes/resources/imports.js');                     // This is the import statement for the imports.js file. This file is used to import all the necessary dependencies required for the agent node to work properly.
const js_common_methods = imports.js_common_methods_import;                      // This is the import statement for the js_common_methods object. This object contains all the common methods that are used by the agent node.

module.exports = function(RED){                                                  // Export the function that defines the agent
    function ${configName}Node(config){                                          // This function is the definition of the agent node. It takes a config object as a
        js_common_methods.makeNodeConfiguration(RED, this, config);              // This line of code calls the makeNodeConfiguration method from the js_common_methods object. This method is used to create the node configuration.
    } 
    RED.nodes.registerType("${configName}",${configName}Node);                   // This line of code registers the agent node with the name "${configName}".
}`;

        const htmlContent = `<!-- This file is the HTML file for the ${configName} node. It is responsible for the visual representation of the node in the Node-RED editor. -->

<!-- The following script tag includes the common html methods that are used in the HTML files of the nodes. -->
<script type="text/javascript" src="html_common_methods.js"></script>

<!-- The following script tag is responsible for registering the ${configName} node in the Node-RED editor. -->
<script type="text/javascript">
    makeNodeRegistration("${configName}");  // Make the ${configName} node available in the Node-RED editor
</script>`;
        
        const dirPath = `${repositoryPath}/${configName}-node`;
        const jsFilePath = `${repositoryPath}/${configName}-node/${configName}.js`;
        const htmlFilePath = `${repositoryPath}/${configName}-node/${configName}.html`;

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


                    fs.readFile(packageJsonPath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading package.json:', err);
                            return res.status(500).send('Failed to read package.json');
                        }
    
                        let packageJson = JSON.parse(data);
                        packageJson['node-red']['nodes'][configName] = `/nodes/${configName}-node/${configName}.js`;
    
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
        

        /*
        // Write the updated config back to the node_config.json file
        fs.writeFile(node_config_path, JSON.stringify(updatedConfig, null, 2), 'utf8', function(err) {
            if (err) {
                console.error('Error writing config file:', err);
                res.status(500).send('Failed to save config');
            } else {
                res.send('Config saved successfully');
            }
        });
        */
    });

    RED.httpAdmin.post('/create_custom_node_file', function(req, res) {
        console.log("Data Came");
        console.log(req.body);  
    });


};