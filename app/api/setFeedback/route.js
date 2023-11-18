

import { NextResponse } from 'next/server'
import { sql } from "@vercel/postgres";
import { createPool } from "@vercel/postgres";
import { createClient } from "@vercel/postgres";


export async function POST(request){
   const PostData = await request.json()
    
   const feedbackData = [
    {
      "name": "Aarav Sharma",
      "email": "aaravsharma@gmail.com",
      "feedback": "The website is incredibly helpful in providing comprehensive college information.",
      "time": "2023/08/15 10:45:21"
  },
  {
      "name": "Ishaan Gupta",
      "email": "ishaangupta@gmail.com",
      "feedback": "The website's interface is user-friendly and assists greatly in finding suitable colleges.",
      "time": "2023/09/22 14:30:10"
  },
  {
      "name": "Ananya Reddy",
      "email": "ananyareddy@gmail.com",
      "feedback": "Great website! It helped me immensely in shortlisting colleges based on my preferences.",
      "time": "2023/10/05 09:12:45"
  },
  {
      "name": "Kabir Verma",
      "email": "kabirverma@gmail.com",
      "feedback": "The website's database is extensive and provided me with detailed insights into various colleges.",
      "time": "2023/11/12 17:20:30"
  },
  {
      "name": "Aaradhya Singh",
      "email": "aaradhyasingh@gmail.com",
      "feedback": "I found the website to be very informative, especially regarding college rankings.",
      "time": "2023/07/18 11:55:40"
  },
  {
      "name": "Vihaan Iyer",
      "email": "vihaaniyer@gmail.com",
      "feedback": "The website's search functionality made it easy for me to explore different colleges.",
      "time": "2023/06/29 08:16:55"
  },
  {
      "name": "Saisha Patel",
      "email": "saishapatel@gmail.com",
      "feedback": "This website significantly simplified my college selection process.",
      "time": "2023/05/10 13:48:37"
  },
  {
      "name": "Advait Desai",
      "email": "advaitdesai@gmail.com",
      "feedback": "The website's user reviews section helped me understand the real experiences of students.",
      "time": "2023/04/02 16:25:09"
  },
  {
      "name": "Zoya Khan",
      "email": "zoyakhan@gmail.com",
      "feedback": "Extremely useful website! It provided me with a variety of options to explore.",
      "time": "2023/02/14 19:07:18"
  },
  {
      "name": "Reyansh Joshi",
      "email": "reyanshjoshi@gmail.com",
      "feedback": "This website helped me narrow down my choices and make an informed decision.",
      "time": "2023/01/06 22:40:55"
  }
    ];

    // const {
    //     name,feedback      
    //   } = PostData;
    
      const pool = new createPool({
        connectionString: process.env.POSTGRES_URL, // Your PostgreSQL connection string
      });

      for (const feed of feedbackData) {
            const { name, feedback } = feed;
        const insertQuery = `
            INSERT INTO feedback_table (name,  feedback)
            VALUES ($1, $2)
        `;
        await pool.query(insertQuery, [name, feedback]);
      }

    

    //Close connection

    return NextResponse.json({message: "Feedback Done"},{status:"200"})
}