module.exports = function(RED) {
    const { exec } = require('child_process');
    const path = require('path');

    function CustomWebcamNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        const scriptPath = path.join(__dirname, 'camera.py');
        const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
        const command = `${pythonCommand} "${scriptPath}"`;

        

        node.on('input', function(msg) {
            exec(command);
        });
    }
    RED.nodes.registerType("camera", CustomWebcamNode);
}
