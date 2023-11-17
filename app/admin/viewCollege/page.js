"use client";
import React from "react";
import Navbar from "../../components/navbar3";
import styles from "./view.module.css";
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
     
      name: "Gokhale Education Society's R. H. Sapat College of Engineering",
      Address: "Nashik, Maharashtra",
      zip_code: 422011,
      Phone: 9123456789,
      comp: 87,
      it: 86,
      civil: 76,
      mech: 80,
      entc: 81,
      chemical: 89,
    },
    {
      
      name: "MVP's KBTCOE",
      Address: "Nashik, Maharashtra",
      zip_code: 422002,
      Phone: 9123456780,
      comp: 88,
      it: 85,
      civil: 82,
      mech: 81,
      entc: 83,
      chemical: 86,
    },
    {
     
      name: "Guru Gobind Singh College of Engineering and Research Center",
      Address: "Nashik, Maharashtra",
      zip_code: 422003,
      Phone: 9123456709,
      comp: 90,
      it: 87,
      civil: 84,
      mech: 85,
      entc: 88,
      chemical: 89,
    },
    {
      
      name: "Sandip Institute of Technology and Research Centre",
      Address: "Nashik, Maharashtra",
      zip_code: 422213,
      Phone: 9123456781,
      comp: 86,
      it: 88,
      civil: 85,
      mech: 87,
      entc: 84,
      chemical: 89,
    },
    {
     
      name: "K. K. Wagh Institute of Engineering Education & Research",
      Address: "Nashik, Maharashtra",
      zip_code: 422003,
      Phone: 9123456782,
      comp: 87,
      it: 86,
      civil: 88,
      mech: 84,
      entc: 89,
      chemical: 85,
    },
    {
     
      name: "MET Bhujbal Knowledge City",
      Address: "Nashik, Maharashtra",
      zip_code: 422502,
      Phone: 9123456783,
      comp: 85,
      it: 87,
      civil: 86,
      mech: 88,
      entc: 84,
      chemical: 87,
    },
    {
     
      name: "Ashoka Universal School of Engineering",
      Address: "Nashik, Maharashtra",
      zip_code: 422008,
      Phone: 9123456784,
      comp: 86,
      it: 85,
      civil: 88,
      mech: 84,
      entc: 87,
      chemical: 86,
    },
    {
     
      name: "College of Engineering, Pune",
      Address: "Pune, Maharashtra",
      zip_code: 411005,
      Phone: 9178901234,
      comp: 85,
      it: 82,
      civil: 87,
      mech: 90,
      entc: 84,
      chemical: 88,
    },
    {
     
      name: "Walchand College of Engineering",
      Address: "Sangli, Maharashtra",
      zip_code: 416415,
      Phone: 9156789012,
      comp: 89,
      it: 86,
      civil: 80,
      mech: 92,
      entc: 85,
      chemical: 90,
    },
    {
      
      name: "Vishwakarma Institute of Technology",
      Address: "Pune, Maharashtra",
      zip_code: 411037,
      Phone: 9167890123,
      comp: 91,
      it: 88,
      civil: 84,
      mech: 86,
      entc: 89,
      chemical: 83,
    },
    {
      
      name: "Government College of Engineering, Aurangabad",
      Address: "Aurangabad, Maharashtra",
      zip_code: 431005,
      Phone: 9189012345,
      comp: 86,
      it: 85,
      civil: 88,
      mech: 82,
      entc: 90,
      chemical: 87,
    },
    {
      
      name: "KJ Somaiya College of Engineering",
      Address: "Mumbai, Maharashtra",
      zip_code: 400077,
      Phone: 9190123456,
      comp: 88,
      it: 84,
      civil: 85,
      mech: 91,
      entc: 86,
      chemical: 89,
    },
    {
      
      name: "Thadomal Shahani Engineering College",
      Address: "Mumbai, Maharashtra",
      zip_code: 400050,
      Phone: 9201234567,
      comp: 90,
      it: 87,
      civil: 89,
      mech: 85,
      entc: 88,
      chemical: 86,
    },
    {
      
      name: "Dr. Babasaheb Ambedkar Technological University",
      Address: "Lonere, Maharashtra",
      zip_code: 402103,
      Phone: 9212345678,
      comp: 84,
      it: 90,
      civil: 86,
      mech: 88,
      entc: 85,
      chemical: 91,
    },
    {
      
      name: "Shri Guru Gobind Singhji Institute of Engineering and Technology",
      Address: "Nanded, Maharashtra",
      zip_code: 431606,
      Phone: 9223456789,
      comp: 87,
      it: 89,
      civil: 83,
      mech: 90,
      entc: 86,
      chemical: 88,
    },
    {
      
      name: "Rajiv Gandhi College of Engineering, Research and Technology",
      Address: "Chandrapur, Maharashtra",
      zip_code: 442403,
      Phone: 9234567890,
      comp: 88,
      it: 85,
      civil: 87,
      mech: 89,
      entc: 84,
      chemical: 90,
    },
    {
      
      name: "Terna Engineering College",
      Address: "Mumbai, Maharashtra",
      zip_code: 400706,
      Phone: 9245678901,
      comp: 86,
      it: 90,
      civil: 85,
      mech: 87,
      entc: 89,
      chemical: 88,
    },
    {
      
      name: "Government College of Engineering, Jalgaon",
      Address: "Jalgaon, Maharashtra",
      zip_code: 425002,
      Phone: 9256789012,
      comp: 90,
      it: 87,
      civil: 88,
      mech: 84,
      entc: 86,
      chemical: 89,
    },
    {
     
      name: "Vidyalankar Institute of Technology",
      Address: "Mumbai, Maharashtra",
      zip_code: 400077,
      Phone: 9267890123,
      comp: 85,
      it: 89,
      civil: 86,
      mech: 87,
      entc: 90,
      chemical: 88,
    },
    {
      
      name: "DY Patil College of Engineering, Pune",
      Address: "Pune, Maharashtra",
      zip_code: 411044,
      Phone: 9278901234,
      comp: 89,
      it: 86,
      civil: 90,
      mech: 85,
      entc: 87,
      chemical: 88,
    },
    {
      
      name: "Shivaji University",
      Address: "Kolhapur, Maharashtra",
      zip_code: 416004,
      Phone: 9289012345,
      comp: 87,
      it: 88,
      civil: 85,
      mech: 90,
      entc: 86,
      chemical: 89,
    },
    {
      
      name: "Pimpri Chinchwad College of Engineering",
      Address: "Pune, Maharashtra",
      zip_code: 411044,
      Phone: 9290123456,
      comp: 90,
      it: 85,
      civil: 88,
      mech: 86,
      entc: 89,
      chemical: 87,
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
              <h2>College List</h2>
            </div>
          </div>
          <div className={styles["table"]}>
            <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th>Collage Name</th>

                  <th className={styles["rows"]}>Zip Code</th>
                  <th className={styles["rows"]}>Phone</th>
                  <th>Address</th>
                  <th className={styles["rows"]}>Computer </th>
                  <th className={styles["rows"]}>Civil </th>
                  <th className={styles["rows"]}>Mech</th>
                  <th className={styles["rows"]}>ENTC</th>
                  <th className={styles["rows"]}>IT</th>
                  <th className={styles["rows"]}>Chemical</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td className={styles["rows"]}>{item.zip_code}</td>
                    <td className={styles["rows"]}>{item.Phone}</td>
                    <td>{item.Address}</td>
                    <td className={styles["rows"]}>{item.comp}</td>
                    <td className={styles["rows"]}>{item.civil}</td>
                    <td className={styles["rows"]}>{item.mech}</td>
                    <td className={styles["rows"]}>{item.entc}</td>
                    <td className={styles["rows"]}>{item.it}</td>
                    <td className={styles["rows"]}>{item.chemical}</td>
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
