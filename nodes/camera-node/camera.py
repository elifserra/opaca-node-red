from time import sleep
import cv2
import requests
import json
import torch
import pandas as pd
# Kamerayı aç
cap = cv2.VideoCapture(0)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)  # 'yolov5s' is the smallest model. You can also use 'yolov5m', 'yolov5l', or 'yolov5x'.

last_detected_objects = []

while(True):
    # Kameradan bir kare oku
    ret, frame = cap.read()

    # Görüntüyü göster
    cv2.imshow('frame',frame)

    results = model(frame)
    info = str(results)
    detected_objects = results.pandas().xyxy[0].name
    detected_objects = detected_objects.tolist()

    if set(detected_objects) != set(last_detected_objects):
        last_detected_objects = detected_objects
        requests.post("http://localhost:3000/variable/detected_objects", json={"value": detected_objects})
        print(f"Detected objects: {detected_objects}")

    """
    if "wine glass" in info or "cup" in detected_objects:
        detected_objects
        print("Bardak var")
        requests.post("http://localhost:3000/variable/detected_objects", json={"value": detected_objects})
    """
    # 'q' tuşuna basıldığında döngüyü kır
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    # 'c' tuşuna basıldığında görüntüyü yakala
    if cv2.waitKey(1) & 0xFF == ord('s'):
        try:
            _, img_encoded = cv2.imencode('.jpg', frame)
            img_bytes = img_encoded.tobytes()
            # JSON formatında veri oluşturma
            data = {'value': img_bytes.hex()}  # Görüntüyü hex formatında gönderiyoruz
            headers = {'Content-Type': 'application/json'}
            response = requests.post(
                'http://localhost:3000/variable/image', 
                data=json.dumps(data), 
                headers=headers)
            print(f"Sunucu yanıtı: {response.status_code}")
            print(f"Sunucu yanıt metni: {response.text}")
        except Exception as e:
            print(f"Görüntü gönderilirken hata oluştu: {e}")
        
       # sleep(1)
        
        break

# Kamerayı serbest bırak ve pencereleri kapat
cap.release()
cv2.destroyAllWindows()
