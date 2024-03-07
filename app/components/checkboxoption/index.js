import React, { useState, useEffect } from "react";
import styles from "./checkbox.module.css"


const MultiSelectDropdown = ({options,name,selectedItems, onSelectionChange}) => {
  const [allSelectedItems, setAllSelectedItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value) => {
    
    const isSelected = allSelectedItems.includes(value);
    const newSelectedItems = isSelected
      ? allSelectedItems.filter(item => item !== value) // Deselect item if already selected
      : [...allSelectedItems, value]; // Select item if not selected

    setAllSelectedItems(newSelectedItems);
    // Notify parent component of the selection change
    onSelectionChange(newSelectedItems);
    
  };

  useEffect(() => {
    
  }, [options]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-warning dropdown-toggle"
        type="button"
        id="multiSelectDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={handleToggle}
      >
        Select {name}
      </button>
      <ul className="dropdown-menu" style={{ maxHeight: "300px", overflowY: "auto" }} aria-labelledby="multiSelectDropdown">
        {options.map((option) => (
          <li key={option} >
            <label className={styles['menu-text']}>
              <input className="m-2" type="checkbox" value={option} 
              onChange={() => handleCheckboxChange(option)} />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelectDropdown;
