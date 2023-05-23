import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import db from "@/utils/db"
import { Customer } from "@/types/customers"

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_ID")
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing GOOGLE_CLIENT_SECRET")
  }

  return { clientId, clientSecret }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user && user.id && user.name && user.email && user.image) {
        try {
          const isUserExist = await db.findOne<Customer>({
            table: "customers",
            filter: { email: user.email },
          })

          if (!isUserExist) {
            // Not Exists then add a new user, and sign in
            console.log(user)
            await db.createOne({
              table: "customers",
              record: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
              },
            })
          }
          return true
        } catch (error) {
          throw new Error("Internal Server Error. Try Again Later.")
        }
      }

      return false
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.created_at = token.created_at
        session.user.updated_at = token.updated_at
      }

      return session
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        const isUserExist = await db.findOne<Customer>({
          table: "customers",
          filter: { email: user.email },
        })

        if (!isUserExist) {
          token.id = user!.id
          return token
        }

        return {
          id: isUserExist.id,
          name: isUserExist.name,
          email: isUserExist.email,
          picture: isUserExist.image,
          created_at: isUserExist.created_at,
          updated_at: isUserExist.updated_at,
        }
      }
      return token
    },
    redirect() {
      return "/"
    },
  },
}
