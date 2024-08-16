
# Common HTML Template Documentation

## Overview
The `common_html_template.html` file is a shared HTML template used across multiple nodes in the Node-RED project. This template provides a consistent structure and user interface for the configuration dialogs of various nodes.

## Purpose
The main purpose of this file is to avoid redundancy by offering a standardized layout that can be reused by different nodes, such as `HomeAssistantAgent`, `RoomBookingAgent`, `ServletAgent`, `ShelfAgent`, `FridgeAgent`, `invoke-action`, `WayfindingAgent`, and more. This ensures that all nodes have a consistent look and feel, and it simplifies the development process by reducing the need to create individual HTML files for each node.

## Structure and Elements
- **Form Rows**: The template includes several form rows, each containing labels and input fields. These rows are used to capture user input, such as node names, actions, and parameters.
- **Parameter Container**: A dedicated container for dynamically adding parameters based on the selected action. The parameters are populated through JavaScript methods defined in the nodes' JavaScript files.
- **Invoke Action Button**: A button that triggers the node's primary action. The button is styled for visibility and ease of use.
- **Result Container**: A hidden container that displays the result of the invoked action. This container becomes visible when the action is completed.

## Usage
The template is used in conjunction with the `appenTheSelectedAgentCommonHtml()` function, which appends this template to the document during the `oneditPrepareFunction` method of agent nodes. Nodes like `BaseAgent` have their own HTML templates and do not use this common template.

This approach helps maintain a clean and maintainable codebase, as any updates to the UI can be made in a single file and reflected across all nodes that use this template.
