
# HTML Common Methods Documentation

## Overview
The `html_common_methods.js` file contains a set of reusable JavaScript methods that are used in the HTML files of various nodes within the Node-RED project. These methods help manage the user interface and interaction logic, making the code more organized and reducing redundancy.

## Purpose
This file is essential for handling common tasks like fetching data, updating the UI, and processing user input within the Node-RED editor. It provides a standardized way to handle these tasks across different nodes, ensuring consistency and maintainability.

## Key Components

### 1. **Agent Class**
The `Agent` class is a key component that represents an agent within the Node-RED environment. This class is responsible for managing agent-related data, such as the agent's name, ID, actions, and parameters.

- **fetchAgentActions()**: Fetches the available actions for the agent from the server.
- **applyChangesForActionChange()**: Updates the UI based on the selected action.
- **oneditPrepareFunction(node)**: Prepares the agent node for editing, including fetching actions and setting up the UI.
- **oneditSaveFunction(node)** and **oneditCancelFunction(node)**: Handle saving or canceling changes made during editing.

### 2. **Action Class**
The `Action` class represents an action that an agent can perform. It manages the parameters required for the action and handles the invocation of the action.

- **saveParametersHtml()**: Saves the HTML representation of the action's parameters.
- **invokeAction(queryString)**: Sends the action request to the server and handles the response.
- **handleInvokeAction(node)**: Manages the process of invoking an action from the UI.

### 3. **Parameter Class**
The `Parameter` class represents individual parameters that are required by an action. It manages the parameter's name, type, value, and how it should be processed (e.g., as a string or message).

### 4. **Utility Methods**
- **makeNodeRegistration(agentNodeName)**: Registers a new node in Node-RED using the configuration provided in the `node_config.json` file.
- **makeBaseNodeRegistration(baseAgentNodeName)**: Similar to `makeNodeRegistration` but specifically designed for the `BaseAgent` node.

## Usage
This file is included in the HTML files of the nodes as a `<script>` tag. The methods and classes it defines are essential for the proper functioning of the nodes' user interfaces. By centralizing these methods, the project ensures that all nodes behave consistently and are easier to maintain.

