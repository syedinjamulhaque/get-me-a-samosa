import { Suspense } from "react"
import { notFound } from "next/navigation"
import PaymentPage from "@/components/PaymentPage"
import { getPublicProfile, getSupporters } from "@/lib/data"

export async function generateMetadata({ params }) {
  const { username } = await params
  return { title: `Support ${username} - Get Me a Samosa` }
}

export default async function UserPage({ params }) {
  const { username } = await params
  const name = username.toLowerCase()

  const [profile, stats] = await Promise.all([getPublicProfile(name), getSupporters(name)])
  if (!profile) notFound()

  return (
    <Suspense>
      <PaymentPage profile={profile} {...stats} />
    </Suspense>
  )
}