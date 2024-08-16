
# Invoke Action Node Documentation

## Overview
The `invoke-action-node` is designed to trigger specific actions or commands within a Node-RED flow. It allows users to initiate operations such as API calls, device commands, or other predefined actions based on conditions or user input within the flow.

## Directory Structure

- **`invoke-action.html`**: Defines the user interface (UI) for configuring the `invoke-action-node` within the Node-RED editor.
- **`invoke-action.js`**: Implements the logic and behavior of the `invoke-action-node` in the Node-RED runtime, handling the execution of actions, managing triggers, and processing responses.

## Detailed Explanation of Files

### 1. `invoke-action.html`
This file sets up the Node-RED editor interface for the `invoke-action-node`. It includes elements for configuring the action to be invoked, such as selecting the type of action, defining parameters, and setting conditions for when the action should be triggered.

**Key Components**:
- **Form Elements**: Input fields, dropdowns, and buttons allow users to configure the action's parameters, such as the target URL for an API call or the command to be sent to a device.

**Example UI Elements**:
```html
<div class="form-row">
    <label for="node-input-actionType"><i class="fa fa-bolt"></i> Action Type</label>
    <select id="node-input-actionType">
        <option value="apiCall">API Call</option>
        <option value="deviceCommand">Device Command</option>
    </select>
</div>
<div class="form-row">
    <label for="node-input-target"><i class="fa fa-target"></i> Target</label>
    <input type="text" id="node-input-target" placeholder="Enter target (e.g., URL or device ID)">
</div>
```

### 2. `invoke-action.js`
The JavaScript file implements the runtime logic for the `invoke-action-node`. It handles tasks such as:
- Executing the configured action when the node is triggered within the flow.
- Managing parameters and conditions for the action, ensuring that the correct data is passed and that the action is executed as expected.
- Processing responses from the action, such as receiving data from an API call or confirming that a device command was successful.

**Key Functions**:
- **Action Execution**: The node includes methods for executing different types of actions, such as making an HTTP request for an API call or sending a command to a connected device.
- **Parameter Management**: Methods for handling the parameters required for the action, ensuring that they are correctly formatted and passed to the target.

**Example Methods**:
- **`executeAction(actionType, target, params)`**: Executes the specified action, using the provided parameters and target. This method may include logic for handling different types of actions, such as API calls or device commands.
- **`processResponse(response)`**: Processes the response received from the action, handling success or failure and passing the results to the next node in the flow.

## Integration with Resources

### 1. `js_common_methods.js`
This file may be imported within `invoke-action.js` to provide shared methods for tasks such as data validation, error handling, and logging. By using common methods, the project ensures that the invoke action node behaves consistently with other nodes.

### 2. `html_common_methods.js`
Used in `invoke-action.html` to standardize the creation and manipulation of HTML elements within the Node-RED editor, ensuring a consistent user experience.

## Usage Example

### Adding the `invoke-action-node` to a Flow
1. Drag the `invoke-action-node` from the Node-RED palette into your flow.
2. Double-click the node to open its configuration UI.
3. Select the action type, specify the target (such as a URL or device ID), and define any necessary parameters.
4. Deploy the flow to start triggering actions based on the flow's logic.

### Practical Application
- **API Integration**: Use the `invoke-action-node` to make API calls to external services, passing data and processing the responses within your flow.
- **Device Control**: Trigger commands on connected devices, such as turning on lights, adjusting settings, or sending notifications.

## Conclusion
The `invoke-action-node` is a versatile tool for triggering actions within your Node-RED flows. It allows you to integrate external services and control devices, providing a powerful way to automate tasks and respond to events within your flows.
