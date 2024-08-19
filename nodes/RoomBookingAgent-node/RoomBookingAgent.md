
# RoomBookingAgent Node Documentation

## Overview

The `RoomBookingAgent` node is designed to manage room booking functionalities, including logging in, retrieving user bookings, and getting bookings for specific locations.

## Node Functionality

### Actions

1. **Login**
   - **Description:** Authenticate the user for room booking services.
   - **Parameters:** None.
   - **Result:**
     - `boolean`: Indicates whether the login was successful.

2. **GetUserBookings**
   - **Description:** Retrieve a list of all bookings made by the logged-in user.
   - **Parameters:** None.
   - **Result:**
     - `array`: A list of booking objects associated with the user.

3. **GetLocationBookings**
   - **Description:** Retrieve a list of bookings for a specified location.
   - **Parameters:**
     - `location` (string): The name or identifier of the location.
   - **Result:**
     - `array`: A list of booking objects associated with the location.

## Implementation

### JavaScript File (RoomBookingAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function RoomBookingAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("RoomBookingAgent", RoomBookingAgentNode);
}
```

### HTML File (RoomBookingAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("RoomBookingAgent");
</script>
```

## Usage

To use the `RoomBookingAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the room booking services are properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
