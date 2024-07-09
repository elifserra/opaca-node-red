import torch
import torchaudio
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import soundfile as sf
import os
import sounddevice as sd
import numpy as np
import keyboard

# Model ve processor'ı yükleyin
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-large-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-large-960h")

# Ses dosyasını geçici olarak kaydedeceğimiz dosya adı
temp_audio_file = "temp_recording.wav"

# Ses kaydetme fonksiyonu
def record_audio(file_path, duration, sample_rate=16000):
    print("Recording...")
    recording = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='float32')
    sd.wait()  # Wait until recording is finished
    print("Recording stopped.")
    sf.write(file_path, recording, sample_rate)

# Ses dosyasını yükleyip metne dönüştürmek için bir fonksiyon tanımlayın
def transcribe_audio(file_path):
    # Load audio
    audio, sample_rate = torchaudio.load(file_path)
    inputs = processor(audio, sampling_rate=16000, return_tensors="pt", padding=True)
    
    # Modeli kullanarak tahmin yapın
    with torch.no_grad():
        logits = model(**inputs).logits
    
    # Tahmin edilen metni al
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)
    return transcription[0]

# Enter tuşuna basıldığında kayıt başlasın, bırakıldığında tahmin yapılsın
def on_press_event(event):
    if event.name == "enter":
        record_audio(temp_audio_file, duration=5)  # 5 saniye boyunca kayıt yap
        transcription = transcribe_audio(temp_audio_file)
        print(f"Transcription: {transcription}")

keyboard.on_press_key("enter", on_press_event)

print("Press 'Enter' to start recording and release to transcribe...")
keyboard.wait("esc")  # Press 'esc' to exit the program
