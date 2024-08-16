
# NodeCreator Node Documentation

## Overview

The `NodeCreator-node` is a specialized tool designed to assist users in creating custom nodes within the OPACA framework in Node-RED. This node simplifies the process of generating new nodes by providing an intuitive interface for specifying the properties and behavior of the custom node. It is particularly useful for users who need to extend the functionality of OPACA agents as nodes within Node-RED.
The **NodeCreator Node** is a actually custom Node-RED node designed to simplify the creation of new agent custom nodes in the OPACA framework. This node automates the process of generating JavaScript and HTML files necessary for defining and registering a new agent node within Node-RED, and also updates the Node-RED configuration, `package.json` and `node_config.json` file to make the new node available.

## Note:
   NodeCreator is only used to create agent nodes specific to opaca agents

## Note:
   <package.json> file is inside of the OPACA-NODE-RED main directory.
   <node_config_json> file is inside of the nodes/resources direcotry.

## Important Note
The `NodeCreator-node` is specifically designed to work with OPACA framework agents. Before using this node, it is crucial to perform authorization using the `opaca-access-node`. This authorization step ensures that the user has the necessary permissions to create and interact with OPACA agents.


## Importance of `package.json`

The `package.json` file is a crucial component for the NodeCreator node because it ensures that the newly created node is correctly registered and available in the Node-RED editor. When a new node is created, the `package.json` file is automatically updated to include the path to the new node’s JavaScript file. This allows Node-RED to recognize and load the new node, making it available for use in the editor.

## Importance of `node_config.json`

The `node_config.json` file plays a vital role in the NodeCreator node's functionality. It serves as the central configuration file that stores the details of all the agent nodes available in Node-RED. This file ensures that when a new node is created, its configuration is saved and can be loaded used **makeNodeRegistration** method, making the node available in the editor for use in flows. Without this file, creating new agent without writing code approach will not work. 



## Features

- **Automated Node Creation**: Automatically generates the JavaScript and HTML files required to define a new agent node.
- **Easy Integration**: Updates the Node-RED configuration and `package.json` and `node_config.json` file to ensure the new node is immediately available in the editor (after restarting node-red).
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

5. **Restart Node-RED**:
   - **Important**: If a new agent node is created, you must restart Node-RED for the changes to take effect and for the new node to appear in the editor.
   - To restart Node-RED, go to node-red intallation directory and follow these steps:
     1. Stop the Node-RED service by running the command `ctrl-c` in your terminal.
     2. Start the Node-RED service again by running the command `node-red` and go to url server now running at "http://127.0.0.1:1880/." should be default
     3. Once Node-RED is restarted, the new agent node will be available in the editor and it can be used.

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
   - Ensure that the node-red is restarted.
   - Ensure that the `package.json` and `node_config_json` file is correctly updated after creating a new node.
   - Check the console for any errors during the creation process.

- **File Creation Issues**:
   - Verify that the `repositoryPath` is correctly set and that Node-RED has the necessary permissions to create files in the specified directory.

## Conclusion

The NodeCreator Node is an invaluable tool for rapidly developing and deploying new agent nodes in the OPACA framework. By automating the creation process, it reduces the complexity and time required to integrate new functionality into your Node-RED environment.
