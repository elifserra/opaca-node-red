const path = require('path');
const fs = require('fs');
var currentDir = path.join(__dirname);
const twoLevelsUp = path.resolve(currentDir, '..', '..');
var common_methods_path = twoLevelsUp + '/nodes/resources/common_methods.js';
var html_common_methods_path = twoLevelsUp + '/nodes/resources/html_common_methods.js';
var common_html_template_path = twoLevelsUp + '/nodes/resources/common_html_template.html';
const apiUrl = "http://10.42.6.107:8000/agents";                                                    
const loginUrl = "http://10.42.6.107:8000/login";                                                      

const helper_methods = require(common_methods_path);

module.exports = function(RED) {

    function OpacaAccesNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.username = config.username;
        node.password = config.password;

        node.on('input', async function() {
            await helper_methods.fetchOpacaTokenAndAgents(node.username, node.password, apiUrl, loginUrl, RED);
            console.log(twoLevelsUp);
        });
    }

    RED.nodes.registerType("opaca-access", OpacaAccesNode);

    RED.httpAdmin.post('/opaca-access/authorize', function(req, res) {
        const { username, password} = req.body;
        helper_methods.fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED)
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


};