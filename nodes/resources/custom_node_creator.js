const fs = require('fs');
const path = require('path');

const nodeName = 'my-custom-node';
const nodeDir = path.join(__dirname, nodeName);

// Create the node directory
if (!fs.existsSync(nodeDir)) {
    fs.mkdirSync(nodeDir);
}

// JavaScript template
const jsContent = `module.exports = function(RED) {
    function MyCustomNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node.on('input', function(msg) {
            msg.payload = "Hello from MyCustomNode";
            node.send(msg);
        });
    }
    RED.nodes.registerType("${nodeName}", MyCustomNode);
};`;

// HTML template
const htmlContent = `<script type="text/javascript">
    RED.nodes.registerType('${nodeName}', {
        category: 'function',
        color: '#a6bbcf',
        defaults: {
            name: {value: ""},
        },
        inputs: 1,
        outputs: 1,
        icon: "file.png",
        label: function() {
            return this.name || "${nodeName}";
        }
    });
</script>

<div class="form-row">
    <label for="node-input-name"><i class="fa fa-tag"></i> Name</label>
    <input type="text" id="node-input-name" placeholder="Name">
</div>`;

// Write JavaScript file
fs.writeFileSync(path.join(nodeDir, `${nodeName}.js`), jsContent);

// Write HTML file
fs.writeFileSync(path.join(nodeDir, `${nodeName}.html`), htmlContent);

// Add package.json
const packageJson = {
    name: nodeName,
    version: "1.0.0",
    description: "A custom Node-RED node",
    main: `${nodeName}.js`,
    keywords: ["node-red"],
    "node-red": {
        nodes: {
            [nodeName]: `${nodeName}.js`
        }
    }
};

fs.writeFileSync(path.join(nodeDir, 'package.json'), JSON.stringify(packageJson, null, 2));

console.log(`Custom Node-RED node created in ${nodeDir}`);
