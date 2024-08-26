
# ControlCenterAgent Node Documentation

## Overview

The `ControlCenterAgent` node is designed to manage and visualize various geographical operations on a map within a smart control center system. It allows users to highlight locations and paths on a map and clear those highlights.

## Node Functionality

### Actions

1. **HighlightLocation**
   - **Description:** Highlight a single location (latitude and longitude) on the map.
   - **Parameters:**
     - `location` (array of numbers, required): The latitude and longitude coordinates of the location to be highlighted.
     - `type` (string, optional): The type of marker to be used for highlighting.
     - `label` (string, optional): A label to be displayed at the highlighted location.
     - `clear` (boolean, optional): Whether to clear existing highlights before adding this one.
   - **Result:**
     - `boolean`: Indicates if the location was successfully highlighted.

2. **HighlightPath**
   - **Description:** Highlight a path consisting of multiple locations on the map.
   - **Parameters:**
     - `locations` (array of arrays, required): A list of latitude and longitude coordinates that define the path.
     - `label` (string, optional): A label to be associated with the path.
     - `clear` (boolean, optional): Whether to clear existing highlights before adding this path.
   - **Result:**
     - `boolean`: Indicates if the path was successfully highlighted.

3. **ClearHighlight**
   - **Description:** Clear all current highlights from the map.
   - **Parameters:**
     - None
   - **Result:**
     - `boolean`: Indicates if the highlights were successfully cleared.

## Implementation

### JavaScript File (ControlCenterAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function ControlCenterAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("ControlCenterAgent", ControlCenterAgentNode);
}
```

### HTML File (ControlCenterAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("ControlCenterAgent");
</script>
```

## Usage

To use the `ControlCenterAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the map services are properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
