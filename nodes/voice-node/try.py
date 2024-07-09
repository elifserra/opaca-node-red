# Gerekli kütüphaneleri yükleyin

import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer
import librosa
import numpy as np
import os

# Model ve tokenizer yükleme
tokenizer = Wav2Vec2Tokenizer.from_pretrained("facebook/wav2vec2-large-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-large-960h")

# Ses dosyasını yükleme ve işleme
def load_audio(file_path):
    speech, rate = librosa.load(file_path, sr=16000)
    return speech

# Ses dosyasını tokenize etme ve tahmin yapma
def transcribe_audio(file_path):
    audio_input = load_audio(file_path)
    input_values = tokenizer(audio_input, return_tensors="pt").input_values
    logits = model(input_values).logits
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = tokenizer.batch_decode(predicted_ids)[0]
    return transcription


def getVideoFileNames(directory_path):
    # Ses dosyalarının adlarını saklamak için bir liste oluşturun
    audio_files = []

    # Belirtilen dizindeki tüm dosyaları listeleyin
    for filename in os.listdir(directory_path):
        print(f"Filename: {filename}")
        audio_files.append(filename)

    return audio_files

# Örnek bir ses dosyasını işleyerek metin tahmini yapma
directory_path = "C://Users//orucc//Desktop//recordings"
file_path = "C://Users//orucc//Desktop//one//1_george_10.wav"
voices = getVideoFileNames(directory_path)
print(f"Voices: {voices}")
number_of_truth = 0
numver_of_false = 0
for voice in voices:
    file_path = directory_path + "//" + voice
    transcription = transcribe_audio(file_path)
    print(f"Transcription: {transcription}")
    if(transcription[0] == voice[0]):
        number_of_truth += 1
    else:
        numver_of_false += 1

print(f"Number of truth: {number_of_truth}")
    
