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
    SELECT $1, $2, $3, $4, $5, $6, $7, $8
    WHERE NOT EXISTS (
      SELECT 1 FROM user_table WHERE email = $9
   )
    RETURNING *
        `;
    const  result  = await pool.query(insertUserQuery, [
      name,
      email,
      gender,
      phone,
      address,
      dob,
      percent,
      password,
      email
    ]);
   
    if (result.rowCount === 0) {
      console.log("User with this email already exists.");
      return NextResponse.json({ message: "User with this email already exists.",exist:true  }, { status: "200" });
      // Handle the case where user already exists
  } else {
      console.log("User inserted successfully.");
      return NextResponse.json({ message: "User inserted successfully." ,exist:false}, { status: "200" });
      // Handle the case where user is successfully inserted
  }

  //Close connection

  return NextResponse.json({ message: "Feedback Done" }, { status: "200" });
}
