import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

function ResearcherApproveImage({ match }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      const imageId = match.params.id; // Get the ID from the route parameter

      if (imageId) {
        const imageRef = doc(db, 'floriculturist', imageId); // Replace 'floriculturist' with the actual collection name
        try {
          const imageDoc = await getDoc(imageRef);
          if (imageDoc.exists()) {
            setImageData(imageDoc.data());
          } else {
            // Handle the case where the image with the specified ID does not exist
          }
        } catch (error) {
          // Handle any potential errors
          console.error('Error fetching image data:', error);
        }
      } else {
        // Handle the case where imageId is not available
      }
    };

    fetchImageData();
  }, [match]);

  if (!imageData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Image Details</h1>
      <p>Description: {imageData.description}</p>
      <img src={imageData.image} alt="Researcher" />
      {/* Display other image details as needed */}
    </div>
  );
}

export default ResearcherApproveImage;
