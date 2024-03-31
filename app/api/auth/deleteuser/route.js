import { NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    console.log(id);
    const pool = new createPool({
      connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
    });

    const deleteQuery = `
                      delete from user_table where email = $1
                  `;

    const { rows } = await pool.query(deleteQuery,[ id ]);

  } catch (error) {
    console.log({ error });
  }
  return NextResponse.json({ message: "Success" });
}
