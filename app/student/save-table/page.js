"use client";
import React from "react";
import { useEffect, useState ,useRef} from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import styles from "./save-table.module.css";
import { usePDF } from 'react-to-pdf';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

export default function Page() {
  const conPDF = useRef();
  const searchParams = useSearchParams();
  const [tableState, setTableState] = useState(null);
  const [tableData, setTableData] = useState([]);
  
  const [showButton, setShowButton] = useState(true);
  //NEW
  const states = searchParams.get("state");
  const parsedState = JSON.parse(states);
  const { order, selectedDept, selectedCity ,selectedSeats,sortOrder,sortOption , searchTerm} = parsedState;
        
  const [sortOptions, setSortOption] = useState(sortOption);
  const [sortOrders, setSortOrder] = useState(sortOrder);
 
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

  const options = {
    // default is `save`
    method: 'open',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
       // margin is in MM, default is Margin.NONE = 0
       margin: Margin.SMALL,
       // default is 'A4'
       format: 'letter',
       // default is 'portrait'
      
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break, 
    // so use with caution.
   
 };
 

 const handleSort = option => {
  if (sortOptions === option) {
    setSortOrder(sortOrders === 'asc' ? 'desc' : 'asc');
  } else {
    setSortOption(option);
    setSortOrder('asc');
  }
};

 // you can use a function to return the target element besides using React refs
 const getTargetElement = () => document.getElementById('content-id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const states = searchParams.get("state");
        // const parsedState = JSON.parse(states);
        // const { order, selectedDept, selectedCity ,selectedSeats,sortOrder,sortOption , searchTerm} = parsedState;
        const response = await fetch("/api/getClgData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order, selectedDept, selectedCity }),
        });
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

  let filteredData =
  searchTerm.trim() === ""
    ? tableData
    : tableData
        .filter((item) => {
          return selectedSeats.some((option) => {
            const value = parseInt(item[option]); // Parse as integer
            return isNaN(value) ? false : value >= parseInt(searchTerm);
          });
        })
        .filter((item) =>
          selectedSeats.some((option) => parseInt(item[option]))
        );

        if (sortOptions !== "") {
          filteredData = filteredData.sort((a, b) => {
            const valueA = a[sortOptions];
            const valueB = b[sortOptions];
            if (sortOrders === "asc") {
              return valueA - valueB;
            } else {
              return valueB - valueA;
            }
          });
        }

  return (
    <div className="page">
    <div className={styles["table"]}>
    Final List
    <div id="content-id" style={{width:"100%",justifyContent:'center'}}>
    <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th className="text-center">Code</th>
                  <th className="text-center">Collage Name</th>
                  <th className="text-center">Department</th>
                  <th className="text-center">City</th>

                  {selectedSeats.map((option) => (
                    <th key={option} className="text-center" onClick={() => handleSort(option)}>
                    {option.toUpperCase()} {sortOptions === option && (sortOrders === 'asc' ? '▲' : '▼')}
                  </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* {tableData.map((item, i) => (
                  <tr key={i}>
                    <td>{item.institute_code}</td>
                    <td>{item.institute_name}</td>
                    <td className="text-capitalize">{item.departments}</td>
                    <td>{item.city}</td>
                    {selectedSeats.map((option) => (
                      <td key={option}>{item[option]}</td>
                    ))}
                  </tr>
                ))} */}
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
      {showButton && <button className="btn btn-danger" onClick={() => generatePDF(getTargetElement, options)}>Print</button>}
    </div>
    
    </div>
  );
}
