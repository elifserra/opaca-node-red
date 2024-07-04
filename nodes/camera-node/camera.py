import cv2
import sys
# Kamerayı aç
cap = cv2.VideoCapture(0)

while(True):
    # Kameradan bir kare oku
    ret, frame = cap.read()

    # Görüntüyü gri tonlamaya çevir
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Görüntüyü göster
    cv2.imshow('frame',frame)

    # 'q' tuşuna basıldığında döngüyü kır
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    # 'c' tuşuna basıldığında görüntüyü yakala
    if cv2.waitKey(1) & 0xFF == ord('c'):
        # Görüntüyü encode et
        _, img_encoded = cv2.imencode('.jpg', frame)
        img_bytes = img_encoded.tobytes()
        
        # Görüntüyü stdout'a yazdır (Node-RED tarafından yakalanacak)
        sys.stdout.buffer.write(img_bytes)

# Kamerayı serbest bırak ve pencereleri kapat
cap.release()
cv2.destroyAllWindows()
