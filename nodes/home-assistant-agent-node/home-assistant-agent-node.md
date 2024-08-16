
# Home Assistant Agent Node Documentation

## Overview
The `home-assistant-agent-node` is designed to interface with the Home Assistant platform, allowing users to control and monitor smart home devices directly within the Node-RED environment. This node is particularly useful for integrating various home automation systems, enabling users to automate and manage their smart home devices efficiently.

## Directory Structure

- **`home-assistant-agent.html`**: Defines the user interface (UI) for configuring the `home-assistant-agent-node` within the Node-RED editor.
- **`home-assistant-agent.js`**: Implements the logic and behavior of the `home-assistant-agent-node` in the Node-RED runtime, managing connections to Home Assistant, controlling devices, and processing events.

## Detailed Explanation of Files

### 1. `home-assistant-agent.html`
This file sets up the Node-RED editor interface for the `home-assistant-agent-node`. It includes elements for configuring the connection to the Home Assistant platform, such as setting up the server URL, authentication, and selecting devices to control.

**Key Components**:
- **Form Elements**: Input fields, dropdowns, and buttons allow users to configure the connection to Home Assistant and select which devices or entities to control or monitor.

**Example UI Elements**:
```html
<div class="form-row">
    <label for="node-input-serverUrl"><i class="fa fa-server"></i> Home Assistant Server URL</label>
    <input type="text" id="node-input-serverUrl" placeholder="Enter Home Assistant server URL">
</div>
<div class="form-row">
    <label for="node-input-entityId"><i class="fa fa-cog"></i> Entity ID</label>
    <input type="text" id="node-input-entityId" placeholder="Enter Entity ID">
</div>
```

### 2. `home-assistant-agent.js`
The JavaScript file implements the runtime logic for the `home-assistant-agent-node`. It handles tasks such as:
- Connecting to the Home Assistant server using the provided URL and credentials.
- Sending commands to control devices or retrieve information from the Home Assistant platform.
- Processing events and updates from Home Assistant, such as changes in device status or sensor readings.

**Key Functions**:
- **Server Connection**: The node includes methods for establishing and maintaining a connection to the Home Assistant server, ensuring reliable communication between Node-RED and the smart home devices.
- **Device Control**: Methods for sending commands to Home Assistant entities, allowing users to control lights, thermostats, and other smart devices.

**Example Methods**:
- **`connectToServer()`**: Establishes a connection to the Home Assistant server using the provided URL and credentials.
- **`sendCommand(entityId, command)`**: Sends a command to the specified entity in Home Assistant, controlling devices such as lights, switches, or thermostats.

## Integration with Resources

### 1. `js_common_methods.js`
This file may be imported within `home-assistant-agent.js` to provide shared methods for tasks such as data validation, error handling, and logging. By using common methods, the project ensures that the Home Assistant agent node behaves consistently with other nodes.

### 2. `html_common_methods.js`
Used in `home-assistant-agent.html` to standardize the creation and manipulation of HTML elements within the Node-RED editor, ensuring a consistent user experience.

## Usage Example

### Adding the `home-assistant-agent-node` to a Flow
1. Drag the `home-assistant-agent-node` from the Node-RED palette into your flow.
2. Double-click the node to open its configuration UI.
3. Enter the Home Assistant server URL, set up the necessary credentials, and select the entities you wish to control or monitor.
4. Deploy the flow to start interacting with your Home Assistant devices.

### Practical Application
- **Home Automation**: Use the `home-assistant-agent-node` to automate tasks in your smart home, such as turning off lights when no motion is detected or adjusting the thermostat based on the time of day.
- **Monitoring**: Integrate the node into a monitoring flow to track the status of your smart home devices, receiving alerts when certain conditions are met.

## Conclusion
The `home-assistant-agent-node` is an essential tool for integrating Home Assistant into your Node-RED flows. It allows you to control and monitor your smart home devices, providing a flexible and powerful way to manage home automation systems.
