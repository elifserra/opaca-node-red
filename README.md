# IoT Smart System with Node-RED

## Overview

This project is a sophisticated IoT application built using Node-RED, a flow-based development tool for visual programming. The project simulates a smart environment where various agents and services collaborate to monitor, manage, and interact with IoT devices. The application is structured into multiple modules, each serving a distinct purpose within the overall system.

## Project Structure

The project is organized into several directories, each containing specific modules that contribute to the overall functionality. Below is a detailed overview of each directory:

### 1. **BaseAgent**
   - **Purpose:** This module provides the core functionality for creating and managing agents within the Node-RED environment. These agents serve as the foundational elements for interacting with IoT devices.
   - **Details:** It includes essential classes and methods used by other agents to ensure consistency and reliability across the system.
   - [Detailed Documentation](./BaseAgent.md)

### 2. **Camera**
   - **Purpose:** Manages camera devices within the IoT system, handling image capture, video streaming, and processing of visual data within Node-RED flows.
   - **Details:** Integrates visual monitoring into the system, enabling the capture and analysis of images or video streams.
   - [Detailed Documentation](./camera.md)

### 3. **ChatBot**
   - **Purpose:** Implements a chatbot interface that allows users to interact with the IoT system through natural language. This module processes user inputs and provides context-appropriate responses.
   - **Details:** Facilitates voice or text-based control of the smart environment, making the system more user-friendly.
   - [Detailed Documentation](./ChatBot.md)

### 4. **ExchangeAgent**
   - **Purpose:** Handles data exchange between different components of the system, ensuring secure and reliable communication.
   - **Details:** Plays a critical role in maintaining data integrity and facilitating the smooth operation of interconnected devices.
   - [Detailed Documentation](./ExchangeAgent.md)

### 5. **FridgeAgent**
   - **Purpose:** Manages the smart fridge’s operations, including temperature control and inventory management. Ensures that perishable goods are stored under optimal conditions.
   - **Details:** Essential for applications where environmental control and inventory tracking are crucial.
   - [Detailed Documentation](./FridgeAgent.md)

### 6. **HomeAssistantAgent**
   - **Purpose:** Integrates with home automation platforms like Home Assistant, enabling control and interaction with various smart home devices through Node-RED.
   - **Details:** Allows for seamless integration of the IoT system with existing smart home ecosystems.
   - [Detailed Documentation](./HomeAssistantAgent.md)

### 7. **InvokeAction**
   - **Purpose:** Contains logic for triggering actions based on specific conditions or inputs within Node-RED flows, automating responses to sensor data or user commands.
   - **Details:** Automates tasks such as sending alerts or activating devices in response to environmental changes.
   - [Detailed Documentation](./invoke-action.md)

### 8. **NodeCreator**
   - **Purpose:** Provides tools for creating custom nodes within Node-RED, extending its capabilities to meet specific project requirements.
   - **Details:** Enables the development of reusable components that can enhance the functionality of Node-RED.
   - [Detailed Documentation](./NodeCreator.md)

### 9. **OpacaAccess**
   - **Purpose:** Manages access control and security within the IoT system, ensuring that only authorized users and devices can interact with the system.
   - **Details:** Implements security protocols to protect against unauthorized access.
   - [Detailed Documentation](./opaca-access.md)

### 10. **RoomBookingAgent**
   - **Purpose:** Manages the booking and scheduling of rooms within the smart environment, integrating with calendars and other scheduling tools.
   - **Details:** Facilitates the efficient management of shared spaces within an organization.
   - [Detailed Documentation](./RoomBookingAgent.md)

### 11. **ServletAgent**
   - **Purpose:** Provides servlet-based interactions within the IoT system, enabling web-based control and monitoring.
   - **Details:** Allows for the integration of web interfaces with the IoT environment, providing a platform for user interaction.
   - [Detailed Documentation](./ServletAgent.md)

### 12. **ShelfAgent**
   - **Purpose:** Manages smart shelves that track inventory levels and ensure the proper organization of items within a storage space.
   - **Details:** Essential for inventory management in warehouses or retail environments.
   - [Detailed Documentation](./ShelfAgent.md)

### 13. **WayfindingAgent**
   - **Purpose:** Provides wayfinding assistance within large facilities, helping users navigate complex environments.
   - **Details:** Integrates with mapping and GPS systems to offer real-time navigation support.
   - [Detailed Documentation](./WayfindingAgent.md)

## Common Components

### **Common HTML Template**
   - **Purpose:** Provides a standardized HTML template used across various web-based components of the project.
   - [Detailed Documentation](./common_html_template.md)

### **HTML Common Methods**
   - **Purpose:** Contains reusable HTML methods that support the development of web interfaces within the project.
   - [Detailed Documentation](./html_common_methods.md)

### **JavaScript Common Methods**
   - **Purpose:** Offers a set of JavaScript methods that are commonly used across different modules in the project, facilitating code reuse.
   - [Detailed Documentation](./js_common_methods.md)

### **Imports**
   - **Purpose:** Manages the import of necessary libraries and dependencies required by the project’s modules.
   - [Detailed Documentation](./imports.md)

### **Node Configuration**
   - **Purpose:** Provides configuration settings for custom nodes within Node-RED, allowing for easier setup and integration of new nodes.
   - [Detailed Documentation](./node_config.md)

## Prerequisites

### Node-RED Installation

To run this project, you must have Node-RED installed on your system. Node-RED is a flow-based development tool that enables you to visually program IoT applications.

1. **Install Node-RED:**
   - Node-RED can be installed on various platforms, including Windows, macOS, and Linux. Detailed installation instructions can be found on the [Node-RED official website](https://nodered.org/docs/getting-started/).

2. **Start Node-RED:**
   - After installation, start Node-RED by running the `node-red` command in your terminal. Access the Node-RED editor by navigating to `http://localhost:1880` in your web browser.

3. **Deploy the Project:**
   - Import the JSON flow file into Node-RED and deploy it. The flow will immediately start running, enabling you to interact with the system’s components.

### Additional Setup

- **Custom Nodes:** The project may require the installation of additional nodes. For example, if the project includes dashboards, you might need to install the `node-red-dashboard` module. Install additional nodes via the "Manage Palette" section in Node-RED.

## Usage

Once Node-RED is running and the flows are deployed, you can interact with the system through the provided dashboard or APIs. Each module handles specific tasks, and their integration allows for comprehensive monitoring and control of the smart environment.

## Resources

- **Node-RED Documentation:** For further information about Node-RED, visit the [official Node-RED website](https://nodered.org/).

---

This README provides a detailed overview of the project structure, including installation and usage instructions. By following the steps outlined, you can set up and run the IoT application on your system, leveraging the full capabilities of Node-RED.
