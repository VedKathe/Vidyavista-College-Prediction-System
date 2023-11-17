"use client";
import React from "react";
import Navbar from "../../components/navbar2";
import styles from "./search.module.css";
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
    { value: "mach", label: "Machanical Engineering" },
    { value: "entc", label: "Electrical and Electronic Engineering" },
    { value: "cm", label: "Chemical Engineering" },
    { value: "it", label: "Information Technology" },
    
  ];
  // Mock data for the table
  const tableData = [
    { id: 1, name: "John Doe", age: 25, city: "New York" },
    { id: 2, name: "Jane Doe", age: 30, city: "Los Angeles" },
    { id: 1, name: "John Doe", age: 25, city: "New York" },
    { id: 2, name: "Jane Doe", age: 30, city: "Los Angeles" },
    { id: 1, name: "John Doe", age: 25, city: "New York" },
    { id: 2, name: "Jane Doe", age: 30, city: "Los Angeles" },
    { id: 1, name: "John Doe", age: 25, city: "New York" },
    { id: 2, name: "Jane Doe", age: 30, city: "Los Angeles" },
    { id: 1, name: "John Doe", age: 25, city: "New York" },
    { id: 2, name: "Jane Doe", age: 30, city: "Los Angeles" },
    // Add more data as needed
  ];

 
  // Filter the table data based on the search term
  

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("/api/getCollages");
    //     if (response.ok) {
    //       const result = await response.json();
    //       setData(result);
    //       console.log(data);
    //     } else {
    //       throw new Error("Failed to fetch data");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
  }, []);

  return (
    <div id="search">
      <Navbar />

      <div className={styles["main"]}>
        <div className={styles.container}>
          
          <div className={styles.search}>
          <div className=" m-auto h-auto w-100 ">
        <Select className={styles.searchbar} placeholder='Select Department...' options={options} />
      </div>
          </div>
          <div className={styles["table"]}>
            <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th>Collage Name</th>
                  <th>University</th>
                  <th>Zip Code</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.collage_name}>
                    <td>{item.collage_name}</td>
                    <td>{item.university}</td>
                    <td>{item.zip_code}</td>
                    <td>{item.phone}</td>
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
