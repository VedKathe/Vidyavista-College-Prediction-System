import Credentials from "next-auth/providers/credentials";

export const options = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({credentials});
        return null;    
      },
    }),
  ],
};
