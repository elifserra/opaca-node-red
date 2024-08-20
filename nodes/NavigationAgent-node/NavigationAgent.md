# NavigationAgent Node Documentation

## Overview

The NavigationAgent node is designed to manage navigation-related functionalities, such as converting addresses to locations, finding directions between locations, and navigating from one address to another. This node allows users to interact with geographical data, enabling location-based services within Node-RED.

## Node Functionality

### Actions

1. **ToLocation**

   - **Description:** Converts a human-readable address into a geographic location (latitude and longitude).
   - **Parameters:**
     - `address` (string): The human-readable address to be converted.
   - **Result:**
     - `tuple`: A tuple representing the geographic location (latitude, longitude).

2. **ToAddress**

   - **Description:** Converts a geographic location (latitude and longitude) into the closest human-readable address.
   - **Parameters:**
     - `location` (tuple): A tuple representing the geographic location (latitude, longitude).
   - **Result:**
     - `string`: The closest human-readable address to the provided location.

3. **DirectionsToLocation**

   - **Description:** Provides a list of directions to navigate from one location to another.
   - **Parameters:**
     - `location_from` (tuple): The starting geographic location (latitude, longitude).
     - `location_to` (tuple): The destination geographic location (latitude, longitude).
   - **Result:**
     - `list`: A list of step-by-step directions to reach the destination location.

4. **WaypointsToLocation**

   - **Description:** Provides a list of waypoints for navigating from one location to another.
   - **Parameters:**
     - `location_from` (tuple): The starting geographic location (latitude, longitude).
     - `location_to` (tuple): The destination geographic location (latitude, longitude).
   - **Result:**
     - `list`: A list of waypoints to follow to reach the destination location.

5. **DirectionsToAddress**

   - **Description:** Provides a list of directions to navigate from one address to another.
   - **Parameters:**
     - `address_from` (string): The starting human-readable address.
     - `address_to` (string): The destination human-readable address.
   - **Result:**
     - `list`: A list of step-by-step directions to reach the destination address.

6. **WaypointsToAddress**

   - **Description:** Provides a list of waypoints for navigating from one address to another.
   - **Parameters:**
     - `address_from` (string): The starting human-readable address.
     - `address_to` (string): The destination human-readable address.
   - **Result:**
     - `list`: A list of waypoints to follow to reach the destination address.

## Implementation

### JavaScript File (NavigationAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function NavigationAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("NavigationAgent", NavigationAgentNode);
}
```

### HTML File (Navigation.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("NavigationAgent");
</script>
```

## Usage

To use the NavigationAgent  node in Node-RED:

1. **Drag and Drop:** Drag the NavigationAgent  node from the Node-RED palette into your workspace.
2. **Configuration:** Configure the node by selecting the specific action you want to perform (e.g., ToLocation, DirectionsToLocation). Provide the necessary parameters for the action.
3. **Wiring:** Connect the node to other nodes in your flow to integrate it into your system.

## Notes

- **Service Availability:** Ensure that any required mapping or geolocation services are properly configured and accessible from within the Node-RED environment.
- **Common Methods:** The node leverages common methods shared across similar agent nodes, simplifying its configuration and registration within Node-RED.
