import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './AdminModal.scss'

function AdminModal(props) {
 
    const {show, handleClose, body } = props
  return (
    <>
      <Modal className="special_modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{body}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body === 'User Updated' ? <p>Note: If you changed your personal credentials, you will be required to login again using your new credentials</p>:""}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminModal;