import { NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";
const crypto = require('crypto');

function  generateHash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
  }

  function generateHashesForEmails(emailObjects) {
    return emailObjects.map(obj => ({
    email: obj.email,
      hash: generateHash(obj.email)
    }));
  }
export async function POST(request) {
    const PostData = await request.json();
    const {token , password} = PostData
    try {

        const pool = new createPool({
            connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
          });
        
          const insertQuery = `
                    select email from user_table
                `;
        
          const { rows } = await pool.query(insertQuery);
        
          
          const hashedEmails = generateHashesForEmails(rows);
         
          for (let element of hashedEmails){ 
            if(element.hash == token)
            {
                console.log(element)
                const insertQuery = `
                UPDATE user_table
                SET password_hash = $1
                WHERE email = $2;
                      `;
              
                const { rows } = await pool.query(insertQuery, [password,element.email]);

                return NextResponse.json({data:true }, { status: "200" });
            }
          }

          
        
          
            return NextResponse.json({data:false }, { status: "200" });
    } catch (error) {
        return NextResponse.json({ data:false }, { status: "400" });
    }
 
}
