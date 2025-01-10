import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/dist/server/api-utils";

const prisma = new PrismaClient();

const handler = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "domain-login",
      name: "Credentials",
      trustHost: true,

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      jwt: {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
      session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
      async authorize(credentials) {
        // `credentials` contains the submitted username and password
        const { username, password } = credentials ?? {};

        // Add your user authentication logic here
        if (username === "jsmith" && password === "securepassword123") {
          // Return the user object if credentials are valid
          return { id: 1, name: "J Smith", email: "jsmith@example.com" };
        }
        redirect("/");
      },
    }),
  ],
});

export { handler as GET, handler as POST };
