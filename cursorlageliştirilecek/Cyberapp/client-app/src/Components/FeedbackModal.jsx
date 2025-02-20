// src/components/FeedbackModal.jsx
import React from 'react';

const FeedbackModal = ({ isOpen, onClose, feedback }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContent}>
        <h2>Geri Bildirim</h2>
        <p>{feedback}</p>
        <button style={styles.closeButton} onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '500px',
    textAlign: 'center',
    color: '#ffffff',
  },
  closeButton: {
    marginTop: '15px',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#ff0000',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default FeedbackModal;
