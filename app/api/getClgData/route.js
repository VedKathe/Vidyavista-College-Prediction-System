import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";
import { selectClasses } from "@mui/material";
import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

function filterDataByDepartments(data,selectedDepartments,selectedCity) {
  console.log(selectedDepartments.includes("Information Technology"));
  return data.filter(item => (selectedDepartments.length === 0 || selectedDepartments.includes(item.departments)) &&
  (selectedCity.length === 0  || selectedCity.includes(item.city)));
}

export async function POST(request) {
  try {
    const client = await pool.connect();
    const { order, selectedDept, selectedCity } = await request.json();
    const response = await client.query('SELECT Institute_Code, Institute_Name, Departments, GOPENS, GSCS, GSTS, GVJS, GNT1S, GNT2S, GNT3S, GOBCS, TFWS, EWS, City FROM institute_info');
    const rows = response.rows;
    //const { rows } = await sql`SELECT * from college_table`;
    
    if (selectedDept) {
      var filteredData = [];
      filteredData = filterDataByDepartments(rows,selectedDept,selectedCity);
      
      // rows.forEach((item) => {
      //   selectedDept.forEach((Department) => {  
          
      //     if (item.departments = Department) {
            
      //       // row.push({
      //       //   id:item.id,
      //       //   code:item.institute_code,
      //       //   name: item.institute_name,
      //       //   department: item.departments,
      //       //   city: item.city,
      //       //   Rank: item.gopens
      //       // });
      //     }
      //   });
      // });
      // if (selectedCity) {
      //   row = row.filter((item) => selectedCity.includes(item.city));
      // }
      // if (order != undefined){
      //   console.log(order);
      //   row = row.sort((a, b) => {
      //     if (order == true) {
      //       return a.Rank - b.Rank;
      //     } else {
      //       return b.Rank - a.Rank;
      //     }
      //   })
      // }
    }
    client.release();
    return NextResponse.json(filteredData, { status: "200" });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Failed", { status: "405" });
  }
}
