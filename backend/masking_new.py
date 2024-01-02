import os
from io import BytesIO
from fastapi import FastAPI
import numpy as np
from PIL import Image
import tensorflow as tf
import pyodbc
import cv2  # Import OpenCV for image processing
from datetime import datetime

app = FastAPI()

# Update your SQL Server connection parameters
server = 'your_server_name'
database = 'your_database_name'
username = 'your_username'
password = 'your_password'

# Create a SQL Server connection
conn = pyodbc.connect(f"DRIVER={{SQL Server}};SERVER=DESKTOP-NTD2TB3\\SQLEXPRESS;DATABASE=finalProject;intergrates security= true")

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

    return {f'Percentage of Green Area: {percentage_green:.2f}%'}

@app.get("/process_images")
async def process_current_date_images():
    # Get the current date and format it as a string
    current_date = datetime.now().strftime("%Y-%m-%d")

    # Query to retrieve image paths for the current date
    query = f"SELECT image_path FROM OrchidLeaves WHERE CAST(timestamp AS DATE) = '{current_date}'"

    # Execute the query to retrieve image paths
    with conn.cursor() as cursor:
        cursor.execute(query)
        result = cursor.fetchall()

    # Process the retrieved image paths
    processed_results = []
    for row in result:
        image_path = row.image_path
        prediction = process_image(image_path)
        processed_results.append(prediction)

    return processed_results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='localhost', port=8002)
