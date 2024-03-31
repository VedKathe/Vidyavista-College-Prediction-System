import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";
import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
export async function POST(request) {
  const client = await pool.connect();
  const PostData = await request.json();

  const {
    clg_code,
    name,
    dept,
    city,
    gopen,
    gscs,
    gsts,
    gvjs,
    gnt1s,
    gnt2s,
    gnt3s,
    gobcs,
    tfws,
    ews,
  } = PostData;

 

  const insertCollegeQuery = `
            INSERT INTO institute_info (institute_code,
              institute_name,
              departments,
              gopens,
              gscs,
              gsts,
              gvjs,
              gnt1s,
              gnt2s,
              gnt3s,
              gobcs,
              tfws,
              ews,city)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13,$14)
        `;
  await client.query(insertCollegeQuery, [
    clg_code,
    name,
    dept,
    gopen,
    gscs,
    gsts,
    gvjs,
    gnt1s,
    gnt2s,
    gnt3s,
    gobcs,
    tfws,
    ews,
    city,
  ]);
  client.release();
  //Close connection

  return NextResponse.json({ message: "Registertion Done" }, { status: "200" });
}
