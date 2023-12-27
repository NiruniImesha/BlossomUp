import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import '../css/FloriculturistImageUpload.css';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

function FloriculturistImageUpload() {
  const [plantName, setPlantName] = useState(localStorage.getItem('plantName') || '');
  const [description, setDescription] = useState(localStorage.getItem('description') || '');
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [val, setVal] = useState([]);
  const [uploadDateTime, setUploadDateTime] = useState([]); // New state variable for date and time
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const value = collection(db, 'floriculturist');

  useEffect(() => {
    const fetchData = async () => {
      const dbVal = await getDocs(value);
      const sortedData = dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      sortedData.sort((a, b) => a.uploadDateTime - b.uploadDateTime); // Sort in ascending order by date and time
      setVal(sortedData);
    };
    fetchData();

    const unsubscribe = onSnapshot(value, (snapshot) => {
      const sortedData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      sortedData.sort((a, b) => a.uploadDateTime - b.uploadDateTime); // Sort in ascending order by date and time
      setVal(sortedData);
    });

    // Unsubscribe from updates when the component unmounts
    return unsubscribe;
  }, [value]);

  const handleCreate = async () => {
    if (plantName === '' || description === '') {
      alert('Please enter Plant name and description.');
      return;
    }
  
    // Convert image to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      console.log('Base64 Image:', base64Data);
      setBase64Image(base64Data);
  
      // Get the current date and time
      const currentDateTime = serverTimestamp();
  
      // Add data to Firestore with the upload date and time
      addDoc(value, { plantName, description, image: base64Data, uploadDateTime: currentDateTime })
        .then(() => {
          alert('Data successfully added to Firestore');
          setPlantName('');
          setDescription('');
  
          // Clear the image input by resetting its value
          const imageInput = document.querySelector('input[type="file"]');
          if (imageInput) {
            imageInput.value = ''; // Reset the file input
          }
        })
        .catch((error) => {
          console.error('Error adding data to Firestore:', error);
        });
    };
    reader.readAsDataURL(image);
  };
  

  const handleEdit = async (id) => {
    const editedData = val.find((data) => data.id === id);
    if (editedData) {
      setPlantName(editedData.plantName);
      setDescription(editedData.description);
      setIsEditing(true);
      setEditId(id);
      setImage(editedData.image);
    }
  };

  const handleCancelEdit = () => {
    setPlantName('');
    setDescription('');
    setIsEditing(false);
    setEditId(null);
  
    // Clear the image input by resetting its value
    const imageInput = document.querySelector('input[type="file"]');
    if (imageInput) {
      imageInput.value = ''; // Reset the file input
    }
  
    localStorage.removeItem('plantName');
    localStorage.removeItem('description');
  };

  const handleSaveEdit = async () => {
    if (plantName === '' || description === '' || !editId) {
      alert('Please enter Plant name and description.');
      return;
    }
  
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result;
        console.log('Base64 Image:', base64Data);
        setBase64Image(base64Data);
  
        // Get the current date and time
        const currentDateTime = serverTimestamp();
  
        const dataRef = doc(db, 'floriculturist', editId);
        await updateDoc(dataRef, {
          plantName,
          description,
          image: base64Data, // Update the image
          uploadDateTime: currentDateTime,
        });
        setIsEditing(false);
        setEditId(null);
        alert('Data successfully edited in Firestore');
        setPlantName('');
        setDescription('');
  
        // Clear the image input by resetting its value
        const imageInput = document.querySelector('input[type="file"]');
        if (imageInput) {
          imageInput.value = ''; // Reset the file input
        }
      };
      reader.readAsDataURL(image);
    } catch (error) {
      console.error('Error editing data in Firestore:', error);
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, 'floriculturist', id));
        setVal((prevVal) => prevVal.filter((item) => item.id !== id));
        alert('Data successfully deleted from Firestore');
      } catch (error) {
        console.error('Error deleting data from Firestore:', error);
      }
    }
  };

  return (
    <div>
   <h1 className="page-title">Floriculturist Image Upload</h1>
      <div id='form'>
        <input value={plantName} onChange={(e) => setPlantName(e.target.value)} placeholder="Plant Name" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        {isEditing ? (
          <div>
            <button onClick={handleSaveEdit}>Save Edit</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <button className='btncreate' onClick={handleCreate}>Create</button>
        )}
      </div>

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
                <button onClick={() => handleEdit(values.id)}>Edit</button>
                <button onClick={() => handleDelete(values.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FloriculturistImageUpload;
