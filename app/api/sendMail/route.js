import { NextResponse } from "next/server";
import { createPool } from "@vercel/postgres";
import { sendMail } from "./service";
const crypto = require('crypto');

function generateHash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
  }

 

export async function POST(request) {
    const PostData = await request.json();
    const {email} = PostData
    try {

        const emailhash = generateHash(email);
        const pool = new createPool({
            connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
          });
        
          const insertQuery = `
                    select email from user_table
                `;
        
          const { rows } = await pool.query(insertQuery);
        
        
          
          const foundUser = rows.find(
            (user) => user.email === email 
          );
        
          if (foundUser){
            await sendMail(
                "TEST",
                email,
                "To Reset Your password go to this Link http://vidyavista.netlify.app/student/resetPass/"+emailhash
              );
              return NextResponse.json({ message: "Mail Send" ,data:true}, { status: "200" });
          }
          else{
            return NextResponse.json({ message: "Not found",data:false }, { status: "200" });
        }


        
    } catch (error) {
        return NextResponse.json({ message: error,data:false }, { status: "400" });
    }
 
}
