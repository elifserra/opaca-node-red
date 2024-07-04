import cv2
import sys

def capture_image():
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("Kamera açılamadı!")
        return

    ret, frame = cap.read()
    
    if not ret:
        print("Görüntü alınamadı!")
        return

    # Görüntüyü encode et
    _, img_encoded = cv2.imencode('.jpg', frame)
    img_bytes = img_encoded.tobytes()
    
    # Görüntüyü stdout'a yazdır (Node-RED tarafından yakalanacak)
    sys.stdout.buffer.write(img_bytes)
    
    cap.release()

if __name__ == "__main__":
    capture_image()
