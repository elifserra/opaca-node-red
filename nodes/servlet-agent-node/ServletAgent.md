
# ServletAgent Node Documentation

## Overview

The `ServletAgent` node is designed to interact with a servlet-based system, allowing users to display messages, get and set values, and control the title of the servlet interface.

## Node Functionality

### Actions

1. **ShowMessage**
   - **Description:** Display a message on the servlet interface.
   - **Parameters:**
     - `message` (string): The message to display.
     - `seconds` (integer, optional): The duration in seconds to display the message.
   - **Result:** None.

2. **GetValue**
   - **Description:** Retrieve a value from the servlet based on a key.
   - **Parameters:**
     - `key` (string): The key associated with the value to retrieve.
   - **Result:**
     - `string`: The value associated with the key.

3. **SetTitle**
   - **Description:** Set the title of the servlet interface.
   - **Parameters:**
     - `title` (string): The new title for the servlet.
   - **Result:** None.

4. **SetValue**
   - **Description:** Set a value in the servlet associated with a key.
   - **Parameters:**
     - `key` (string): The key to associate with the value.
     - `value` (string): The value to set.
   - **Result:** None.

## Implementation

### JavaScript File (ServletAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function ServletAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("ServletAgent", ServletAgentNode);
}
```

### HTML File (ServletAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("ServletAgent");
</script>
```

## Usage

To use the `ServletAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the servlet system is properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
