import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";

export async function GET(request) {
  const pool = new createPool({
    connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
  });

  const insertQuery = `
            select * from feedback_table
        `;

  const { rows } = await pool.query(insertQuery);
  
  //Close connection

  return NextResponse.json(rows, { status: "200" });
}
