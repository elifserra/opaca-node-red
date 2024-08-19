
# ExchangeAgent Node Documentation

## Overview

The `ExchangeAgent` node is used for managing email-related functionalities within a system. It allows users to find email addresses, write emails, and schedule appointments using an integrated calendar.

## Node Functionality

### Actions

1. **FindEmailAddress**
   - **Description:** Find the email address associated with a specific user.
   - **Parameters:**
     - `nameQuery` (string): The name of the user whose email address is to be found.
   - **Result:**
     - `string`: The email address of the user.

2. **WriteEmail**
   - **Description:** Compose and send an email to the specified recipients.
   - **Parameters:**
     - `subject` (string): The subject of the email.
     - `message` (string): The body of the email.
     - `recipientEmails` (array of strings): A list of recipient email addresses.
   - **Result:**
     - `boolean`: Indicates whether the email was sent successfully.

3. **MakeAppointment**
   - **Description:** Schedule a new appointment with the given attendees on a specified date and time.
   - **Parameters:**
     - `subject` (string): The subject or title of the appointment.
     - `attendeeEmails` (array of strings): A list of attendees' email addresses.
     - `time` (integer): The time of the appointment (24-hour format).
     - `durationHours` (integer): The duration of the appointment in hours.
     - `date` (string): The date of the appointment.
   - **Result:**
     - `boolean`: Indicates whether the appointment was created successfully.

4. **MakeAppointmentToday**
   - **Description:** Schedule a new appointment with the given attendees for today.
   - **Parameters:** Same as `MakeAppointment`.
   - **Result:** Same as `MakeAppointment`.

5. **MakeAppointmentTomorrow**
   - **Description:** Schedule a new appointment with the given attendees for tomorrow.
   - **Parameters:** Same as `MakeAppointment`.
   - **Result:** Same as `MakeAppointment`.

6. **FindFreeHours**
   - **Description:** Find all available 1-hour slots where the specified users have free time on a given date.
   - **Parameters:**
     - `userEmails` (array of strings): A list of users' email addresses.
     - `date` (string): The date to check for availability.
   - **Result:**
     - `array of integers`: A list of available time slots.

7. **FindFreeHoursToday**
   - **Description:** Find all available 1-hour slots where the specified users have free time today.
   - **Parameters:** Same as `FindFreeHours`.
   - **Result:** Same as `FindFreeHours`.

8. **FindFreeHoursTomorrow**
   - **Description:** Find all available 1-hour slots where the specified users have free time tomorrow.
   - **Parameters:** Same as `FindFreeHours`.
   - **Result:** Same as `FindFreeHours`.

## Implementation

### JavaScript File (ExchangeAgent.js)

```javascript
const imports = require('../../nodes/resources/imports.js');
const js_common_methods = imports.js_common_methods_import;

module.exports = function(RED) {
    function ExchangeAgentNode(config) {
        js_common_methods.makeNodeConfiguration(RED, this, config);
    }
    RED.nodes.registerType("ExchangeAgent", ExchangeAgentNode);
}
```

### HTML File (ExchangeAgent.html)

```html
<script type="text/javascript" src="html_common_methods.js"></script>
<script type="text/javascript">
    makeNodeRegistration("ExchangeAgent");
</script>
```

## Usage

To use the `ExchangeAgent` node in Node-RED, drag and drop it from the palette into your workspace. Configure the necessary parameters based on the action you want to perform, and wire it to other nodes as needed.

## Notes

- Ensure that the email and calendar services are properly configured and accessible by the Node-RED environment.
- The node uses common methods shared across similar agent nodes, simplifying its configuration and registration in Node-RED.
