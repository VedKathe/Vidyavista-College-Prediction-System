"use client";
import React, { use } from "react";
import Navbar from "../../components/navbar2";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import SearchBar from "../../components/searchbar";
import Multiselect from "multiselect-react-dropdown";
import CheckBoxOption from "../../components/checkboxoption";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState([]); // State for selected Department
  const [selectedCity, setSelectedCity] = useState([]);
  const [cites, setCites] = useState([]);
  const [order, setOrder] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const options = [
    { value: "comp", label: "Computer Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "mech", label: "Machanical Engineering" },
    { value: "entc", label: "Electrical and Electronic Engineering" },
    { value: "chemical", label: "Chemical Engineering" },
    { value: "it", label: "Information Technology" },
  ];

  const shortcuts = {
    "Computer Engineering": "comp",
    "Civil Engineering": "civil",
    "Mechanical Engineering": "mech",
    "Electrical and Electronic Engineering": "entc",
    "Chemical Engineering": "chemical",
    "Information Technology": "it",
  };

  const categoryOptions = [
    "Computer Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronic Engineering",
    "Chemical Engineering",
    "Information Technology",
  ];

  const city = [
    { value: "nashik", label: "Nashik" },
    { value: "pune", label: "Pune" },
    { value: "mumbai", label: "Mumbai" },
    { value: "nagpur", label: "Nagpur" },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleCategoryChange = (selectedItems) => {
    const convertedArray = selectedItems.map((name) => shortcuts[name]);
    setSelectedCategory(convertedArray);
    
    // Update selected Department when the select value changes
  };

  

  const handleSelectCity = (selectedItems) => {
    //console.log(sel);
    setSelectedCity(selectedItems);
    // Update selected Department when the select value changes
  };

  const handleSortByPercent = (e) => {
    // setTableData(
    //   tableData.sort((a, b) => {
    //     if (order) {
    //       return a.Rank - b.Rank;
    //     } else {
    //       return b.Rank - a.Rank;
    //     }
    //   })
    // );
    // Update selected Department when the select value changes
    
    setOrder(!order);
  };

  const filterData = (query, cities, department, order) => {
    let filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCity.length > 0) {
      filtered = filtered.filter((item) => cities.includes(item.city));
    }

    if (selectedCategory.length > 0) {
      filtered = filtered.filter((item) => item.department === department);
    }

    setTableData(filtered); // Update filtered data state
  };

  const saveStateAndGenerateURL= () => {
    // Serialize state (convert to JSON)
    const serializedState = JSON.stringify({order,selectedCategory,selectedCity});
  
    // Encode state for URL
    const encodedState = encodeURIComponent(serializedState);
  
    // Generate new URL
    const newURL = `save-table?state=${encodedState}`;
  
    // return newURL;
    console.log(newURL);
    router.push(newURL);

  }
  // useEffect(() => {
  //   // Filter table data based on selected Department
  //   // if (selectedCategory) {
  //   //   const filteredData = data.filter((item) => {
  //   //     // Check if any selected Department has a value greater than or equal to 85
  //   //     return selectedCategory.some((Department) => item[Department] >= 85);
  //   //   });
  //   //   console.log(filteredData);
  //   //   setTableData(filteredData);
  //   // } else {
  //   //   setTableData(data); // If no Department is selected, show all data
  //   // }
  // }, [selectedCategory]);

  // Filter the table data based on the search term
  const generateRows = () => {
    if (selectedCategory.length > 0) {
      let rows = [];
      data.forEach((item) => {
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

  async function handleFilters(){
    try {
      const response = await fetch("/api/getClgData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({searchTerm,selectedCategory,selectedCity}),
      });
      if (response.ok) {
        console.log( await response.json());
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }
  

  useEffect(() => {
    console.log(selectedCategory);
    generateRows();
    
  }, [selectedCategory,order,selectedCity]);

  useEffect(()=>{
    setTableData(filteredData)
  },[filteredData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getclg");
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setTableData(data);
          result.map((o) => {
            setCites((cites) => {
              const updatedCities = new Set([...cites, o.address]);
              return [...updatedCities];
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
      <Navbar />

      <div className={styles["main"]}>
        <div className={styles.container}>
          <div className={styles["searchBar"]}>
            <SearchBar handleChange={handleSearchChange} />
            <div className={styles["fliters"]}>
              
              <CheckBoxOption
                options={categoryOptions}
                name="Department"
                selectedItems={selectedCategory}
                onSelectionChange={handleCategoryChange}
              ></CheckBoxOption>

              <CheckBoxOption
                options={cites}
                selectedItems={selectedCity}
                onSelectionChange={handleSelectCity}
                name="City"
              ></CheckBoxOption>
              <button className="btn btn-warning" onClick={handleSortByPercent}>
                Sort by Rank
              </button>
              
              <button className="btn btn-warning" onClick={saveStateAndGenerateURL}>
                Share
              </button>
              <button className="btn btn-danger" onClick={handleFilters}>
                Apply Filter
              </button>
            </div>
            
          </div>
          <div>Collage Found:{tableData.length}</div>
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
                {tableData.map((item) => (
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
        </div>
      </div>
    </div>
  );
}

export default Page;
