import NextAuth from "next-auth/next";
import options from "./options";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session:{
    strategy:'jwt'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        
        const response = await sql `SELECT * from user_table WHERE email=${credentials.email}`
        const user = response.rows[0];
        
        console.log({ user });
        return {
            id:user.id,
            email: user.email
        };
      },
    }),
  ],
});
export { handler as GET, handler as POST };
