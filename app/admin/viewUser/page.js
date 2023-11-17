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
  const tableData = [
    {
      name: "Aarav Sharma",
      email: "aaravsharma@gmail.com",
      gender: "Male",
      phone: "9876543210",
      address: "Mumbai, Maharashtra",
      dob: "1995-07-12",
      percent: 87.5,
    },
    {
      name: "Ishaan Gupta",
      email: "ishaangupta@gmail.com",
      gender: "Male",
      phone: "9765432101",
      address: "Delhi, Delhi",
      dob: "1992-04-25",
      percent: 79.8,
    },
    {
      name: "Ananya Reddy",
      email: "ananyareddy@gmail.com",
      gender: "Female",
      phone: "9654321098",
      address: "Hyderabad, Telangana",
      dob: "1990-11-08",
      percent: 92.3,
    },
    {
      name: "Kabir Verma",
      email: "kabirverma@gmail.com",
      gender: "Male",
      phone: "9543210987",
      address: "Jaipur, Rajasthan",
      dob: "1994-02-18",
      percent: 85.6,
    },
    {
      name: "Aaradhya Singh",
      email: "aaradhyasingh@gmail.com",
      gender: "Female",
      phone: "9432109876",
      address: "Lucknow, Uttar Pradesh",
      dob: "1996-09-30",
      percent: 88.9,
    },
    {
      name: "Vihaan Iyer",
      email: "vihaaniyer@gmail.com",
      gender: "Male",
      phone: "9321098765",
      address: "Chennai, Tamil Nadu",
      dob: "1993-06-14",
      percent: 76.4,
    },
    {
      name: "Saisha Patel",
      email: "saishapatel@gmail.com",
      gender: "Female",
      phone: "9210987654",
      address: "Ahmedabad, Gujarat",
      dob: "1991-12-03",
      percent: 81.2,
    },
    {
      name: "Advait Desai",
      email: "advaitdesai@gmail.com",
      gender: "Male",
      phone: "9109876543",
      address: "Pune, Maharashtra",
      dob: "1989-08-22",
      percent: 94.7,
    },
    {
      name: "Zoya Khan",
      email: "zoyakhan@gmail.com",
      gender: "Female",
      phone: "9876543210",
      address: "Kolkata, West Bengal",
      dob: "1997-05-17",
      percent: 90.5,
    },
    {
      name: "Reyansh Joshi",
      email: "reyanshjoshi@gmail.com",
      gender: "Male",
      phone: "9876543210",
      address: "Bengaluru, Karnataka",
      dob: "1998-01-09",
      percent: 82.6,
    },
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
                {tableData.map((item) => (
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
