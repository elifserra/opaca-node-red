const imports = require('../../nodes/resources/imports.js');
const js_commond_methods = imports.js_common_methods_import;
const apiUrl = imports.apiUrl_import;
const loginUrl = imports.loginUrl_import;
const html_common_methods_path = imports.html_common_methods_path_import;
const common_html_template_path = imports.common_html_template_path_import;
const node_config_path          = imports.node_config_file_path_import;
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


};