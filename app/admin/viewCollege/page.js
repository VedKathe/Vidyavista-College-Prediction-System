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

  
  // Filter the table data based on the search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getclg");
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
                {data.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td className={styles["rows"]}>{item.zip_code}</td>
                    <td className={styles["rows"]}>{item.phone}</td>
                    <td>{item.address}</td>
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
