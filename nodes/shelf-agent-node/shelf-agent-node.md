
# Shelf Agent Node Documentation

## Overview
The `shelf-agent-node` is designed to manage smart shelves within a Node-RED flow. This node allows users to monitor and control smart shelves, typically used in inventory management systems. It can track the presence of items, manage stock levels, and trigger actions based on the shelf's status.

## Directory Structure

- **`ShelfAgent.html`**: This file defines the user interface (UI) for configuring the `shelf-agent-node` in the Node-RED editor.
- **`ShelfAgent.js`**: Contains the core logic and behavior of the `shelf-agent-node` in the Node-RED runtime.

## Detailed Explanation of Files

### 1. `ShelfAgent.html`
This file sets up the Node-RED editor interface for the `shelf-agent-node`. It includes form elements that allow users to configure the shelf parameters, manage item tracking.

**Key Components**:
- **Form Elements**: Users can input and adjust settings related to the shelf's operation such as opening, closing shelf and finding item in the shelf.

### 2. `ShelfAgent.js`
The JavaScript file implements the functionality of the `shelf-agent-node`. It handles the interactions with smart shelves.


## Integration with Resources:

### `js_common_methods.js`:
This file is imported and used within `ShelfAgent.js` to be able to access makeNodeConfiguration method.
This method make node configuration and registration.

### `html_common_methods.js`: 
This file could be used in `ShelfAgent.html` to access Agent, Action and parameter class and also other common methods between agents. 

## Usage Example

### Adding the `shelf-agent-node` to a Flow
1. Drag the `shelf-agent-node` from the Node-RED palette into your flow.
2. Double-click the node to open its configuration UI.
3. Select the action that you want to invoke.
4. Enter the necessary parameters to be able to run that action
5. Drag official node-red `inject-node` to flow and connect to `shelf-agent-node`.
6. Press inject node, this trigger the `shelf-agent-node` to invoke the action and send the action result to the next node if there is a next node.

There is another option to be able to invoke action, On edit dialog user can press the invoke action button. When it is pressed invoke result will be displayed on the screen. But, do not forget that this feature is not used in flow. If you want to use action result in flow you need to trigger the flow via inject node.

## Conclusion
The `shelf-agent-node` is a valuable tool for integrating smart shelf systems into your Node-RED environment.
