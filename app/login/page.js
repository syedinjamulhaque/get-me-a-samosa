import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { SignInButton } from "@/components/AuthButtons"

export const metadata = {
  title: "Login - Get Me a Samosa",
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")

  return (
    <div className="container mx-auto flex flex-col items-center gap-8 px-4 py-14 sm:py-20">
      <h1 className="text-center text-2xl font-bold sm:text-3xl">Log in to get started</h1>
      <SignInButton />
    </div>
  )
}