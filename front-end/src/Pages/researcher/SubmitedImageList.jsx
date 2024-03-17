import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../src/config/firebase.js';
import { collection, onSnapshot } from 'firebase/firestore';
import './SubmitedImageList.css';

function SubmitedImageList() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(5); // Adjust the number of images per page

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Images'), (querySnapshot) => {
      const imageList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(imageList);
    });

    // Return cleanup function to unsubscribe from real-time updates
    return () => unsubscribe();
  }, []);

  // Pagination logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-content"> {/* Add class for main content to create space for sidebar */}
      <div className="header">
      <h1>Uploaded Images</h1>
        </div>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Plant Name</th>
            <th>Upload Date & Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentImages.map(image => (
            <tr key={image.id}>
              <td>
                <img src={image.imageUrl} alt={`Image ${image.id}`} className="image" />
              </td>
              <td>{image.plantName}</td>
              <td>{new Date(image.uploadDateTime?.toDate()).toLocaleString()}</td>
              <td>
                <Link to={`/Manage-New-Diseases-view/${image.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(images.length / imagesPerPage) }, (_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <div onClick={() => paginate(i + 1)} className="page-link">
              {i + 1}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubmitedImageList;
