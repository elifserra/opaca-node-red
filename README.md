# OPACA Framework Node-RED Integration

## Overview

This project integrates the OPACA framework agens with Node-RED, a visual programming tool that allows for the flow-based development of applications. In this project, each Node-RED node represents a specific agent from the OPACA framework. These agents perform various roles, such as managing data exchange, interacting with external systems, and automating tasks. The goal of this project is to demonstrate how the OPACA framework can be effectively utilized within Node-RED to create a dynamic, responsive system.

## Project Structure

The project is organized into multiple directories, each corresponding to a particular agent or utility within the OPACA framework. These directories contain the necessary logic to define the behavior of each agent when represented as a Node-RED node. Below is a detailed description of each module:

### 1. **BaseAgent**
   - **Purpose:** This agent is not directly a opaca agent. This agent actually can be any opaca agent depending on the selected agent id by user.
   - **Role in Node-RED:** It has an input filed called as Agent ID. User can select the agent based on agent id. With the help of `opaca-access` node current agents are shown in the dropdown menu on the BaseAgent edit dialog. If new agent is added to stystem. User can use this node to use this new agent. However, if the user wants to use this new agent as a distinct node, user should create this agent node. Normally creating new agent node consists of creating two files. One of them is with .hmtl extension, the other is with .js extension. Thanks to `NodeCreator` node, user can automatically add new agent as NODE-RED node by filling the input fields of `NodeCreator` edit dialog.
   - [Detailed Documentation](./nodes/BaseAgent-node/BaseAgent.md)

### 2. **Camera**
   - **Purpose:** Manages camera devices, including image capture and video streaming, crucial for monitoring and real-time analysis.
   - **Role in Node-RED:** Integrates visual data into Node-RED flows, enabling real-time image processing within the OPACA framework.
   - [Detailed Documentation](./camera.md)

### 3. **ChatBot**
   - **Purpose:** Provides a conversational interface for users, allowing interaction with the system via natural language processing.
   - **Role in Node-RED:** Translates user input into actions within Node-RED flows, facilitating a user-friendly interface for the OPACA framework.
   - [Detailed Documentation](./ChatBot.md)

### 4. **ExchangeAgent**
   - **Purpose:** Facilitates secure and efficient data exchange within the OPACA framework.
   - **Role in Node-RED:** Handles the flow of data between various nodes, ensuring seamless communication within the system.
   - [Detailed Documentation](./ExchangeAgent.md)

### 5. **FridgeAgent**
   - **Purpose:** Manages smart fridge operations, such as temperature control and inventory management.
   - **Role in Node-RED:** Integrates these functionalities into Node-RED, allowing for automated control of the fridge environment.
   - [Detailed Documentation](./FridgeAgent.md)

### 6. **HomeAssistantAgent**
   - **Purpose:** Interfaces with home automation platforms like Home Assistant, extending the OPACA framework's reach into home automation.
   - **Role in Node-RED:** Acts as a bridge between Node-RED and smart home devices, enabling their integration into the OPACA-based system.
   - [Detailed Documentation](./HomeAssistantAgent.md)

### 7. **InvokeAction**
   - **Purpose:** Automates responses within the system by triggering actions based on specific conditions or inputs.
   - **Role in Node-RED:** Enhances automation within Node-RED flows by allowing conditional actions and event-driven behaviors.
   - [Detailed Documentation](./invoke-action.md)

### 8. **NodeCreator**
   - **Purpose:** Provides utilities for creating custom nodes in Node-RED, allowing for the expansion of OPACA framework functionalities within the Node-RED environment.
   - **Role in Node-RED:** Facilitates the development of new, specialized agents within Node-RED.
   - [Detailed Documentation](./NodeCreator.md)

### 9. **OpacaAccess**
   - **Purpose:** Manages access control and security within the OPACA framework, ensuring that only authorized agents and users can interact with the system.
   - **Role in Node-RED:** Enforces security measures within Node-RED, protecting the system from unauthorized access.
   - [Detailed Documentation](./opaca-access.md)

### 10. **RoomBookingAgent**
   - **Purpose:** Manages room booking and scheduling, providing a system for reserving and managing shared spaces.
   - **Role in Node-RED:** Integrates room scheduling into Node-RED flows, allowing for automated booking and management within the OPACA framework.
   - [Detailed Documentation](./RoomBookingAgent.md)

### 11. **ServletAgent**
   - **Purpose:** Provides servlet-based interactions, enabling web-based control and monitoring of the system.
   - **Role in Node-RED:** Integrates web interfaces with the OPACA framework, allowing for browser-based management of system components.
   - [Detailed Documentation](./ServletAgent.md)

### 12. **ShelfAgent**
   - **Purpose:** Manages smart shelves, tracking inventory levels and ensuring proper organization of items within storage spaces.
   - **Role in Node-RED:** Essential for inventory management within the OPACA framework, integrating real-time tracking into Node-RED.
   - [Detailed Documentation](./ShelfAgent.md)

### 13. **WayfindingAgent**
   - **Purpose:** Provides wayfinding assistance, helping users navigate complex environments within large facilities.
   - **Role in Node-RED:** Integrates navigation support into Node-RED flows, enabling real-time guidance within the OPACA framework.
   - [Detailed Documentation](./WayfindingAgent.md)

### 14. **Common HTML Template**
   - **Purpose:** Provides a standardized HTML template used across various web-based components of the project.
   - [Detailed Documentation](./common_html_template.md)

### 15. **HTML Common Methods**
   - **Purpose:** Contains reusable HTML methods that support the development of web interfaces within the project.
   - [Detailed Documentation](./html_common_methods.md)

### 16. **JavaScript Common Methods**
   - **Purpose:** Offers a set of JavaScript methods commonly used across different modules, facilitating code reuse.
   - [Detailed Documentation](./js_common_methods.md)

### 17. **Imports**
   - **Purpose:** Manages the import of necessary libraries and dependencies required by the project’s modules.
   - [Detailed Documentation](./imports.md)

### 18. **Node Configuration**
   - **Purpose:** Provides configuration settings for custom nodes, allowing for easier setup and integration of new nodes in Node-RED.
   - [Detailed Documentation](./node_config.md)

## Prerequisites

### Node-RED Installation

To use this project, you need to have Node-RED installed. Node-RED is essential for deploying and interacting with the OPACA framework agents as nodes.

1. **Install Node-RED:**
   - Node-RED can be installed on various operating systems. Follow the instructions on the [Node-RED official website](https://nodered.org/docs/getting-started/) to install it.

2. **Start Node-RED:**
   - After installation, run Node-RED by entering `node-red` in your terminal. The Node-RED editor will be accessible at `http://localhost:1880`.

3. **Deploy the Project:**
   - Import the provided JSON flow files into Node-RED and deploy them. These flows represent the interactions and operations of the OPACA agents within the Node-RED environment.

## Usage

Once Node-RED is running and the agents are deployed, you can interact with the system through the Node-RED dashboard or via direct API calls. Each agent is designed to perform specific tasks within the OPACA framework, making it easier to manage and automate complex environments.

## Additional Resources

For more information about Node-RED and how it integrates with the OPACA framework, visit the [official Node-RED website](https://nodered.org/).

---

This README provides a detailed overview of how the OPACA framework agents are represented and utilized within Node-RED, offering a clear guide for setting up and using this integrated system.
