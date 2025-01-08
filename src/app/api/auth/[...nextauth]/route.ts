import NextAuth from "next-auth";

import Github  from "next-auth/providers/github";
import cred  from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        
    ],
    });

    export  {handler as GET, handler as POST};