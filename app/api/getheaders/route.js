import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";
import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

export async function GET(request) {
  const client = await pool.connect();
    
    const response = await client.query('SELECT DISTINCT Departments,City FROM institute_info ');
    const rows = response.rows;
 

  

  //Close connection
  client.release();
  return NextResponse.json(rows, { status: "200" });
}
