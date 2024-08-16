
# Wayfinding Agent Node Documentation

## Overview
The `wayfinding-agent-node` is designed to assist with navigation and route finding within a Node-RED flow. This node enables users to find the location of the room in `ZEKI` office. When it works, it open the lights that show the way to go to target room.

## Note:
    This node is not working correctly now. Because it has a different wifi connections from other agents. But when this wifi issue is resolved, it will work correctly.

## Directory Structure

- **`WayFindingAgent.html`**: This file defines the user interface (UI) for configuring the `wayfinding-agent-node` in the Node-RED editor.
- **`WayFindingAgent.js`**: Contains the core logic and behavior of the `wayfinding-agent-node` in the Node-RED runtime.

## Detailed Explanation of Files

### 1. `WayFindingAgent.html`
This file sets up the Node-RED editor interface for the `wayfinding-agent-node`.

**Key Components**:
- **Form Elements**: Users can input and adjust settings related to the wayfinding process

### 2. `WayFindingAgent.js`
The JavaScript file implements the functionality of the `wayfinding-agent-node`.

## Integration with Resources:

### 1. `js_common_methods.js`
This file is imported and used within `WayFindingAgent.js` to be able to access makeNodeConfiguration method.
This method make node configuration and registration.

### 2. `html_common_methods.js`
This file is used in `WayFindingAgent.html` to access Agent, Action and parameter class and also other common methods between agents. 

## Usage Example

### Adding the `wayfinding-agent-node` to a Flow
1. Drag the `wayfinding-agent-node` from the Node-RED palette into your flow.
2. Double-click the node to open its configuration UI.
3. Select the action that you want to invoke.
4. Enter the necessary parameters to be able to run that action
5. Drag official node-red `inject-node` to flow and connect to `wayfinding-agent-node`.
6. Press inject node, this trigger the `wayfinding-agent-node` to invoke the action and send the action result to the next node if there is a next node.

There is another option to be able to invoke action, On edit dialog user can press the invoke action button. When it is pressed invoke result will be displayed on the screen. But, do not forget that this feature is not used in flow. If you want to use action result in flow you need to trigger the flow via inject node.

## Note : 
    If you add this node to flow, do not forget to make authentication via `opaca-access-node`.

## Conclusion
The `wayfinding-agent-node` is an essential tool for applications that require navigation and route finding.
