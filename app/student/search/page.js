"use client";
import React, { use } from "react";
import Navbar from "../../components/navbar2";
import styles from "./search.module.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import SearchBar from "../../components/searchbar";
import Multiselect from "multiselect-react-dropdown";
import CheckBoxOption from "../../components/checkboxoption";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState([]); // State for selected category
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
    
    // Update selected category when the select value changes
  };

  

  const handleSelectCity = (selectedItems) => {
    //console.log(sel);
    setSelectedCity(selectedItems);
    // Update selected category when the select value changes
  };

  const handleSortByPercent = (e) => {
    // setTableData(
    //   tableData.sort((a, b) => {
    //     if (order) {
    //       return a.percent - b.percent;
    //     } else {
    //       return b.percent - a.percent;
    //     }
    //   })
    // );
    // Update selected category when the select value changes
    
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

  // useEffect(() => {
  //   // Filter table data based on selected category
  //   // if (selectedCategory) {
  //   //   const filteredData = data.filter((item) => {
  //   //     // Check if any selected category has a value greater than or equal to 85
  //   //     return selectedCategory.some((category) => item[category] >= 85);
  //   //   });
  //   //   console.log(filteredData);
  //   //   setTableData(filteredData);
  //   // } else {
  //   //   setTableData(data); // If no category is selected, show all data
  //   // }
  // }, [selectedCategory]);

  // Filter the table data based on the search term
  const generateRows = () => {
    if (selectedCategory.length > 0) {
      let rows = [];
      data.forEach((item) => {
        selectedCategory.forEach((category) => {
          if (item[category]) {
            rows.push({
              name: item.name,
              category: category,
              address: item.address,
              phone: item.phone,
              percent: item[category],
            });
          }
        });
      });
      let filterData = rows.filter((item) => {
        // Check if any selected category has a value greater than or equal to 85
        return item.percent >= 85;
      });

       filterData = filterData.sort((a, b) => {
        if (order) {
          return a.percent - b.percent;
        } else {
          return b.percent - a.percent;
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
      setFilteredData([]); // If no category is selected, show all data
    }
  };

  

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
          <div className={styles["serachBar"]}>
            <SearchBar handleChange={handleSearchChange} />
            <div className={styles["fliters"]}>
              {/* <select
                onChange={handleSelectCity}
                placeholder="Select City..."
                value={selectedCity}
              >
                {city.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select> */}
              <CheckBoxOption
                options={categoryOptions}
                name="Category"
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
                Sort by Percent
              </button>
              {/* <Select className={styles.searchbar} onChange={handleSelectChange} placeholder='Select Department...' value={selectedCategory} options={options} /> */}
            </div>
          </div>
          <div>Collage Found:{tableData.length}</div>
          <div className={styles["table"]}>
            <table className={styles["custom-table"]}>
              <thead>
                <tr>
                  <th>Collage Name</th>
                  <th>Category</th>
                  <th>Address</th>
                  <th>Percent</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.address}</td>
                    <td>{item.percent}</td>
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
