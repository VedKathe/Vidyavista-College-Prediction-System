"use client";
import React from "react";
import Navbar from "../../components/navbar3";
import styles from "./user.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const options = [
    { value: "cse", label: "Computer Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "mach", label: "Mechanical Engineering" },
    { value: "entc", label: "Electrical and Electronic Engineering" },
    { value: "cm", label: "Chemical Engineering" },
    { value: "it", label: "Information Technology" },
  ];
  // Mock data for the table
  

  // Filter the table data based on the search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auth/getstud");
        if (response.ok) {
          const result = await response.json();
          setData(result);
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
      <Navbar />

      <div className={styles["main"]}>
        <div className={styles.container}>
          <div className="col-md-12">
            <div className="section-header text-center pt-5">
              <h2>Student List</h2>
            </div>
          </div>
          <div className={styles["table"]}>
            <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th className={styles["rows"]}>Gender</th>
                  <th className={styles["rows"]}>Phone</th>
                  <th>Address</th>
                  <th className={styles["rows"]}>DOB </th>
                  <th className={styles["rows"]}>Percent </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className={styles["rows"]}>{item.gender}</td>
                    <td className={styles["rows"]}>{item.phone}</td>
                    <td>{item.address}</td>
                    <td className={styles["rows"]}>{item.dob}</td>
                    <td className={styles["rows"]}>{item.percent}</td>
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
