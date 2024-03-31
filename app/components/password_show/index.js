import React, { useState } from 'react';
import styles from './passwordShow.module.css'; // Make sure to use the correct path
import { FaEye, FaEyeSlash, FaEdit, FaTrash  } from 'react-icons/fa';

const PasswordItem = ({ item ,onItemDeleted}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [orgPassword, setorgPassword] = useState(item.password_hash);
    const [editedPassword, setEditedPassword] = useState(item.password_hash);
  
    const togglePasswordVisibility = () => {
        const password = prompt('Enter your password:');
        if (password == "admin") {
          // User clicked OK, perform action
          setIsPasswordVisible(!isPasswordVisible);
        }
      };
    
      const handleEdit = () => {
        const password = prompt('Enter your password:');
        if (password == "admin") {
          // User clicked OK, perform action
          setIsEditing(true);
        }
      };
    
      const handleDelete = async() => {
        const password = prompt('Enter your password:');
        if (password == "admin") {
          // User clicked OK, perform action
          // You can proceed with the delete action here
          if (window.confirm(`Are you sure you want to delete user ${item.email}?`)) {
            try {
              const response = await fetch(`/api/auth/deleteuser`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:item.email}),
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

    return (
        <td className={styles["rows"]}>
        {!isEditing ? (
          <>
            {isPasswordVisible ? editedPassword : '******'}
            <button onClick={togglePasswordVisibility} className={styles['toggle-password-button']} aria-label="Toggle password visibility">
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button onClick={handleEdit} className={styles['toggle-password-button']} aria-label="Edit password">
              <FaEdit />
            </button>
            <button onClick={handleDelete} className={styles['toggle-password-button']} aria-label="Delete user">
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
      </td>
  
    );
  };

export default PasswordItem;
