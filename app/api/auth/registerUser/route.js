import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";

export async function POST(request) {
  const PostData = await request.json();

  

  const {
    name, email, gender, phone, address, dob, percent, password
    } = PostData;

  const pool = new createPool({
    connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
  });

  
    
    console.log(PostData);
    const insertUserQuery = `
            INSERT INTO user_table (name, email, gender, phone, address, dob, percent, password_hash)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
    await pool.query(insertUserQuery, [
      name,
      email,
      gender,
      phone,
      address,
      dob,
      percent,
      password
    ]);
  

  //Close connection

  return NextResponse.json({ message: "Feedback Done" }, { status: "200" });
}
