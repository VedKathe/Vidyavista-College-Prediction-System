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
  const [filteredData, setFilteredData] = useState([]);
  const [showButton, setShowButton] = useState(true);

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
 
 // you can use a function to return the target element besides using React refs
 const getTargetElement = () => document.getElementById('content-id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const states = searchParams.get("state");
        const parsedState = JSON.parse(states);
        const { order, selectedCategory, selectedCity } = parsedState;
        const response = await fetch("/api/getClgData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order, selectedCategory, selectedCity }),
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

 
  return (
    <div className="page">
    <div className={styles["table"]}>
    Final List
    <div id="content-id" style={{width:"100%",justifyContent:'center'}}>
      <table className={styles["custom-table"]}>
        <thead>
          <tr>
            <th className="text-center">Collage Name</th>
            <th className="text-center">Department</th>
            <th className="text-center">Address</th>
            <th className="text-center">Rank</th>
            <th className="text-center">Phone</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td className="text-capitalize">{item.Department}</td>
              <td>{item.address}</td>
              <td>{item.Rank}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {showButton && <button className="btn btn-danger" onClick={() => generatePDF(getTargetElement, options)}>Print</button>}
    </div>
    
    </div>
  );
}
