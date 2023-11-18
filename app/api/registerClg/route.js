import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";

export async function POST(request) {
  const PostData = await request.json();

  const {
    name,
    address,
    zip_code,
    phone,
    comp,
    it,
    civil,
    mech,
    entc,
    chemical,
  } = PostData;

  const pool = new createPool({
    connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
  });

  const insertCollegeQuery = `
            INSERT INTO college_table (name, address, zip_code, phone, comp, it, civil, mech, entc, chemical)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
  await pool.query(insertCollegeQuery, [
    name,
    address,
    zip_code,
    phone,
    comp,
    it,
    civil,
    mech,
    entc,
    chemical,
  ]);

  //Close connection

  return NextResponse.json({ message: "Feedback Done" }, { status: "200" });
}
