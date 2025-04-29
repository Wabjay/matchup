import NextAuth, { NextAuthOptions, User as Users } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import UserModel from "@/models/User";
import argon2 from "argon2";
// import { dbConnect } from "@/utils/dbConnects";
import User from "@/models/User";
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { connectDB } from "@/lib/db";

declare module "next-auth" {
  interface Users {
    id: string;
    role: "STUDENT" | "EMPLOYER";
    email: string;
    name: string;
    profileDone: boolean;
    profileSkipped: boolean;
  }

  interface Session {
    user: Users;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise), // ✅ Use MongoDB Adapter

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Find user in MongoDB (Mongoose)
        const user = await UserModel.findOne({ email: credentials.email }).select("+password");

        
        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const isValidPassword = await argon2.verify(user.password, credentials.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          role: user.role,
          email: user.email,
          name: user.fullName,
          profileDone: user.profileDone,
          profileSkipped: user.profileSkipped,
        } as Users;
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // New Google User - Create account
        await User.create({
          email: user.email,
          role: user?.role,
          fullName: user.name,
          profileImage: user.image,
          verified: false,
          profileDone: false,
        });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      if (token.email) {
        const dbUser = await UserModel.findOne({ email: token.email }).select("profileDone profileSkipped");

        if (dbUser) {
          token.profileDone = dbUser.profileDone;
          token.profileSkipped = dbUser.profileSkipped;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          role: token.role as  "STUDENT" | "EMPLOYER",
          email: token.email as string,
          name: token.name as string,
          profileDone: token.profileDone as boolean,
          profileSkipped: token.profileSkipped as boolean,
        };
      }
      return session;
    },
  },

  debug: true, // Enable debugging

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
