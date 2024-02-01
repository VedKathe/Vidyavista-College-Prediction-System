"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import styles from "./save-table.module.css"

export default function Page() {

    const searchParams = useSearchParams()
    const [tableState, setTableState] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const generateRows = (selectedCategory , selectedCity,order) => {
        if (selectedCategory.length > 0) {
          let rows = [];
          tableData.forEach((item) => {
            selectedCategory.forEach((Department) => {
              if (item[Department]) {
                rows.push({
                  name: item.name,
                  Department: Department,
                  address: item.address,
                  phone: item.phone,
                  Rank: item[Department],
                });
              }
            });
          });
          let filterData = rows.filter((item) => {
            // Check if any selected Department has a value greater than or equal to 85
            return item.Rank >= 85;
          });
    
           filterData = filterData.sort((a, b) => {
            if (order) {
              return a.Rank - b.Rank;
            } else {
              return b.Rank - a.Rank;
            }
          })
        
          if (selectedCity) {
              
              filterData = filterData.filter((item) => selectedCity.includes(item.address));
              
          }
          
    
          setFilteredData(filterData);
       
          filterData = []
          rows=[]
          // setTableData(rows);
        } else {
          console.log("Not");
          setFilteredData([]); // If no Department is selected, show all data
        }
      };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("/api/getclg");
            if (response.ok) {
              const result = await response.json();
              setTableData(result);
            } else {
              throw new Error("Failed to fetch data");
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    useEffect(() => {
      // Get state from query parameters when component mounts
      const states = searchParams.get('state')
      const parsedState = JSON.parse(states)
      const {order , selectedCategory , selectedCity} = parsedState
      generateRows(selectedCategory,selectedCity,order)
    //   if (state) {
    //     // Decode state from URL
    //     const decodedState = decodeURIComponent(state);
    //     // Parse JSON
    //     const parsedState = JSON.parse(decodedState);
    //     // Apply state to table
    //     setTableState(parsedState);
    //     console.log(parsedState);
    //   }
    }, [tableData]);
  
  return (
    <div className={styles["table"]}>
    <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th>Collage Name</th>
                  <th>Department</th>
                  <th>Address</th>
                  <th>Rank</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.Department}</td>
                    <td>{item.address}</td>
                    <td>{item.Rank}</td>
                    <td>{item.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    
  )
}
