import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";

export async function POST(request) {
    const {searchTerm , selectedCategory , selectedCity} =  await request.json()
    console.log(body);
    const response = await sql `SELECT * from college_table `
    const table = response.rows;
   
  //Close connection

  return NextResponse.json("Succss", { status: "200" });
}
