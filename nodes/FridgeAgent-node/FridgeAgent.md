
# FridgeAgent Node Documentation

## Overview

The `FridgeAgent` node is designed to manage the inventory of groceries within a smart fridge system. It allows users to get, add, and remove groceries from the fridge.

## Node Functionality

### Actions

1. **GetGroceries**
   - **Description:** Retrieve a list of groceries in the fridge by category.
   - **Parameters:**
     - `category` (string): The category of groceries to retrieve.
   - **Result:**
     - `array`: A list of groceries in the specified category.

2. **AddGroceries**
   - **Description:** Add a new item to the fridge's inventory.
   - **Parameters:**
     - `name` (string): The name of the grocery item.
     - `amount` (integer): The quantity of the grocery item.
     - `expirationDate` (string): The expiration date of the item.
     - `category` (string): The category under which the item should be listed.
   - **Result:**
     - `string`: A confirmation message indicating the item was added successfully.

3. **RemoveGroceries**
   - **Description:** Remove an item or multiple items from the fridge's inventory.
   - **Parameters:**
     - `names` (array of strings): A list of grocery item names to remove.
   - **Result:**
     - `string`: A confirmation message indicating the item(s) were removed successfully.

## Implementation

### JavaScript File (FridgeAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function FridgeAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("FridgeAgent", FridgeAgentNode);
}
```

### HTML File (FridgeAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("FridgeAgent");
</script>
```

## Usage

To use the `FridgeAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the fridge management services are properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
