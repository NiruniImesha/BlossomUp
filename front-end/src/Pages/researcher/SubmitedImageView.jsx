import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../src/config/firebase.js';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap'; // Import Spinner
import PopupComponent from './CreateFolderPopup.jsx';
import Swal from 'sweetalert2';

function SubmitedImageView() {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [confirmAction, setConfirmAction] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedFolderName, setSelectedFolderName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const history = useNavigate();

  useEffect(() => {
    fetchImage();
    fetchFolders();
  }, [id]);

  const fetchImage = async () => {
    try {
      const docRef = doc(db, 'Images', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const imageData = docSnap.data();
        setImage({ id: docSnap.id, ...imageData });
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await axios.get('https://script.google.com/macros/s/AKfycbxu5Lnk44xPNeDBjBxW6A67Vpn-UWqT-iVR781ektTrxV1U7r0lVC-MgETGX6KbVJ5W/exec?action=getFolders');
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleApprove = async () => {
    if (selectedFolder) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Are you sure you want to approve this image to folder "${selectedFolderName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, approve it!'
      });
  
      if (result.isConfirmed) {
        setConfirmAction(true);
        handleConfirm();
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a folder.'
      });
    }
  };

  const handleReject = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to reject this image? This action will permanently delete the image from the database.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!'
    });
  
    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'Images', id));
        Swal.fire('Deleted!', 'The image has been rejected and deleted from the database.', 'success');
        history('/submited-list');
      } catch (error) {
        console.error('Error deleting image:', error);
        Swal.fire('Error', 'An error occurred while deleting the image.', 'error');
      }
    }
  };

  const handleConfirm = async () => {
    try {
      if (!folderName) {
        Swal.fire('Error', 'Please select a folder.', 'error'); // SweetAlert for folder selection error
        return;
      }
  
      setLoading(true); // Set loading to true before making the API call
  
      const formData = new FormData();
      formData.append('action', 'uploadFile');
      formData.append('folderName', folderName);
      formData.append('fileSrc', image.imageUrl);
  
      const urlEncodedFormData = new URLSearchParams(formData).toString();
  
      const response = await axios.post('https://script.google.com/macros/s/AKfycbxu5Lnk44xPNeDBjBxW6A67Vpn-UWqT-iVR781ektTrxV1U7r0lVC-MgETGX6KbVJ5W/exec', urlEncodedFormData);
  
      if (response.data.includes('successfully')) {
        Swal.fire('Success', 'Image approved and uploaded to the folder successfully!', 'success'); // SweetAlert for success
        await deleteDoc(doc(db, 'Images', id));
        history('/Manage-New-Diseases');
      } else {
        Swal.fire('Error', 'Error uploading image to the folder. Please try again.', 'error'); // SweetAlert for error
      }
  
      setLoading(false); // Set loading to false after receiving the response
    } catch (error) {
      console.error('Error submitting image:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateFolder = async () => {
    try {
      if (!newFolderName.trim()) {
        alert('Please enter a folder name.');
        return;
      }
  
      const formData = new FormData();
      formData.append('action', 'createFolder');
      formData.append('folderName', newFolderName);
  
      const response = await axios.post('https://script.google.com/macros/s/AKfycbxu5Lnk44xPNeDBjBxW6A67Vpn-UWqT-iVR781ektTrxV1U7r0lVC-MgETGX6KbVJ5W/exec', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log(response.data); // Assuming you want to log the response data
      await fetchFolders();
      setNewFolderName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };
  const handleFolderChange = (e) => {
    const selectedFolderId = e.target.value;
    setSelectedFolder(selectedFolderId);
    const folder = folders.find(folder => folder.id === selectedFolderId);
    setSelectedFolderName(folder ? folder.name : '');
    
    setFolderName(folder ? folder.name : '');
  };

  return (
    <div className="container mt-5">
      {loading && ( // Render spinner if loading is true
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner animation="border" role="status" style={{ width: '100px', height: '100px', borderWidth: '5px' }}>
            <span className="sr-only"></span>
          </Spinner>
        </div>
      )}
      <h1 className="text-center">Image Details</h1>
      {image && (
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <img src={image.imageUrl} alt={`Image ${id}`} className="img-fluid" />
            <div className="plant-data mt-3">
              <p><strong>Plant Name:</strong> {image.plantName}</p>
              <p><strong>Description:</strong> {image.description}</p>
              <p><strong>Upload Date & Time:</strong> {new Date(image.uploadDateTime?.toDate()).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mt-3">
        <Button variant="primary" onClick={openModal}>Create New Folder</Button>
      </div>
      <div className="form-group mt-3">
        <label>Select Folder:</label>
        <div>
          <select className="form-control " value={selectedFolder} onChange={handleFolderChange}>
            <option value="Select folder">Select Folder</option>
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>{folder.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-center mt-3">
        <Button variant="success" onClick={handleApprove}>Approve</Button>{' '}
        <Button variant="danger" onClick={handleReject}>Reject</Button>
      </div>

      <PopupComponent
        showModal={showModal}
        closeModal={closeModal}
        handleCreateFolder={handleCreateFolder}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
      />
    </div>
  );
}

export default SubmitedImageView;
