"use client";
import React from "react";
import Navbar from "../../components/navbar";
import styles from "./feedback.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import { CiMail } from "react-icons/ci";

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
        const response = await fetch("/api/getContact",{cache:'no-cache'});
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
              <h2>Contact Us</h2>
            </div>
          </div>
          <div className={styles["table"]}>
            <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th className={styles["rows"]}>Name</th>
                  <th className={styles["rows"]}>Email</th>
                  <th className={styles["rows"]}>Message</th>
                  <th className={styles["rows"]}>Time </th>
                  <th className={styles["rows"]}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className={styles["rows"]}>{item.name}</td>
                    <td className={styles["rows"]}>{item.email}</td>
                    <td>{item.message}</td>
                    <td className={styles["rows"]}>{item.time}</td>
                    <td className={styles["rows"]}>
                    <a href={`https://mail.google.com/mail/?view=cm&to=${item.email}&su=Connecting to you&body=Hello ${item.name},`} > <CiMail /></a>
                    </td>
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
