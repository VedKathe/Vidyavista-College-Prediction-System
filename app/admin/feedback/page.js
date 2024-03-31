"use client";
import React from "react";
import Navbar from "../../components/navbar";
import styles from "./feedback.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";

function Page() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Mock data for the table

  // Filter the table data based on the search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getFeedback",{cache:'no-cache'});
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setLoading(false);
          console.log(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="search">
      <Navbar Nav="3"/>

      <div className={styles["main"]}>
        <div className={styles.container}>
          <div className="col-md-12">
            <div className="section-header text-center pt-5">
              <h2>Feedback</h2>
            </div>
          </div>
          <div className={styles["table"]}>
            <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th className={styles["rows"]}>Name</th>

                  <th className={styles["rows"]}>Feedback</th>
                  <th className={styles["rows"]}>Time </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.name}>
                    <td className={styles["rows"]}>{item.name}</td>

                    <td>{item.feedback}</td>
                    <td className={styles["rows"]}>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
