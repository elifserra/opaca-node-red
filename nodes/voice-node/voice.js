async function sendCommandToPython(variableName, value) {
    try {
        const response = await fetch(`http://localhost:3000/variable/${variableName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: value })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getCommandFromPython(variableName,node) {
    try {
        const response = await fetch(`http://localhost:3000/variable/${variableName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        node.warn("eggtt " +data.value);
        return data.value;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getCommand(node){
    var data = await getCommandFromPython("response",node);
    node.response = data;
    node.warn("DATAAAA "+node.response);
}

module.exports = function(RED) {
    const {exec} = require('child_process');
    const path = require('path');

    function CustomVoiceNode(config) {
        RED.nodes.createNode(this, config); 
        var node = this;
        this.response = config.response;

        const scriptPath = path.join(__dirname, 'voice.py');
        const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
        const command = `${pythonCommand} "${scriptPath}"`;

        exec(command);

        node.on('input', function(msg) {
            
        });

    }

    RED.nodes.registerType("voice", CustomVoiceNode);

}