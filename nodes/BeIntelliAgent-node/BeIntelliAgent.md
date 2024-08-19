
# BeIntelliAgent Node Documentation

## Overview

The BeIntelliAgent node is designed for managing various functionalities related to the BeIntelli vehicle fleet. It allows users to find a specific car within the fleet, locate available parking spots around a given area, and retrieve air quality data near a specified location.

## Node Functionality

### Actions

1. **FindMyCar**

   - **Description:** Retrieves the location of a specific car within the BeIntelli vehicle fleet.
   - **Parameters:**
     - `name` (string): The name or identifier of the car whose location is to be found.
   - **Result:**
     - `Location`: The geographic location of the specified car.

2. **FindParkingSpots**

   - **Description:** Identifies available parking spots around a given location.
   - **Parameters:**
     - `location` (Location): The starting location around which to search for parking spots.
     - `radius_meters` (integer): The radius within which to search for parking spots, specified in meters.
   - **Result:**
     - `list`: A list of available parking spot locations within the specified radius.

3. **GetAirQuality**

   - **Description:** Retrieves the air quality near a specified location.
   - **Parameters:**
     - `location` (Location): The location for which to check air quality.
     - `max_distance_meters` (integer): The maximum distance from the specified location within which to check the air quality, specified in meters.
   - **Result:**
     - `string`: The air quality information near the specified location.

## Implementation

### JavaScript File (BeIntelliAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function BeIntelliAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("BeIntelliAgent", BeIntelliAgentNode);
}
```

### HTML File (BeIntelliAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("BeIntelliAgent");
</script>
```

## Usage

To use the BeIntelliAgent node in Node-RED:

1. **Drag and Drop:** Drag the BeIntelliAgent node from the Node-RED palette into your workspace.
2. **Configuration:** Configure the node by selecting the specific action you want to perform (e.g., FindMyCar, FindParkingSpots, GetAirQuality). Provide the necessary parameters for the action.
3. **Wiring:** Connect the node to other nodes in your flow to integrate it into your system.

## Notes

- **Service Availability:** Ensure that the BeIntelli services are properly configured and accessible from within the Node-RED environment.
- **Common Methods:** The node leverages common methods shared across similar agent nodes, simplifying its configuration and registration within Node-RED.
