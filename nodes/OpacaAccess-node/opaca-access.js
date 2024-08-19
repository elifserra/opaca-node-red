const imports = require('../../nodes/resources/imports.js');                        // This is the import statement for the imports.js file. This file is used to import all the necessary dependencies required for the agent node to work properly.
const js_commond_methods = imports.js_common_methods_import;                        // This is the import statement for the js_common_methods object. This object contains all the common methods that are used by the agent node.
const apiUrl = imports.apiUrl_import;                                               // This is the import statement for the apiUrl variable. This variable contains the URL of the API that the agent node will interact with.
const loginUrl = imports.loginUrl_import;                                           // This is the import statement for the loginUrl variable. This variable contains the URL of the login API that the agent node will interact with.
const html_common_methods_path = imports.html_common_methods_path_import;           // This is the import statement for the html_common_methods_path variable. This variable contains the path to the HTML common methods file.
const common_html_template_path = imports.common_html_template_path_import;         // This is the import statement for the common_html_template_path variable. This variable contains the path to the common HTML template file.
const fs = imports.file_system_import;                                              // This is the import statement for the fs object. This object is used to interact with the file system.

// This function is the definition of the Opaca Access node. It takes a config object as a parameter.
module.exports = function(RED) {

    // This function is the definition of the Opaca Access node. It takes a config object as a parameter.
    function OpacaAccesNode(config) {
        // Create a new instance of the Opaca Access node
        RED.nodes.createNode(this, config);
        var node = this;
        node.username = config.username;
        node.password = config.password;

        // This function is called when a new message is received by the node.
        /*
          We can make authentication in two ways: First is to clik on the Authorize button in the html side on node red editor and the second way is to inject the opaca-access node with the username and password.
          Below code enables us to use the second way of authentication.
        */
        node.on('input', async function() {
            // Fetch the Opaca token and agents
            await js_commond_methods.fetchOpacaTokenAndAgents(node.username, node.password, apiUrl, loginUrl, RED);
        });
    }

    // Register the Opaca Access node with the Node-RED editor
    RED.nodes.registerType("opaca-access", OpacaAccesNode);
    
    // This function is called when the user clicks on the Authorize button in the node configuration dialog.
    // It fetches the Opaca token and agents using the provided username and password.
    // The username and password are sent as a POST request to the /opaca-access/authorize endpoint.
    // If the request is successful, we can use ZEKI agents in a way that we want.
    // If the request fails, an error message is displayed in the Node-RED editor.
    RED.httpAdmin.post('/opaca-access/authorize', function(req, res) {
        const { username, password} = req.body;
        js_commond_methods.fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED)
            .then(() => res.json({ success: true }))
            .catch(err => res.json({ success: false, error: err.message }));
    });

    // This function is used to send html_common_methods.js file to the Node-RED editor.
    // This file contains the common methods that are used in the HTML files of the nodes.
    // The file is sent as a response to the request made by the Node-RED editor.
    // The html files of the nodes can include this file using the following script tag:
    // <script type="text/javascript" src="html_common_methods.js"></script>
    /*
        Without sending this info, if you try to use the methods in the html file, you will get an error. Because html side does not know local files.
        So, we need to send the file to the html side  as a http response.
    */
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

    
    // This function is used to send common_html_template.html file to the Node-RED editor.
    // This file contains the common HTML template that is used in the HTML files of the nodes.
    // The file is sent as a response to the request made by the Node-RED editor.
    // If the html files use this template, they need to fetch this file from the server and append it to the body of the html file.
    // In the html_common_methods.js file there is a method called as appenTheSelectedAgentCommonHtml (member method od Agent Class) which is used to append the common html template to the body of the html file.
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




};