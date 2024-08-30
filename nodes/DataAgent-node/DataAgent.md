
# DataAgent Node Documentation

## Overview

The `DataAgent` node is used for querying and analyzing time series data related to various topics, such as environmental data, traffic statistics, and more. It forwards user queries to a language model that translates them into appropriate database queries, returning the results in a structured format.

## Node Functionality

### Actions

1. **AskDataAnalysisLLM**
   - **Description:** This action forwards the given question to a language model that has access to time series data on various topics. The model translates the user's question into appropriate database queries, retrieves the relevant data, and returns it in a structured format.
   - **Parameters:**
     - `question` (string): The question or query to be sent to the language model. This should include all necessary details to get an accurate response.
   - **Result:**
     - `object`: The result returned from the language model, which could be a single number, a list, or a dictionary of numbers, depending on the complexity of the query.

## Implementation

### JavaScript File (DataAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function DataAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("DataAgent", DataAgentNode);
}
```

### HTML File (DataAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("DataAgent");
</script>
```

## Usage

To use the `DataAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the time series database and the language model are properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
- For complex queries, ensure that the `question` parameter is detailed enough to allow the language model to generate accurate database queries.
