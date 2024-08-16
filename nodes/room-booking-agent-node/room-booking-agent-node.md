
# Room Booking Agent Node Documentation

## Overview
The `room-booking-agent-node` is designed to manage room booking systems within a Node-RED flow. This node allows users to interact with booking services, manage room availability, and automate the process of booking rooms. It integrates seamlessly with other nodes to provide a comprehensive room management solution.

## Directory Structure

- **`RoomBookingAgent.html`**: This file defines the user interface (UI) for configuring the `room-booking-agent-node` in the Node-RED editor.
- **`RoomBookingAgent.js`**: Contains the core logic and behavior of the `room-booking-agent-node` in the Node-RED runtime.

## Detailed Explanation of Files

### 1. `RoomBookingAgent.html`
This file sets up the Node-RED editor interface for the `room-booking-agent-node`. It includes form elements that allow users to configure the room booking parameters, manage availability, and set up notifications for booking confirmations or cancellations.

**Key Components**:
- **Form Elements**: Users can input and adjust settings related to room availability, booking duration, and notification preferences.

### 2. `RoomBookingAgent.js`
The JavaScript file implements the functionality of the `room-booking-agent-node`. It handles the interaction with booking services, manages room availability, processes booking requests, and triggers actions based on user configurations.


## Integration with Resources:

### 1. `js_common_methods.js`
This file is imported and used within `RoomBookingAgent.js` to be able to access makeNodeConfiguration method.
This method make node configuration and registration.

### 2. `html_common_methods.js`
This file is used in `RoomBookingAgent.html` to access Agent, Action and parameter class and also other common methods between agents. 

### Adding the `room-booking-agent-node` to a Flow
1. Drag the `room-booking-agent-node` from the Node-RED palette into your flow.
2. Double-click the node to open its configuration UI.
3. Select the action that you want to invoke.
4. Enter the necessary parameters to be able to run that action
5. Drag official node-red `inject-node` to flow and connect to `room-booking-agent-node`.
6. Press inject node, this trigger the `room-booking-agent-node` to invoke the action and send the action result to the next node if there is a next node.

There is another option to be able to invoke action, On edit dialog user can press the invoke action button. When it is pressed invoke result will be displayed on the screen. But, do not forget that this feature is not used in flow. If you want to use action result in flow you need to trigger the flow via inject node.

## Conclusion
The `room-booking-agent-node` is an essential tool for automating room booking processes within Node-RED. By leveraging shared resources and standardized methods, this node provides a powerful solution for managing room availability, processing bookings, and ensuring smooth operations within your organization.
