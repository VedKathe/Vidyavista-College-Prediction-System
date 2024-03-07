import styles from "./serachbar.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Index({handleChange}) {
const [input, setInput] = useState("");

  return (
    <div className={styles["input-wrapper"]}>
      <FaSearch id="search-icon" />
      <input
        placeholder="Enter your Rank..."
        type="number"
        onChange={handleChange}
      />
    </div>
  );
}

export default Index;
