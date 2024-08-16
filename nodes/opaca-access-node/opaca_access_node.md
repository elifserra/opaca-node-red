
# Opaca Access Node Documentation

## Overview

The **Opaca Access Node** is a Node-RED node designed to handle authentication and communication with the OPACA system. This node enables secure interaction with the OPACA API by managing tokens and fetching agent data, which is critical for the operation of other nodes in the system.

## Features

- **Dual Authentication Methods**: 
  - **Manual Authorization**: Authenticate directly through the Node-RED editor interface.
  - **Automated Injection**: Authenticate by injecting credentials directly into the node.
- **HTTP API Integration**: Seamlessly integrates with OPACA's API to fetch tokens and agents.
- **Customizable**: Flexible configuration options to meet various authentication and API interaction needs.

## Node Configuration

### Properties

- **Username**: The OPACA account username.
- **Password**: The OPACA account password.
- **URL**: The API endpoint URL (optional).

### Authentication Methods

#### Method 1: Manual Authorization

1. Drag the **Opaca Access Node** into your Node-RED flow.
2. Double-click the node to open the configuration dialog.
3. Enter the **Username** and **Password** fields.
4. Click the **Authorize** button to manually authenticate.
5. Upon successful authentication, a success message will be displayed.

#### Method 2: Automated Injection

1. Use an Inject node to pass credentials into the **Opaca Access Node**.
2. The Inject node should provide a `msg` object containing `username` and `password` properties.
3. Upon injection, the node will automatically authenticate and fetch the OPACA token and agents.

## API Integration

### Fetching OPACA Token and Agents

The Opaca Access Node uses a predefined method to fetch tokens and agents from the OPACA system:

- **fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED)**
  - **username**: OPACA account username.
  - **password**: OPACA account password.
  - **apiUrl**: The main API URL for interaction.
  - **loginUrl**: The login URL to obtain the authentication token.

This method is triggered either through manual authorization or automated injection.

## HTTP Endpoints

### Authorization Endpoint

The Opaca Access Node provides an HTTP POST endpoint for manual authorization:

- **Endpoint**: `/opaca-access/authorize`
- **Method**: POST
- **Payload**:
  - `username`: The OPACA account username.
  - `password`: The OPACA account password.
- **Response**:
  - `success`: A boolean indicating whether the authorization was successful.
  - `error`: An error message, if applicable.

### Common HTML Methods Endpoint

This endpoint serves the common HTML methods used in the node's front-end:

- **Endpoint**: `/html_common_methods.js`
- **Method**: GET
- **Response**: The content of the `html_common_methods.js` file.

### Common HTML Template Endpoint

This endpoint serves a common HTML template used across multiple nodes:

- **Endpoint**: `/common_html_template.html`
- **Method**: GET
- **Response**: The content of the `common_html_template.html` file.

## Development

### File Structure

- **opaca-access.js**: The main node implementation file.
- **opaca-access.html**: The HTML template file for the node's configuration UI.
- **resources/imports.js**: Contains all the necessary imports for the node, such as common methods and API URLs.

### Adding New Features

To extend the functionality of the Opaca Access Node:
1. Modify the `opaca-access.js` file to include new methods or properties.
2. Update the `opaca-access.html` file to reflect any new configuration options.
3. Test the node thoroughly in a Node-RED environment.

## Troubleshooting

- **Authorization Failures**:
  - Ensure that the correct username and password are provided.
  - Verify that the API URLs (`apiUrl`, `loginUrl`) are correctly configured.
  
- **Missing Methods**:
  - Ensure that the `html_common_methods.js` file is correctly served by the Node-RED environment.
  - Verify the file paths in the `imports.js` file.

## Conclusion

The Opaca Access Node is an essential tool for integrating Node-RED with the OPACA system. By providing robust authentication and API interaction capabilities, it enables the seamless operation of various OPACA-related workflows within Node-RED.
