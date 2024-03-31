"use client";
import React from "react";
import Navbar from "../../components/navbar";
import PasswordItem from "../../components/password_show";

import styles from "./user.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
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
         
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleItemDeleted = (deletedItemId) => {
    setData(data.filter(user => user.email !== deletedItemId));
  };

  return (
    <div id="search">
      <Navbar Nav="3"/>

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
                  <th className={styles["rows"]}>Rank </th>
                  <th className={styles["rows"]}>Password </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item,index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className={styles["rows"]}>{item.gender}</td>
                    <td className={styles["rows"]}>{item.phone}</td>
                    <td>{item.address}</td>
                    <td className={styles["rows"]}>{item.dob}</td>
                    <td className={styles["rows"]}>{item.percent}</td>
                    <PasswordItem item={item} onItemDeleted={handleItemDeleted} ></PasswordItem>
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
