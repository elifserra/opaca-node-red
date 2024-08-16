
# Servlet Agent Node Documentation

## Overview
The `servlet-agent-node` is designed to interact with servlet-based web services within a Node-RED flow. This node enables users to send requests and receive responses from servlets, making it a crucial tool for integrating web-based services into their automation workflows.

## Directory Structure

- **`ServlentAgent.html`**: This file defines the user interface (UI) for configuring the `servlet-agent-node` in the Node-RED editor.
- **`ServletAgent.js`**: Contains the core logic and behavior of the `servlet-agent-node` in the Node-RED runtime.

## Detailed Explanation of Files

### 1. `ServletAgent.html`
This file is responsible for setting up the Node-RED editor interface for the `servlet-agent-node`. It includes form elements that allow users to configure the connection to servlet-based services, specify the endpoints, and define the request parameters.

**Key Components**:
- **Form Elements**: Users can input the necessary details depending on the selected action parameters.

### 2. `ServlentAgent.js`
The JavaScript file implements the logic for the `servlet-agent-node`. It manages the communication with servlet-based services, sending requests according to the configuration and processing the responses within the Node-RED flow.

## Integration with Resources:

### `js_common_methods.js`:
This file is imported and used within `ServletAgent.js` to be able to access makeNodeConfiguration method.
This method make node configuration and registration.

### `html_common_methods.js`: 
This file could be used in `ServletAgent.html` to access Agent, Action and parameter class and also other common methods between agents. 

## Usage Example

### Adding the `servlet-agent-node` to a Flow
1. Drag the `servlet-agent-node` from the Node-RED palette into your flow.
2. Double-click the node to open its configuration UI.
3. Select the action that you want to invoke.
4. Enter the necessary parameters to be able to run that action
5. Drag official node-red `inject-node` to flow and connect to `servlet-agent-node`.
6. Press inject node, this trigger the `servlet-agent-node` to invoke the action and send the action result to the next node if there is a next node.

There is another option to be able to invoke action, On edit dialog user can press the invoke action button. When it is pressed invoke result will be displayed on the screen. But, do not forget that this feature is not used in flow. If you want to use action result in flow you need to trigger the flow via inject node.

## Conclusion
The `servlet-agent-node` is a powerful tool for integrating servlet-based web services into Node-RED. By leveraging shared resources and standardized methods, this node ensures reliable and efficient communication with web services, making it an essential component for users looking to extend the capabilities of their Node-RED flows.
