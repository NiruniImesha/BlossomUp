import os
from fastapi import FastAPI
import numpy as np
from PIL import Image
import tensorflow as tf
import pyodbc
import cv2
from datetime import datetime

app = FastAPI()

# Update your SQL Server connection parameters
server = 'your_server_name'
database = 'your_database_name'
username = 'your_username'
password = 'your_password'

MODEL = tf.keras.models.load_model("../save_models/1")

DATASET_CLASSES = ["Anthracnose", "algal leaf", "bird eye spot", "brown blight", "gray light", "healthy",
                   "red leaf spot", "white spot"]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(image_path) -> np.ndarray:
    image = np.array(Image.open(image_path))
    return image

def process_image(image_path):
    image = read_file_as_image(image_path)

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
        # Create a new SQL Server connection for each image
        conn = pyodbc.connect(f"DRIVER={{SQL Server}};SERVER=DESKTOP-IILVLEK\\SQLEXPRESS;DATABASE=finalProject;UID=Chamara;PWD=aA@3065326")

        # Format the current date in the same format as your database timestamp
        current_date = datetime.now().strftime("%Y-%m-%d")
        current_date_01 = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Query to retrieve image paths for the current date
        query = f"SELECT image_path FROM OrchidLeaves WHERE CAST(timestamp AS DATETIME) >= '{current_date}'"

        # Execute the query to retrieve image paths
        with conn.cursor() as cursor:
            cursor.execute(query)
            result = cursor.fetchall()

        # Process and insert data for each image
        for row in result:
            image_path = row.image_path
            prediction = process_image(image_path)

            # Calculate the next id by incrementing the maximum id
            max_id_query = "SELECT MAX(id) FROM disease_identification"
            cursor.execute(max_id_query)
            max_id = cursor.fetchone()[0]

            if max_id is None:
                # If there are no records yet, set the initial id to 1
                next_id = 1
            else:
                next_id = max_id + 1

            plant_id_query = "SELECT CAST(plant_id AS INT) FROM OrchidLeaves WHERE CONVERT(varchar(max), image_path) = ?"
            cursor.execute(plant_id_query,(image_path))
            plant_id = cursor.fetchone()[0]



            # Insert data into the disease_identification table for each image
            insert_query = f"INSERT INTO disease_identification (id, plant_id, image_path, date, selected_desise, PredictedClass, Confidence) VALUES (?, ?, ?, ?, ?, ?, ?)"
            cursor.execute(insert_query, (next_id, plant_id, image_path, current_date_01, prediction['is_in_dataset'], prediction['predicted_class'], prediction['confidence']))
            conn.commit()


        # Close the connection after processing all images
        conn.close()

        return {"message": "Data inserted successfully"}

    except pyodbc.Error as ex:
        sqlstate = ex.args[1]
        return {"error": f"SQL Error: {sqlstate}"}

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__masking_new__":
    import uvicorn

    uvicorn.run(app, host='localhost', port=8002)