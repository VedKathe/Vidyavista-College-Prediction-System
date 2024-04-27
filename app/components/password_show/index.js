import React, { useState } from 'react';
import styles from './passwordShow.module.css'; // Make sure to use the correct path
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal'
import { AiOutlineCloseCircle } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const PasswordItem = ({ item, onItemDeleted }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [orgPassword, setorgPassword] = useState(item.password_hash);
  const [editedPassword, setEditedPassword] = useState(item.password_hash);
  const [adminPassword, setadminPassword] = useState("");
  const [currentAction, setcurrentAction] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }


  const togglePasswordVisibility = () => {


    if (adminPassword == "admin") {
      // User clicked OK, perform action
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const handleEdit = () => {


    if (adminPassword == "admin") {
      // User clicked OK, perform action
      setIsEditing(true);
    }
  };

  const handleDelete = async () => {


    if (adminPassword == "admin") {
      // User clicked OK, perform action
      // You can proceed with the delete action here
      if (window.confirm(`Are you sure you want to delete user ${item.email}?`)) {
        try {
          const response = await fetch(`/api/auth/deleteuser`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: item.email }),
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          console.log(`User ${item.email} deleted successfully.`);
          onItemDeleted(item.email); // Notify the parent component to remove the item from the list
        } catch (error) {
          console.error('Failed to delete user:', error);
        }
      }
    }
  };

  const handlePasswordChange = (e) => {
    setEditedPassword(e.target.value);
  };

  const handleSubmit = async () => {
    // Assume the API expects a JSON body with the item id and the new password
    const updatedItem = {
      ...item,
      password_hash: editedPassword,
    };
    console.log(updatedItem);
    try {
      const response = await fetch('/api/auth/updatepass', {
        method: 'PUT', // or 'POST', depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      console.log('Password updated successfully:', data);
      setIsEditing(false); // Exit editing mode
      // Optionally, update the UI to reflect the change
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  const handleSubmitCancal = () => {

    // User clicked OK, perform action
    setEditedPassword(orgPassword)
    setIsEditing(false);

  };

  const togglePrompt = (e) => {
    if (isPasswordVisible || isEditing) { setIsEditing(false); setIsPasswordVisible(false); return }
    setIsOpen(true)
    setcurrentAction(e.currentTarget.id)
  }

  const handleAdminPass = (e) => {
    e.preventDefault()
    if (adminPassword == "admin") {
      switch (currentAction) {
        case "passwordVisibility":
          togglePasswordVisibility();
          break;
        case "edit":
          handleEdit()
          break;
        case "delete":
          handleDelete()
          break;
      }
      setIsOpen(false)
    }
    else {
      toast.error("Wrong Password", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
    
  }
  return (
    <td className={styles["rows"]}>
      {!isEditing ? (
        <>
          {isPasswordVisible ? editedPassword : '******'}
          <button onClick={togglePrompt} id='passwordVisibility' className={styles['toggle-password-button']} aria-label="Toggle password visibility">
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button onClick={togglePrompt} id='edit' className={styles['toggle-password-button']} aria-label="Edit password">
            <FaEdit />
          </button>
          <button onClick={togglePrompt} id='delete' className={styles['toggle-password-button']} aria-label="Delete user">
            <FaTrash />
          </button>
        </>
      ) : (
        <>
          <input
            className='form-control'
            type="text"
            value={editedPassword}
            onChange={handlePasswordChange}
          />
          <button className='btn' onClick={handleSubmit}>Save</button>
          <button className='btn' onClick={handleSubmitCancal}>Cancal</button>
        </>
      )}
      <ToastContainer/>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
        <div className="d-flex justify-content-end">
          <button className="btn p-1" onClick={() => setIsOpen(false)}><AiOutlineCloseCircle size={28} />  </button>
        </div>
        <form onSubmit={handleAdminPass} className={styles["form"]}>
          <div className={styles["input-box"]}>

            <label>Admin Password</label>

            <input
              type="password"
              
              placeholder="Enter Password..."
              required
              onChange={(e) => {
                setadminPassword(e.currentTarget.value);
              }}
            />
          </div>
          <div className="px-4 mt-2">
            <button type='submit' className="my-4 btn btn-warning">Enter</button>
          </div>
        </form>
      </Modal>
    </td>

  );
};

export default PasswordItem;
