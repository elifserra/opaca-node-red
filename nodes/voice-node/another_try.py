import torch
import torchaudio
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import librosa
import os

# Model ve processor'ı yükleyin
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-large-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-large-960h")

# Ses dosyasının yolunu belirtin
audio_directory = "C://Users//orucc//Desktop//recordings"  # Ses dosyalarınızın bulunduğu dizinin yolunu buraya ekleyin

# Tüm ses dosyalarının adlarını bir listeye ekleyin
audio_files = [f for f in os.listdir(audio_directory) if f.endswith('.wav')]

# Ses dosyasını yükleyip metne dönüştürmek için bir fonksiyon tanımlayın
def transcribe_audio(file_path):
    # Load audio
    audio, sample_rate = librosa.load(file_path, sr=16000)
    inputs = processor(audio, sampling_rate=16000, return_tensors="pt", padding=True)
    
    # Modeli kullanarak tahmin yapın
    with torch.no_grad():
        logits = model(**inputs).logits
    
    # Tahmin edilen metni al
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)
    return transcription[0]

# Tüm ses dosyaları için metne dönüştürme işlemi yapın
for audio_file in audio_files:
    file_path = os.path.join(audio_directory, audio_file)
    transcription = transcribe_audio(file_path)
    print(f"File: {audio_file} - Transcription: {transcription}")
