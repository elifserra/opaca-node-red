
# NodeCreator Node Documentation

## Overview

The **NodeCreator Node** is a custom Node-RED node designed to simplify the creation of new agent nodes in the OPACA framework. This node automates the process of generating JavaScript and HTML files necessary for defining and registering a new agent node within Node-RED, and also updates the Node-RED configuration and `package.json` file to make the new node available.

## Features

- **Automated Node Creation**: Automatically generates the JavaScript and HTML files required to define a new agent node.
- **Easy Integration**: Updates the Node-RED configuration and `package.json` file to ensure the new node is immediately available in the editor.
- **Customization**: Allows users to specify node attributes such as category, color, name, label, icon, and input/output counts.

## Node Configuration

### Properties

- **Config Name**: The unique name of the configuration for the new agent node.
- **Category**: The category under which the new node will be listed in the Node-RED editor (default is "ZEKI").
- **Color**: The color of the node in the editor. Several predefined colors are available.
- **Name**: The internal name of the new node.
- **Label**: The label that appears on the node in the editor.
- **Icon**: The icon that will be displayed on the node.
- **Agent ID**: The identifier of the agent associated with the node.
- **Number of Inputs**: The number of input connections the node will have.
- **Number of Outputs**: The number of output connections the node will have.

## Usage

### Step-by-Step Guide

1. **Drag the NodeCreator Node into Your Flow**:
   - Drag the NodeCreator node from the Node-RED palette into your workspace.

2. **Open the Configuration Dialog**:
   - Double-click the NodeCreator node to open its configuration dialog.

3. **Fill in the Required Fields**:
   - **Config Name**: Provide a unique name for the new agent node configuration.
   - **Category**: Choose the category for the new node.
   - **Color**: Select the color for the node.
   - **Name**: Enter the internal name of the new node.
   - **Label**: Enter the label that will appear on the node.
   - **Icon**: Specify the icon for the node.
   - **Agent ID**: Select the agent ID associated with the new node.
   - **Number of Inputs**: Set the number of input connections.
   - **Number of Outputs**: Set the number of output connections.

4. **Create the Node**:
   - Click the **Create Node** button. The NodeCreator will generate the required files and update the necessary configurations.

5. **Deploy**:
   - Deploy your flow to apply the changes. The newly created node will appear in the Node-RED palette under the specified category.

## HTTP Endpoints

### `/node_config.json`

- **Method**: GET
- **Description**: Retrieves the current node configuration file.
- **Response**: Returns the content of the `node_config.json` file.

### `/update_node_config`

- **Method**: POST
- **Description**: Updates the node configuration with the new agent node and creates the required JavaScript and HTML files.
- **Payload**: Expects a JSON object containing the updated config and the name of the config.
- **Response**: Updates the `node_config.json` and `package.json` files, and creates the corresponding JavaScript and HTML files for the new node.

## Development and Customization

### File Structure

- **NodeCreator.js**: The main Node-RED node definition file.
- **NodeCreator.html**: The HTML template file for the node's configuration dialog.
- **resources/imports.js**: Contains all necessary imports and paths used by the NodeCreator node.

### Adding New Features

1. **Modify NodeCreator.js**:
   - Update or add new functionality by modifying the `NodeCreator.js` file.
   - You can add new properties or logic as needed.

2. **Update NodeCreator.html**:
   - Modify the HTML template to add new input fields or change the layout of the configuration dialog.

3. **Test the Node**:
   - After making changes, test the node thoroughly in a Node-RED environment to ensure everything works as expected.

## Troubleshooting

- **Node Not Appearing**:
   - Ensure that the `package.json` file is correctly updated after creating a new node.
   - Check the console for any errors during the creation process.

- **File Creation Issues**:
   - Verify that the `repositoryPath` is correctly set and that Node-RED has the necessary permissions to create files in the specified directory.

## Conclusion

The NodeCreator Node is an invaluable tool for rapidly developing and deploying new agent nodes in the OPACA framework. By automating the creation process, it reduces the complexity and time required to integrate new functionality into your Node-RED environment.
