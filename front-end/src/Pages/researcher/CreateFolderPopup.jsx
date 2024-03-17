import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

function CreateFolderPopup({ showModal, closeModal, handleCreateFolder, newFolderName, setNewFolderName }) {
  const [loading, setLoading] = useState(false); // Add loading state

  const handleCreateFolderWithLoading = async () => {
    setLoading(true); // Set loading to true when creating folder
    await handleCreateFolder(); // Call the handleCreateFolder function
    setLoading(false); // Set loading to false after creating folder
  };

  return (
    <>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFolderName">
            <Form.Label>Folder Name:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter folder name" 
              value={newFolderName} 
              onChange={(e) => setNewFolderName(e.target.value)} 
              isInvalid={!newFolderName.trim()} 
            />
            {!newFolderName.trim() && (
              <Form.Control.Feedback type="invalid">
                Folder name is required.
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateFolderWithLoading} disabled={loading}>
            {loading ? (
              <>
                <span className="ml-2">Creating...</span>
              </>
            ) : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
      {loading && (
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
    </>
  );
}

export default CreateFolderPopup;
