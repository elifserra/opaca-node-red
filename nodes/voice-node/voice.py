"""
import pyaudio
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import requests
import time

path = "C:\\Users\\orucc\\Desktop\\Coding_Projects\\Tensorflow Machine Learning\\Tensorflow-Machine-Learning-1\\Audio\\recognize_keyword_with_more_data"
model = tf.keras.layers.TFSMLayer(path, call_endpoint='serving_default')

label_names = np.array(['down', 'go', 'left', 'no', 'off', 'on', 'right', 'stop', 'up', 'yes', '_silence_', '_unknown_'])

def get_spectrogram(waveform):
    spectrogram = tf.signal.stft(waveform, frame_length=255, frame_step=128)
    spectrogram = tf.abs(spectrogram)
    spectrogram = spectrogram[..., tf.newaxis]
    spectrogram = tf.image.resize(spectrogram, (124, 129))
    return spectrogram

CHUNK = 1024
FORMAT = pyaudio.paFloat32
CHANNELS = 1
RATE = 16000
RECORD_SECONDS = 2

audio = pyaudio.PyAudio()

# List available audio devices
info = audio.get_host_api_info_by_index(0)
numdevices = info.get('deviceCount')
for i in range(0, numdevices):
    if audio.get_device_info_by_host_api_device_index(0, i).get('maxInputChannels') > 0:
        print("Input Device id ", i, " - ", audio.get_device_info_by_host_api_device_index(0, i).get('name'))

# Set the desired input device index
input_device_index = 1  # Change this to your desired input device index

prev_detection = None

while True:
    try:
        stream = audio.open(format=FORMAT, channels=CHANNELS,
                            rate=RATE, input=True, input_device_index=input_device_index,
                            frames_per_buffer=CHUNK)

        print("Recording...")

        frames = []

        for i in range(0, int((RATE) / CHUNK * RECORD_SECONDS)):
            data = stream.read(CHUNK)
            frames.append(data)

        print("Finished recording.")

        audio_data = np.frombuffer(b''.join(frames), dtype=np.float32)
        audio_data = np.array(audio_data)
        print("Shape of data: ", audio_data.shape)
        audio_data = tf.constant(audio_data)
        print(audio_data)

        audio_data_spec = get_spectrogram(audio_data)
        audio_data_spec = audio_data_spec[tf.newaxis, ...]

        print('Waveform shape:', audio_data.shape)
        print('Spectrogram shape:', audio_data_spec.shape)

        prediction_dict = model(audio_data_spec)
        prediction = prediction_dict['dense_1']

        guess = tf.squeeze(tf.round(prediction))
        guess = tf.argmax(guess)
        guess = guess.numpy()
        print(guess)
        print(label_names[guess])
        detected_voice = label_names[guess]

        requests.post("http://localhost:3000/variable/detected_voice", json={"value": detected_voice})

        stream.stop_stream()
        stream.close()

    except Exception as e:
        print(f"An error occurred: {e}")


"""


import pyaudio
import numpy as np
import tensorflow as tf
import requests
import time
import keyboard

path = "C:\\Users\\orucc\\Desktop\\Coding_Projects\\Tensorflow Machine Learning\\Tensorflow-Machine-Learning-1\\Audio\\recognize_keyword_with_more_data"
model = tf.keras.layers.TFSMLayer(path, call_endpoint='serving_default')

label_names = np.array(['down', 'go', 'left', 'no', 'off', 'on', 'right', 'stop', 'up', 'yes', '_silence_', '_unknown_'])

def get_spectrogram(waveform):
    spectrogram = tf.signal.stft(waveform, frame_length=255, frame_step=128)
    spectrogram = tf.abs(spectrogram)
    spectrogram = spectrogram[..., tf.newaxis]
    spectrogram = tf.image.resize(spectrogram, (124, 129))
    return spectrogram

CHUNK = 1024
FORMAT = pyaudio.paFloat32
CHANNELS = 1
RATE = 16000

audio = pyaudio.PyAudio()

# List available audio devices
info = audio.get_host_api_info_by_index(0)
numdevices = info.get('deviceCount')
for i in range(0, numdevices):
    if audio.get_device_info_by_host_api_device_index(0, i).get('maxInputChannels') > 0:
        print("Input Device id ", i, " - ", audio.get_device_info_by_host_api_device_index(0, i).get('name'))

# Set the desired input device index
input_device_index = 1  # Change this to your desired input device index

print("Press and hold 'enter' to record...")

while True:
    try:

        requests.post("http://localhost:3000/variable/detected_voice", json={"value": "None"})
        # Wait until space is pressed
        keyboard.wait('enter')

        stream = audio.open(format=FORMAT, channels=CHANNELS,
                            rate=RATE, input=True, input_device_index=input_device_index,
                            frames_per_buffer=CHUNK)

        print("Recording... Press 'enter' to stop.")

        frames = []

        # Record while space is held down
        while keyboard.is_pressed('enter'):
            data = stream.read(CHUNK)
            frames.append(data)

        print("Finished recording.")

        audio_data = np.frombuffer(b''.join(frames), dtype=np.float32)
        audio_data = np.array(audio_data)
        print("Shape of data: ", audio_data.shape)
        audio_data = tf.constant(audio_data)
        print(audio_data)


        audio_data_spec = get_spectrogram(audio_data)
        audio_data_spec = audio_data_spec[tf.newaxis, ...]

        print('Waveform shape:', audio_data.shape)
        print('Spectrogram shape:', audio_data_spec.shape)

        prediction_dict = model(audio_data_spec)
        prediction = prediction_dict['dense_1']

        guess = tf.squeeze(tf.round(prediction))
        guess = tf.argmax(guess)
        guess = guess.numpy()
        print(guess)
        print(label_names[guess])
        detected_voice = label_names[guess]

        requests.post("http://localhost:3000/variable/detected_voice", json={"value": detected_voice})

        stream.stop_stream()
        stream.close()

    except Exception as e:
        print(f"An error occurred: {e}")


