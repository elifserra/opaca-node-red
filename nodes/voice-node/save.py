import tensorflow as tf
import tensorflow_hub as hub

# Modeli indir ve kaydet
model_url = "https://tfhub.dev/google/speech_commands_v0.02/1"
model = hub.KerasLayer(model_url, input_shape=(16000, 1))

# Modeli kaydet
model_save_path = "saved_speech_model"
#tf.saved_model.save(model, model_save_path)
