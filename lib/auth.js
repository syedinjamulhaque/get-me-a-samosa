import GitHubProvider from "next-auth/providers/github"
import connectDb from "@/db/connectDb"
import User from "@/models/User"
import { RESERVED_USERNAMES, cleanUsername } from "@/lib/validation"

async function uniqueUsername(seed) {
  const base = cleanUsername(seed)
  let candidate = base
  while (RESERVED_USERNAMES.has(candidate) || (await User.exists({ username: candidate }))) {
    candidate = `${base.slice(0, 24)}${Math.floor(1000 + Math.random() * 9000)}`
  }
  return candidate
}

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return false

      try {
        await connectDb()
        const exists = await User.exists({ email: user.email })
        if (!exists) {
          await User.create({
            email: user.email,
            name: user.name ?? "",
            profilepic: user.image ?? "",
            username: await uniqueUsername(profile?.login ?? user.email.split("@")[0]),
          })
        }
        return true
      } catch (error) {
        console.error("Sign-in failed:", error)
        return false
      }
    },

    async session({ session }) {
      await connectDb()
      const dbUser = await User.findOne({ email: session.user.email }).select("username").lean()
      if (dbUser) session.user.username = dbUser.username
      return session
    },
  },
}