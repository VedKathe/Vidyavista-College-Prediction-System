

import { NextResponse } from 'next/server'
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";

export async function POST(request){
    const PostData = await request.json();
    const {
       email, password
      } = PostData;
    
      const pool = new createPool({
        connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
      });

      
        const insertQuery = `
            select email, password_hash from admin_table
        `;

        const {rows} = await pool.query(insertQuery);

        
        const foundUser = rows.find(
            user => user.email === email && user.password_hash === password
          );
        

    //Close connection

    return NextResponse.json(!!foundUser,{status:"200"})
}