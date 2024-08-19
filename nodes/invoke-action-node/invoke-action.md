# InvokeAction Node Documentation

## Overview

The `InvokeAction` node is a special node within your Node-RED environment. Unlike other nodes that are tied to a specific agent, the `InvokeAction` node contains actions from all agents in your system. This means that it can trigger any action from any agent, providing a centralized node for action management.

## Unique Feature

### Centralized Action Management Across All Agents

- **Description:** The `InvokeAction` node is designed to house all actions from every agent in your system. This allows you to use a single node to trigger any action across different agents, offering a form of centralized management.
  
- **Practicality:** While this feature is unique, it doesn't necessarily provide significant advantages over using agent-specific nodes. In many cases, using the dedicated nodes for each agent is more straightforward and clearer in terms of flow design.

## Node Functionality

### Implementation

- **JavaScript File (invoke-action.js):**

    ```javascript
    const imports = require('../../nodes/resources/imports.js');
    const js_common_methods = imports.js_common_methods_import;

    module.exports = function(RED) {
        function InvokeActionNode(config) {
            js_common_methods.makeNodeConfiguration(RED, this, config);
        }
        RED.nodes.registerType("invoke-action", InvokeActionNode);
    };
    ```

- **HTML File (invoke-action.html):**

    ```html
    <script type="text/javascript" src="html_common_methods.js"></script>
    <script type="text/javascript">
        makeNodeRegistration("invoke-action");
    </script>
    ```

## Usage

### All-In-One Action Invocation

To use the `InvokeAction` node in Node-RED, drag and drop it from the palette into your workspace. You will be able to select from a list of available actions across all agents in your system.



## Conclusion

The `InvokeAction` node offers a unique capability by containing all agent actions within a single node.
