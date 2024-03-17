import os
from fastapi import FastAPI, HTTPException
import numpy as np
from PIL import Image
import tensorflow as tf
import cv2
from datetime import datetime
from pymongo import MongoClient
import requests

app = FastAPI()

MODEL_FILE_PATH = "../save_models/orchid_leaves_disease_model.h5"
MODEL_FILE_URL = "https://drive.google.com/uc?export=download&id=1r2BQHIyi63gCIUjvPNgsmwrV_WPg22aY"

# Load the model or download it if it doesn't exist
if not os.path.exists(MODEL_FILE_PATH):
    response = requests.get(MODEL_FILE_URL)
    if response.status_code == 200:
        with open(MODEL_FILE_PATH, "wb") as f:
            f.write(response.content)
    else:
        raise HTTPException(status_code=500, detail="Failed to download the model")

try:
    MODEL = tf.keras.models.load_model(MODEL_FILE_PATH)
except Exception as e:
    raise HTTPException(status_code=500, detail=f"Failed to load the model: {str(e)}")

# Update your MongoDB connection parameters
MONGODB_URI = "mongodb+srv://blossomupteam:blossomupteam@blossomup.5htkle7.mongodb.net/"
MONGODB_DB = "test"
MONGODB_COLLECTION = "diseaseidentifications"
MONGODB_COLLECTION01 = "orchidleaves"
MONGODB_COLLECTION02 = "orchiddiseases"

client = MongoClient(MONGODB_URI)
db = client[MONGODB_DB]
collection = db[MONGODB_COLLECTION]
collection01 = db[MONGODB_COLLECTION01]
collection02 = db[MONGODB_COLLECTION02]

DATASET_CLASSES = ["Black Rot", "Other"]

# Populate orchiddiseases collection with DATASET_CLASSES values
def populate_orchiddiseases():
    try:
        for disease_name in DATASET_CLASSES:
            # Check if the disease_name already exists in the collection
            if not collection02.find_one({"disease_Name": disease_name}):
                # Insert the disease_name into the collection if it doesn't exist
                collection02.insert_one({"disease_Name": disease_name})
        print("orchiddiseases collection populated successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to populate orchiddiseases collection: {str(e)}")

populate_orchiddiseases()

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def process_image(image_path):
    image = np.array(Image.open(image_path))

    # Apply noise reduction (e.g., Gaussian blur)
    image = cv2.GaussianBlur(image, (5, 5), 0)

    # Resize the image to the expected input shape (224x224)
    image = Image.fromarray(image)
    image = image.resize((224, 224))
    image = np.array(image)
    img_batch = np.expand_dims(image, 0)
    prediction = MODEL.predict(img_batch)
    predicted_class_index = np.argmax(prediction, axis=1)[0]
    predicted_class = DATASET_CLASSES[predicted_class_index]
    confidence = np.max(prediction[0])

    # Check if the predicted class is in the DATASET_CLASSES
    is_in_dataset = predicted_class in DATASET_CLASSES

    return {
        "predicted_class": predicted_class,
        "confidence": float(confidence),
        "is_in_dataset": is_in_dataset
    }

@app.get("/process_current_date_images")
async def process_current_date_images():
    try:
        # Format the current date in the same format as your database timestamp
        current_date_01 = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        current_date = datetime.now().strftime("%Y-%m-%d")
        current_Time = datetime.now().strftime("%H:%M:%S")

        # Query the "orchidleaves" collection for the relevant data
        # query_result = collection01.find({"capture_date": {"$capture_date": current_date_01}})
        query_result = collection01.find({"capture_date": current_date})
        if query_result.count() == 0:
            return {"message": f"No documents found for the current date: {current_date}"}

        # Process and insert data for each image
        for document in query_result:
            image_path = document["image_path"]
            plant_id = document["plant_id"]
            prediction = process_image(image_path)

            existing_doc = collection.find_one({"plant_id": plant_id, "identification_date": current_date})
            if existing_doc:
                # If a document already exists, you may skip the insertion or update it if needed
                continue

            disease_doc = collection02.find_one({"disease_Name": prediction['predicted_class']})
            if disease_doc:
                disease_id = disease_doc["_id"]
            else:
                disease_id = None
            # Insert data into MongoDB
            data = {
                "plant_id": plant_id,
                "image_path": image_path,
                "identification_date": current_date,
                "identification_Time": current_Time,
                "selected_disease": "Selected" if prediction['predicted_class'] != "Other" else "NotSelected",
                "PredictedClass": prediction['predicted_class'],
                "disease_Name": disease_id,
                "Confidence": prediction['confidence']
            }
            collection.insert_one(data)

        return {"message": "Data inserted successfully"}

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='localhost', port=8004)
