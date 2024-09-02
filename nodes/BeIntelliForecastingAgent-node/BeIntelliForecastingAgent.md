
# BeIntelliForecastingAgent Node Documentation

## Overview

The `BeIntelliForecastingAgent` node is designed to forecast pollution metrics at specified sensor locations. This agent helps in predicting the levels of various pollutants over a given number of hours based on the data from specific sensors.

## Node Functionality

### Actions

1. **ForecastPollution**
   - **Description:** Predict the levels of pollutants like NO, NO2, O3, r1pm1, r1pm10, and r1pm25 at a specified sensor location for the next set of hours.
   - **Parameters:**
     - `n_hours` (integer): The number of hours to forecast into the future.
     - `sensor_id` (string): The unique identifier for the sensor whose data will be used for the forecast.
   - **Result:**
     - `string`: A forecast report detailing the predicted pollution metrics.

## Implementation

### JavaScript File (BeIntelliForecastingAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function BeIntelliForecastingAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("BeIntelliForecastingAgent", BeIntelliForecastingAgentNode);
}
```

### HTML File (BeIntelliForecastingAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("BeIntelliForecastingAgent");
</script>
```

## Usage

To use the `BeIntelliForecastingAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the forecast action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the sensor data sources are properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
