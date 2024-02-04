import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";
import { selectClasses } from "@mui/material";

export async function POST(request) {
  try {
    const { order, selectedCategory, selectedCity } = await request.json();
    const { rows } = await sql`SELECT * from college_table`;

    if (selectedCategory) {
      var row = [];
      rows.forEach((item) => {
        selectedCategory.forEach((Department) => {
          if (item[Department]) {
            row.push({
              id:item.id,
              name: item.name,
              Department: Department,
              address: item.address,
              phone: item.phone,
              Rank: item[Department],
            });
          }
        });
      });
      if (selectedCity) {
        row = row.filter((item) => selectedCity.includes(item.address));
      }
      if (order != undefined){
        console.log(order);
        row = row.sort((a, b) => {
          if (order == true) {
            return a.Rank - b.Rank;
          } else {
            return b.Rank - a.Rank;
          }
        })
      }
    }
    return NextResponse.json(row, { status: "200" });
  } catch (error) {
    return NextResponse.json("Failed", { status: "405" });
  }
}
