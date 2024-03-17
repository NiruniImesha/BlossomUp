import numpy as np
from PIL import Image
import cv2
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient

app = FastAPI()

MONGODB_URI = "mongodb+srv://blossomupteam:blossomupteam@blossomup.5htkle7.mongodb.net/"
MONGODB_DB = "test"
MONGODB_COLLECTION = "plantdiseases"
MONGODB_COLLECTION01 = "diseaseidentifications"

client = MongoClient(MONGODB_URI)
db = client[MONGODB_DB]
collection = db[MONGODB_COLLECTION]
collection01 = db[MONGODB_COLLECTION01]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(image_path) -> np.ndarray:
    image = np.array(Image.open(image_path))
    return image

def process_image(image_path):
    image = read_file_as_image(image_path)

    img = cv2.imread(image_path)  # Use image_path here

    # Convert the image to the HSV color space
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Define a range for green color in HSV
    lower_green = np.array([40, 40, 40])
    upper_green = np.array([80, 255, 255])

    # Create masks for different color regions
    green_mask = cv2.inRange(hsv, lower_green, upper_green)
    white_mask = cv2.inRange(img, (200, 200, 200), (255, 255, 255))
    other_mask = cv2.bitwise_not(green_mask | white_mask)

    # Set colors for each region
    green_color = [144, 238, 144]  # Light green
    white_color = [255, 255, 255]  # White
    other_color = [255, 0, 0]  # Red

    # Create an image with different colors for each region
    result = img.copy()
    result[green_mask > 0] = green_color
    result[white_mask > 0] = white_color
    result[other_mask > 0] = other_color

    # Calculate the percentage of green area
    total_pixels = np.prod(img.shape[:2])
    green_pixels = cv2.countNonZero(green_mask)
    percentage_green = (green_pixels / total_pixels) * 100

    return {
        "percentage_green": percentage_green
    }

@app.get("/process_images")
async def process_current_date_images():
 try:
    # Get the current date and format it as a string
    current_date = datetime.now().strftime("%Y-%m-%d")

    query_result = collection01.find({"identification_date": current_date})
    if query_result.count() == 0:
        return {"message": f"No documents found for the current date: {current_date}"}

    for document in query_result:
        image_path = document["image_path"]
        plant_id = document["plant_id"]
        disease_Name = document["disease_Name"]
        prediction = process_image(image_path)

        existing_doc = collection.find_one({"plant_id": plant_id, "Checked_start_date": current_date})

        query_result02 = collection.find({"plant_id": plant_id})
        for document in query_result02:
            Checked_start_date = document["Checked_start_date"]
            Checked_Current_date = document["Checked_start_date"]

        existing_doc01 = collection.find_one({"plant_id": plant_id, "Checked_Current_date": current_date})
        existing_doc02 = collection.find_one({"plant_id": plant_id})
        if existing_doc:
            continue

        if existing_doc01:
                continue

        elif Checked_start_date == Checked_Current_date :
            query_result01 = collection.find({"plant_id": plant_id})
            for document in query_result01:
                filter = {"plant_id": plant_id}
                update = {
                    "$set": {
                        "Checked_Current_date": current_date,
                        "Current_disease_affected_percentage": prediction['percentage_green'],
                    }
                }
                collection.update_one(filter, update)
            return {"message": "Data updated successfully"}

        elif Checked_Current_date != current_date :
            query_result01 = collection.find({"plant_id": plant_id})
            for document in query_result01:
                filter = {"plant_id": plant_id}
                update = {
                    "$set": {
                        "Checked_Current_date": current_date,
                        "Current_disease_affected_percentage": prediction['percentage_green'],
                    }
                }
                collection.update_one(filter, update)
            return {"message": "Data updated successfully"}

        else :
                data = {
                    "plant_id": plant_id,
                    "Checked_start_date": current_date,
                    "Checked_Current_date": current_date,
                    "first_disease_affected_percentage": prediction['percentage_green'],
                    "Current_disease_affected_percentage": prediction['percentage_green'],
                    "disease_Name": disease_Name,
                }
                collection.insert_one(data)
                return {"message": "Data inserted successfully"}


 except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='localhost', port=8002)
