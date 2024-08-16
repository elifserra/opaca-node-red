
# ShelfAgent Node Documentation

## Overview

The `ShelfAgent` node is designed to manage the smart shelf system in a facility. It allows users to find items in shelves and open or close shelves as needed.

## Node Functionality

### Actions

1. **FindInShelf**
   - **Description:** Find the ID of the shelf containing a specific item.
   - **Parameters:**
     - `item` (string): The name of the item to search for.
   - **Result:**
     - `integer`: The ID of the shelf containing the item, or -1 if not found.

2. **OpenShelf**
   - **Description:** Open a specific shelf by its ID.
   - **Parameters:**
     - `shelf` (integer): The ID of the shelf to open.
   - **Result:**
     - `boolean`: Indicates whether the shelf was opened successfully.

3. **CloseShelf**
   - **Description:** Close a specific shelf by its ID.
   - **Parameters:**
     - `shelf` (integer): The ID of the shelf to close.
   - **Result:**
     - `boolean`: Indicates whether the shelf was closed successfully.

## Implementation

### JavaScript File (ShelfAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function ShelfAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("ShelfAgent", ShelfAgentNode);
}
```

### HTML File (ShelfAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("ShelfAgent");
</script>
```

## Usage

To use the `ShelfAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the smart shelf system is properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
