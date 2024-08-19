
# ChatBot Node HTML Methods Documentation

This document explains the methods and elements found in the `ChatBot.html` file, which defines the user interface and interactivity for the ChatBot node in Node-RED. This node allows for multi-modal interactions and is integrated with the OPACA framework to interact with various agents.

## HTML Template Structure

### 1. `ChatBot` Template

This template is used to define the structure and styling of the ChatBot node's edit dialog in Node-RED.

#### HTML Elements:

- **`#chat-container`**: A container for the entire chat interface, including chat history and user input controls.
- **`#chat-history`**: A div where chat messages (both user and bot) are displayed.
- **`#user-input`**: A container holding the input text field and action buttons (Send, Clear, Record).
- **`#user-text`**: An input field where users can type their messages.
- **`#send-button`**: A button for sending the typed message to the bot.
- **`#clear-button`**: A button for clearing the chat history.
- **`#record-button`**: A button for starting and stopping voice recording.
- **`#webcam`**: A video element that streams the webcam feed.
- **`#canvas`**: A hidden canvas element used to capture images from the webcam.

### 2. `Style` Section

This section defines the CSS styles for the ChatBot node UI.

- **`#chat-container`**: Styles the chat container, including its size, padding, and background color.
- **`.user-message` & `.bot-message`**: Styles the appearance of messages sent by the user and bot, respectively.
- **`#user-input`**: Defines the layout of the user input section, including spacing and alignment.
- **`#send-button`, `#clear-button`, `#record-button`**: Style the action buttons, including their appearance when hovered or clicked.

## JavaScript Methods

### 1. `speakWithOpenAITTS(text, isHD = false, apiKey)`

- **Purpose**: Converts the given text into speech using OpenAI's Text-to-Speech (TTS) API.
- **Functionality**:
  - Sends a POST request to the OpenAI TTS API.
  - The response is an audio blob, which is then played using the `playAudioBlob` method.

### 2. `playAudioBlob(blob)`

- **Purpose**: Plays an audio blob in the browser.
- **Functionality**:
  - Converts the blob into a URL and plays it using the HTML `Audio` element.

### 3. `sendMessageWithImage(userText, base64Image, apiKey)`

- **Purpose**: Sends a user message along with an image to OpenAI's GPT API.
- **Functionality**:
  - The image is encoded in base64 and included in the request.
  - The GPT model analyzes the image and text to generate a response.
  - The response is returned as a JSON object.

### 4. `captureImageFromCanvas(video, canvas)`

- **Purpose**: Captures a frame from the video stream and returns it as a base64-encoded image.
- **Functionality**:
  - Draws the current video frame onto a canvas and converts it to a base64 string.

### 5. `transcribeAudio(audioBlob, apiKey)`

- **Purpose**: Transcribes audio into text using OpenAI's Whisper API.
- **Functionality**:
  - Sends the audio blob to OpenAI's transcription service.
  - Returns the transcribed text.

### 6. `startRecording(that)`

- **Purpose**: Initiates audio recording and transcribes the recorded audio upon completion.
- **Functionality**:
  - Starts capturing audio from the user's microphone.
  - Upon stopping, the audio is transcribed and the text is automatically sent as a user message.

### 7. `getOpacaAgentsandActions(token, apiUrl)`

- **Purpose**: Fetches all available agents and their actions from the OPACA framework.
- **Functionality**:
  - Sends a GET request to the OPACA API to retrieve agents and actions.
  - Returns the data in JSON format.

### 8. `getToken(username, password, loginUrl)`

- **Purpose**: Authenticates with the OPACA framework and retrieves an access token.
- **Functionality**:
  - Sends a POST request with the username and password to the login endpoint.
  - Returns the authentication token.

### 9. `toJsonString(actionName, actionParameters, actionsMap)`

- **Purpose**: Converts action parameters into a JSON string format.
- **Functionality**:
  - Iterates over the action parameters and builds a JSON string.
  - Handles different data types like integers and arrays.

### 10. `invokeAction(endpoint, queryString, opacaToken)`

- **Purpose**: Invokes a specific action on an agent using the OPACA framework.
- **Functionality**:
  - Sends a POST request to the OPACA invoke endpoint with the action parameters.
  - Returns the action's result in JSON format.

### 11. `parseGPTResponse(response)`

- **Purpose**: Parses the response from GPT and converts it into a JSON object.
- **Functionality**:
  - Removes extra whitespace and parses the response string into JSON.
  - Returns the parsed object.

### 12. `sendMessagesToGPT(send = true, that)`

- **Purpose**: Sends user messages to the GPT model and retrieves the response.
- **Functionality**:
  - Sends the user's message along with the conversation history to the GPT API.
  - The response is returned as a text string or JSON object.

### 13. `sendMessage(that)`

- **Purpose**: Sends the current user input to the GPT model and handles the response.
- **Functionality**:
  - Appends the user's message to the chat history.
  - Parses the GPT response and takes appropriate actions based on the agent and action detected.
  - Updates the chat history with the bot's response.

### 14. `addNewAgentandPrompToGpt(agent, that)`

- **Purpose**: Adds a new agent to the list of agents recognized by GPT.
- **Functionality**:
  - Converts the agent object to a JSON string and appends it to the existing agents list.
  - This method allows the system to dynamically recognize and interact with new agents.

## Event Handlers

### 1. `oneditprepare`

- **Purpose**: Prepares the node when the edit dialog is opened.
- **Functionality**:
  - Initializes UI elements like the camera, input fields, and buttons.
  - Fetches the API key and tokens needed to interact with OPACA and GPT.
  - Loads agents and actions into the node for processing user requests.

### 2. `oneditsave`

- **Purpose**: Saves the node's state when the edit dialog is saved.
- **Functionality**:
  - Ensures that the current conversation and settings are preserved.
  - Updates the chat history in the dialog.

### 3. `oneditclick`

- **Purpose**: Handles actions when buttons are clicked within the edit dialog.
- **Functionality**:
  - Logs or processes button click events.
  - Updates the conversation display as needed.


