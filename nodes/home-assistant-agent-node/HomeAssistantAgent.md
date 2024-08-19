
# HomeAssistantAgent Node Documentation

## Overview

The `HomeAssistantAgent` node is designed to interact with the home automation system, allowing users to retrieve sensor data and control devices within a smart home environment.

## Node Functionality

### Actions

1. **GetSensorsList**
   - **Description:** Retrieve a list of all multisensors in the system.
   - **Parameters:** None.
   - **Result:**
     - `array`: A list of sensor names that include "multisensor" in their names.

2. **GetSensorId**
   - **Description:** Retrieve the sensor ID corresponding to a given room.
   - **Parameters:**
     - `room` (string): The name of the room (not case-sensitive).
   - **Result:**
     - `string`: The ID of the sensor, or an empty string if not found.

3. **GetTemperature**
   - **Description:** Retrieve the temperature value from a specific sensor.
   - **Parameters:**
     - `sensorId` (string): The ID of the sensor.
   - **Result:**
     - `number`: The temperature value.

4. **GetCo2**
   - **Description:** Retrieve the CO2 level from a specific sensor.
   - **Parameters:**
     - `sensorId` (string): The ID of the sensor.
   - **Result:**
     - `number`: The CO2 level.

5. **GetValue**
   - **Description:** Retrieve a specific value from a sensor based on a key.
   - **Parameters:**
     - `sensorId` (string): The ID of the sensor.
     - `key` (string): The property key to retrieve.
   - **Result:**
     - `number`: The value associated with the key.

## Implementation

### JavaScript File (HomeAssistantAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function HomeAssistantAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("HomeAssistantAgent", HomeAssistantAgentNode);
}
```

### HTML File (HomeAssistantAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("HomeAssistantAgent");
</script>
```

## Usage

To use the `HomeAssistantAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the home automation system is properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
