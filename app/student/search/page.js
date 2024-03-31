"use client";
import React, { use } from "react";
import Navbar from "../../components/navbar";
import styles from "./search.module.css";
import { useEffect, useState } from "react";

import SearchBar from "../../components/searchbar";
import Multiselect from "multiselect-react-dropdown";
import CheckBoxOption from "../../components/checkboxoption";
import { useRouter } from "next/navigation";
import { PiShareNetwork } from "react-icons/pi";

function Page() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState(data);
  const [selectedDept, setSelectedDept] = useState([]); // State for selected Department
  const [selectedCity, setSelectedCity] = useState([]);
  const [cites, setCites] = useState([]);
  const [dept, setDept] = useState([]);
  const [selectedSeats, setselectedSeats] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const seats = [
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
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };
  const handleCategoryChange = (selectedItems) => {
    //const convertedArray = selectedItems.map((name) => shortcuts[name]);
    setSelectedDept(selectedItems);

    // Update selected Department when the select value changes
  };

  const handleSelectCity = (selectedItems) => {
    //console.log(sel);
    setSelectedCity(selectedItems);
    // Update selected Department when the select value changes
  };

  const handleSelectSeat = (selectedItems) => {
    //console.log(sel);
    setselectedSeats(selectedItems);

    // Update selected Department when the select value changes
  };

 
  // const handleSortBySeat = (e) => {
  //   e.preventDefault();
  //   console.log("PRess");
  //   const sortOption = e.target.getAttribute("value")

  //   filteredData = filteredData.sort((a, b) => {
  //     const valueA = a[sortOption];
  //     const valueB = b[sortOption];
  //     if (sortOrder === 'asc') {
  //       return valueA - valueB;
  //     } else {
  //       return valueB - valueA;
  //     }
  //   });
  //   //setOrder(true);
  // };

  // const filterData = (query, cities, department, order) => {
  //   let filtered = data.filter((item) =>
  //     item.name.toLowerCase().includes(query.toLowerCase())
  //   );

  //   if (selectedCity.length > 0) {
  //     filtered = filtered.filter((item) => cities.includes(item.city));
  //   }

  //   if (selectedDept.length > 0) {
  //     filtered = filtered.filter((item) => item.department === department);
  //   }

  //   setTableData(filtered); // Update filtered data state
  // };

  
  // Filter the table data based on the search term
  // const generateRows = () => {
  //   if (selectedDept.length > 0) {
  //     let rows = [];
  //     data.forEach((item) => {
  //       selectedDept.forEach((Department) => {
  //         if (item[Department]) {
  //           rows.push({
  //             name: item.name,
  //             Department: Department,
  //             address: item.address,
  //             phone: item.phone,
  //             Rank: item[Department],
  //           });
  //         }
  //       });
  //     });
  //     let filterData = rows.filter((item) => {
  //       // Check if any selected Department has a value greater than or equal to 85
  //       return item.Rank >= 85;
  //     });

  //     filterData = filterData.sort((a, b) => {
  //       if (order) {
  //         return a.Rank - b.Rank;
  //       } else {
  //         return b.Rank - a.Rank;
  //       }
  //     });

  //     if (selectedCity) {
  //       filterData = filterData.filter((item) =>
  //         selectedCity.includes(item.address)
  //       );
  //     }

  //     setFilteredData(filterData);

  //     filterData = [];
  //     rows = [];
  //     // setTableData(rows);
  //   } else {
  //     console.log("Not");
  //     setFilteredData([]); // If no Department is selected, show all data
  //   }
  // };

  const saveStateAndGenerateURL = () => {
    // Serialize state (convert to JSON)
    const serializedState = JSON.stringify({
      searchTerm,
      selectedSeats,
      sortOrder,
      sortOption,
      selectedDept,
      selectedCity,
    });

    // Encode state for URL
    const encodedState = encodeURIComponent(serializedState);

    // Generate new URL
    const newURL = `save-table?state=${encodedState}`;

    // return newURL;
    console.log(newURL);
    router.push(newURL);
  };

  const handleSort = option => {
    if (sortOption === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOption(option);
      setSortOrder('asc');
    }
  };


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

          if (sortOption !== "") {
            filteredData = filteredData.sort((a, b) => {
              const valueA = a[sortOption];
              const valueB = b[sortOption];
              if (sortOrder === "asc") {
                return valueA - valueB;
              } else {
                return valueB - valueA;
              }
            });
          }
  async function handleFilters() {
    try {
      const response = await fetch("/api/getClgData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedDept, selectedCity }),
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
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getheaders");
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          result.map((o) => {
            setCites((cites) => {
              const updatedCities = new Set([...cites, o.city]);
              return [...updatedCities];
            });
            setDept((dept) => {
              const updatedDept = new Set([...dept, o.departments]);
              return [...updatedDept];
            });
          });
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [cites]);

  return (
    <div id="search">
      <Navbar Nav="2"/>

      <div className={styles["main"]}>
        <div className={styles.container}>
          <div className={styles["searchBar"]}>
            <SearchBar handleChange={handleSearchChange} />
            <div className={styles["fliters"]}>
              <CheckBoxOption
                options={dept}
                name="Department"
                selectedItems={selectedDept}
                onSelectionChange={handleCategoryChange}
              ></CheckBoxOption>

              <CheckBoxOption
                options={cites}
                selectedItems={selectedCity}
                onSelectionChange={handleSelectCity}
                name="City"
              ></CheckBoxOption>

              <CheckBoxOption
                options={seats}
                selectedItems={selectedSeats}
                onSelectionChange={handleSelectSeat}
                name="Seat"
              ></CheckBoxOption>

              <button
                className="btn btn-warning"
                onClick={saveStateAndGenerateURL}
              >
                Share
                <PiShareNetwork className="ms-1 fs-5" />
              </button>
              <button className="btn btn-danger" onClick={handleFilters}>
                Apply Filter
              </button>
            </div>
          </div>
          <div>Collage Found:{filteredData.length}</div>
          <div className={styles["table"]}>
            <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th className="text-center">Code</th>
                  <th className="text-center">Collage Name</th>
                  <th className="text-center">Department</th>
                  <th className="text-center">City</th>

                  {selectedSeats.map((option) => (
                    <th key={option} className="text-center" onClick={() => handleSort(option)}>
                    {option.toUpperCase()} {sortOption === option && (sortOrder === 'asc' ? '▲' : '▼')}
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
