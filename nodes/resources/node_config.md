
# Node Configuration Documentation

## Overview
The `node_config.json` file contains the configuration settings for the nodes in the Node-RED project. It defines default properties such as categories, colors, names, labels, icons, and the number of inputs and outputs for each node.

## Purpose
This file serves as a central repository for the configuration data of all nodes in the project. By storing these settings in a single file, the project ensures consistency across nodes and simplifies the process of updating or modifying node configurations.

## Key Sections

### 1. **Node Definitions**
Each node is defined by a unique key (e.g., `ExchangeAgent`, `ShelfAgent`, `FridgeAgent`) that contains the following properties:
- **category**: The category under which the node will appear in the Node-RED palette.
- **color**: The color of the node in the Node-RED editor.
- **name**: The default name assigned to the node.
- **label**: The label displayed on the node.
- **icon**: The icon used for the node.
- **agentId**: A unique identifier for the agent associated with the node.
- **numberOfInputs**: The number of inputs the node accepts.
- **numberOfOutputs**: The number of outputs the node produces.

### 2. **Example Node Configuration**
Here’s an example configuration for the `ExchangeAgent` node:
```json
{
  "ExchangeAgent": {
    "category": "ZEKI",
    "color": "lightblue",
    "name": "ExchangeAgent",
    "label": "Exchange Agent",
    "icon": "exchange-agent",
    "agentId": "exchange-agent",
    "numberOfInputs": 1,
    "numberOfOutputs": 1
  }
}
```
This section specifies that the `ExchangeAgent` node belongs to the `ZEKI` category, is colored light blue, and will have a single input and output. The node will be labeled as "Exchange Agent" and use the `exchange-agent` icon.

## Usage
The `node_config.json` file is referenced during the node registration process, particularly in methods like `makeNodeRegistration` and `makeBaseNodeRegistration` found in the project's JavaScript files. When a new node is added, its configuration should be included in this file to ensure that it appears correctly in the Node-RED editor.

This file is crucial for maintaining a consistent and organized setup of nodes within the project, allowing for easy updates and modifications to node properties.
