
# WayfindingAgent Node Documentation

## Overview

The `WayfindingAgent` node is designed to provide guidance within a facility by showing the way to specific rooms using an LED ground guidance system.

## Node Functionality

### Actions

1. **FindRoomById**
   - **Description:** Show the way to a room using its unique ID.
   - **Parameters:**
     - `roomId` (integer): The unique identifier of the room.
   - **Result:** None.

2. **FindRoomByName**
   - **Description:** Show the way to a room using its name.
   - **Parameters:**
     - `roomName` (string): The name of the room.
   - **Result:** None.

## Implementation

### JavaScript File (WayfindingAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function WayfindingAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("WayfindingAgent", WayfindingAgentNode);
}
```

### HTML File (WayfindingAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("WayfindingAgent");
</script>
```

## Usage

To use the `WayfindingAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the wayfinding system is properly configured and that the LED guidance system is functional.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
