import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
from tkinter import Tk
from tkinter.filedialog import askopenfilename

# Open a file dialog for image selection
root = Tk()
root.withdraw()  # We don't want a full GUI, so keep the root window from appearing

# Upload an image
image_path = askopenfilename(title="Select an image", filetypes=[("Image files", "*.jpg;*.jpeg;*.png")])

# Now 'image_path' contains the selected image file path
print(image_path)

# Read the uploaded image
img = cv2.imread(image_path)

# Convert the image to the Used
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Define a range for green color in HSV
lower_green = np.array([40, 40, 40])
upper_green = np.array([100, 255, 255])

# Create masks for different color regions
green_mask = cv2.inRange(hsv, lower_green, upper_green)
white_mask = cv2.inRange(img, (200, 200, 200), (255, 255, 255))
other_mask = cv2.bitwise_not(green_mask | white_mask)

# Set colors for each region
green_color = [144, 238, 144]  # Light green
white_color = [255, 255, 255]  # White
other_color = [255, 0, 0]      # Red

# Create an image with different colors for each region
result = img.copy()
result[green_mask > 0] = green_color
result[white_mask > 0] = white_color
result[other_mask > 0] = other_color

# Calculate the percentage of green area
total_pixels = np.prod(img.shape[:2])
green_pixels = cv2.countNonZero(green_mask)
percentage_green = (green_pixels / total_pixels) * 100

# Display the results using Matplotlib
plt.figure(figsize=(12, 5))

plt.subplot(131)
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title('Original Image')

plt.subplot(132)
plt.imshow(green_mask, cmap='gray')
plt.title('Green Mask')

plt.subplot(133)
plt.imshow(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))
plt.title('Color-Coded Image')

plt.show()

# Display the results using Matplotlib
print(f'Percentage of Green Area: {percentage_green:.2f}%')
