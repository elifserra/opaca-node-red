
# BaseAgent Node Documentation

## Overview
The `BaseAgent-node` serves as a foundational node within the OPACA framework. It provides essential configuration and processing capabilities that other agent nodes can build upon. This node acts as a base, allowing for the extension and reuse of common methods across different agents.
With the help of Agent ID dropdown select option on the edit dialog, this node can be configured to behave and work as every agent node.
Let's imagine new agent is added to opaca framework, this agent node will not be shown on the node red `ZEKI` palette.
However, this new opaca agent will be shown in the dropdown select option list. It means this new agent can bu used on the node red.

There is another and very powerful method for users and programmers to use the new agent. This method enable user to add new agent as a node-red node
without writng any code. This is explained in detail in the `NodeCreator-node`.

## Directory Structure

- **`BaseAgent.html`**: This file defines the user interface (UI) for configuring the `BaseAgent` node within the Node-RED editor.
- **`BaseAgent.js`**: Contains the core logic and behavior of the `BaseAgent` node in the Node-RED runtime.

## Detailed Explanation of Files

### 1. `BaseAgent.html`
This file is responsible for setting up the Node-RED editor interface for the `BaseAgent` node. It includes form elements that allow users to input necessary configurations, such as the agent ID, action parameters, and other settings relevant to the agent's operation.

**Key Components**:
- **CSS Styling**: The file includes CSS for styling buttons and other UI components, ensuring a consistent and user-friendly appearance across the Node-RED editor.
- **Form Elements**: Input fields and buttons are provided to allow users to configure the node's behavior. For example, users can select an agent ID or trigger actions directly from the Node-RED UI.

### 2. `BaseAgent.js`
The JavaScript file implements the node's logic. It handles the node's initialization, processing of incoming messages, and interactions with the Node-RED flow.

**Key Functions**:
- **`BaseAgentNode` Function**: This is the main function that sets up the node's behavior. It uses the `js_common_methods` to handle repetitive tasks, ensuring a DRY (Don't Repeat Yourself) approach.
- **`RED.nodes.registerType("BaseAgent", BaseAgentNode)`**: This line registers the node within Node-RED, making it available in the palette for users to drag into their flows.

## Integration with Resources

### 1. `js_common_methods.js`
This file is imported and used within `BaseAgent.js`. It provides shared methods for configuring nodes, processing messages, and interacting with external services. The use of common methods ensures consistency across different nodes and simplifies maintenance.

### 2. `html_common_methods.js`
This file may be referenced in `BaseAgent.html` to standardize HTML manipulations, such as creating form elements or handling user inputs. By centralizing these methods, the project reduces redundancy and improves UI consistency.

## Usage Example

### Adding the `BaseAgent` to a Flow
1. Drag the `BaseAgent` node from the Node-RED palette into your flow.
2. Double-click the node to open its configuration UI.
3. Set the agent ID and other parameters as required.
4. Deploy the flow to start using the `BaseAgent` node.

## Note : 
    If you add this node to flow, do not forget to make authentication via `opaca-access-node`.


The `BaseAgent` node will process messages according to the configurations set, interacting with other nodes and services as needed.

## Conclusion
The `BaseAgent-node` is a critical component in the OPACA Node-RED project, providing a reusable base for other agent nodes. Its integration with shared resources ensures consistency and ease of use, making it an essential tool for building complex flows in Node-RED.
