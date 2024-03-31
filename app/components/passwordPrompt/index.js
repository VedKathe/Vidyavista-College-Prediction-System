import React, { useState } from 'react';

const PasswordModal = ({ onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(password);
    setPassword('ved'); // Clear password field after confirmation
    onClose(); // Close the modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default PasswordModal;
