from fastapi import FastAPI, UploadFile
import uvicorn
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

model = YOLO("best.pt")  

@app.post("/predict")
async def predict(file: UploadFile):
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes))

    results = model(img)

    # Convert YOLO predictions into JSON
    detections = []
    for r in results:
        for box in r.boxes:
            detections.append({
                "class": model.names[int(box.cls)],
                "confidence": float(box.conf),
                "bbox": box.xyxy.tolist()
            })

    return {"detections": detections}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
