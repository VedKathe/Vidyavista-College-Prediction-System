"use client";
import React from "react";
import Navbar from "../../components/navbar";
import styles from "./view.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedSeats, setselectedSeats] = useState([
    "gopens",
    "gscs",
    "gsts",
    "gvjs",
    "gnt1s",
    "gnt2s",
    "gnt3s",
    "gobcs",
    "tfws",
    "ews",
  ]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (option) => {
    if (sortOption === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOption(option);
      setSortOrder("asc");
    }
  };

  let filteredData =
    searchTerm.trim() === ""
      ? data
      : data
          .filter((item) => {
            return selectedSeats.some((option) => {
              const value = parseInt(item[option]); // Parse as integer
              return isNaN(value) ? false : value >= parseInt(searchTerm);
            });
          })
          .filter((item) =>
            selectedSeats.some((option) => parseInt(item[option]))
          );

  if (sortOption !== "") {
    filteredData = filteredData.sort((a, b) => {
      const valueA = a[sortOption];
      const valueB = b[sortOption];
      if (typeof valueA === "string" && typeof valueB === "string") {
        // For string comparison, especially if case-insensitivity is desired
        if (sortOrder === "asc") {
          return valueA.localeCompare(valueB, undefined, {
            sensitivity: "base",
          });
        } else {
          return valueB.localeCompare(valueA, undefined, {
            sensitivity: "base",
          });
        }
      } else {
        // For numeric comparison
        if (sortOrder === "asc") {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      }
    });
  }

  // Filter the table data based on the search term

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getclg");
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

  return (
    <div id="search">
      <Navbar Nav="3"/>

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
                <th
                    className="text-center"
                    onClick={() => handleSort("institute_code")}
                  >
                    Code{" "}
                    {sortOption === "institute_code" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="text-center"
                    onClick={() => handleSort("institute_name")}
                  >
                    Collage Name{" "}
                    {sortOption === "institute_name" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="text-center"
                    onClick={() => handleSort("departments")}
                  >
                    Department{" "}
                    {sortOption === "departments" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="text-center"
                    onClick={() => handleSort("city")}
                  >
                    City{" "}
                    {sortOption === "city" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>

                  {selectedSeats.map((option) => (
                    <th
                      key={option}
                      className="text-center"
                      onClick={() => handleSort(option)}
                    >
                      {option.toUpperCase()}{" "}
                      {sortOption === option &&
                        (sortOrder === "asc" ? "▲" : "▼")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, i) => {
                  const shouldRenderRow = selectedSeats.some((option) =>
                    parseInt(item[option])
                  );
                  return shouldRenderRow ? (
                    <tr key={i}>
                      <td>{item.institute_code}</td>
                      <td>{item.institute_name}</td>
                      <td className="text-capitalize">{item.departments}</td>
                      <td>{item.city}</td>
                      {/* Dynamically render selected options as table cells */}
                      {selectedSeats.map((option) => (
                        <td key={option}>
                          {isNaN(parseInt(item[option])) ? null : item[option]}
                        </td>
                      ))}
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
