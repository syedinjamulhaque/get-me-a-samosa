import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getMyProfile } from "@/lib/data"
import Dashboard from "@/components/Dashboard"
import { SignOutButton } from "@/components/AuthButtons"

export const metadata = {
  title: "Dashboard - Get Me a Samosa",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

  const profile = await getMyProfile(session.user.email)

  if (!profile) {
    return (
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-14 text-center">
        <p>We couldn&apos;t load your account. Sign out and log in again.</p>
        <SignOutButton />
      </div>
    )
  }

  return <Dashboard profile={profile} />
}