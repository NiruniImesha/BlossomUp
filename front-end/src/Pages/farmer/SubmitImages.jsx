import React, { useState } from 'react';
import { db, storage } from '../../../src/config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './SubmitImages.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function SubmitImages() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [plantName, setPlantName] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(imageUrl);
    }
  };

  const handleUpload = async () => {
    const errors = {};

    if (!image) {
      errors.image = 'Please select an image.';
    }
    if (!plantName) {
      errors.plantName = 'Please enter the plant name.';
    }
    if (!description) {
      errors.description = 'Please enter a description.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setUploading(true);
      setFieldErrors({});

      const fileName = `${Date.now()}_${image.name}`;
      const storageRef = ref(storage, `images/${fileName}`);

      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'Images'), {
        imageUrl: downloadURL,
        plantName: plantName,
        description: description,
        uploadDateTime: serverTimestamp(),
      });

      Swal.fire('Success', 'Image uploaded successfully.', 'success');
      setImage(null);
      setImageUrl('');
      setPlantName('');
      setDescription('');
      setError('');
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire('Error', 'Error uploading image. Please try again.', 'error');
      setError('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container pt-4">
      <div className="image-upload-container">
        <h1>Image Upload</h1>
        <div className="form-group">
          <input type="file" accept="image/*" onChange={handleImageChange} className={`form-control ${fieldErrors.image && 'is-invalid'}`} />
          {imageUrl && <img src={imageUrl} alt="Selected" style={{ width: '100%', marginTop: '10px' }} />}
          {fieldErrors.image && <div className="invalid-feedback">{fieldErrors.image}</div>}
        </div>
        <div className="form-group">
          <input type="text" placeholder="Plant Name" value={plantName} onChange={(e) => setPlantName(e.target.value)} className={`form-control ${fieldErrors.plantName && 'is-invalid'}`} />
          {fieldErrors.plantName && <div className="invalid-feedback">{fieldErrors.plantName}</div>}
        </div>
        <div className="form-group">
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className={`form-control ${fieldErrors.description && 'is-invalid'}`} />
          {fieldErrors.description && <div className="invalid-feedback">{fieldErrors.description}</div>}
        </div>

        <button onClick={handleUpload} className="btn btn-primary" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>

        {/* Display loading animation with popup until upload is successful */}
        {uploading && (
          <div className="loading-animation text-center mt-3">
            <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
              <span className="sr-only"></span>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default SubmitImages;
