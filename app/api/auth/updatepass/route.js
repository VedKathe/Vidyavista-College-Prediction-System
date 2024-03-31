import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";

export async function PUT(request) {
  const cookieStore = cookies();
  const PostData = await request.json();
  const { email, password_hash } = PostData;

  const pool = new createPool({
    connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
  });

  const insertQuery = `
  UPDATE user_table
  SET password_hash = $1
  WHERE email = $2;
        `;

  const { rows } = await pool.query(insertQuery, [password_hash, email]);

  //Close connection

  return NextResponse.json({ data: rows }, { status: "200" });
}
