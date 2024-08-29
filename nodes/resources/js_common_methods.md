
# JavaScript Common Methods Documentation

## Overview
The `js_common_methods.js` file contains essential JavaScript methods that are shared across multiple nodes in the Node-RED project. These methods handle core functionalities such as node configuration, message processing, and interaction with external APIs.

## Purpose
This file is critical for the operation of the nodes, providing a centralized set of tools that ensure consistency and reusability across the project. By using these common methods, the nodes can operate more efficiently and maintainably.

## Key Methods

### 1. **invokeAction(endpoint, actionParameters, msg)**
This asynchronous function sends a POST request to the server to invoke a specified action. It processes the action parameters into a JSON string and handles the response by updating the `msg.payload`.

- **Parameters**: 
  - `endpoint`: The server endpoint where the action is invoked.
  - `actionParameters`: The parameters required for the action.
  - `msg`: The Node-RED message object.

### 2. **toJsonString(parameterArray)**
This function converts an array of action parameters into a JSON string. It checks the parameter type and processes it accordingly, ensuring that the resulting JSON string is correctly formatted for the action.

### 3. **fetchOpacaTokenAndAgents(username, password, apiUrl, loginUrl, RED)**
This function handles user authentication and retrieves the list of agents from the server. It fetches a token using the provided credentials and then uses this token to request the agents and their actions.

- **Parameters**:
  - `username`, `password`: User credentials for authentication.
  - `apiUrl`, `loginUrl`: The URLs for the API and login endpoints.
  - `RED`: The Node-RED object.

### 4. **makeNodeConfiguration(RED, node, config)**
This function is used to configure a Node-RED node, setting it up with the provided configuration parameters and preparing it for operation within a flow. It also manages the invocation of actions when a message is received.

- **Parameters**:
  - `RED`: The Node-RED object.
  - `node`: The node being configured.
  - `config`: The configuration object for the node.

## Usage
These methods are imported and used by various nodes in the project to handle common tasks such as action invocation, message processing, and configuration. By centralizing these methods in one file, the project ensures that all nodes operate consistently and that the codebase remains clean and maintainable.

