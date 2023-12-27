import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import '../css/FloriculturistImageUpload.css';
import {
  collection,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';

function ResearcherImagesList() {
  const [val, setVal] = useState([]);

  const value = collection(db, 'floriculturist');

  useEffect(() => {
    const fetchData = async () => {
      const dbVal = await getDocs(value);
      const sortedData = dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      sortedData.sort((a, b) => a.uploadDateTime - b.uploadDateTime);
      setVal(sortedData);
    };
    fetchData();

    const unsubscribe = onSnapshot(value, (snapshot) => {
      const sortedData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      sortedData.sort((a, b) => a.uploadDateTime - b.uploadDateTime);
      setVal(sortedData);
    });

    return unsubscribe;
  }, [value]);

  const handleApproveAndDelete = async (id) => {
    if (window.confirm('Are you sure you want to approve this item and delete it?')) {
      try {
        const approvedData = val.find((data) => data.id === id);
        if (approvedData) {
          // Verify that the image data is a valid Base64 string
          if (/^data:image\/\w+;base64,/.test(approvedData.image)) {
            const base64Data = approvedData.image.split(',')[1]; // Extract Base64 portion
            const binaryData = atob(base64Data); // Decode Base64 to binary data

            const blob = new Blob([binaryData], { type: 'image/jpeg' }); // Change the type if necessary
            const dataToSend = {
              dataReq: {
                data: base64Data,
                name: approvedData.plantName,
                type: 'image/jpeg', // Change if necessary
              },
              fname: 'uploadFilesToGoogleDrive', // Replace with your Apps Script URL
            };

            fetch('https://script.google.com/macros/s/AKfycbzQBTwgwvCQXMdygr2YCpIqTurEVUD5g0GU1amg_J5Hhg6IIDtrDYHEvYAZniW0XI6I/exec', {
              method: 'POST',
              body: JSON.stringify(dataToSend),
            })
              .then((res) => res.json())
              .then((response) => {
                console.log('Google Drive Response:', response);
                // Check if there are any error messages in the response
                if (response.error) {
                  console.error('Google Drive Error:', response.error);
                } else {
                  // Image approved and deleted successfully
                  deleteImage(id);
                  alert('Image approved and deleted from Firestore');
                }
              })
              .catch((error) => {
                console.error('Error sending image to Google Drive:', error);
              });
          } else {
            console.error('Invalid image data format');
          }
        }
      } catch (error) {
        console.error('Error approving and deleting data:', error);
      }
    }
  };

  const deleteImage = async (id) => {
    try {
      await deleteDoc(doc(db, 'floriculturist', id));
      setVal((prevVal) => prevVal.filter((item) => item.id !== id));
      console.log(`Image with ID ${id} deleted.`);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div>
      <h1 className="page-title">Researcher Image Approve</h1>

      <table>
        <thead>
          <tr>
            <th>Plant Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Date & Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {val.map((values) => (
            <tr key={values.id}>
              <td>{values.plantName}</td>
              <td>{values.description}</td>
              <td>
                <img src={values.image} alt="Plant" />
              </td>
              <td>{new Date(values.uploadDateTime?.toDate()).toLocaleString()}</td>
              <td>
                <button onClick={() => handleApproveAndDelete(values.id)}>Approve</button>
                <button onClick={() => deleteImage(values.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResearcherImagesList;
