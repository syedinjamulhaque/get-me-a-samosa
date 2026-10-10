"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { updateProfile } from "@/app/actions/useractions"

const inputCls =
  "block w-full rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 read-only:cursor-not-allowed read-only:opacity-60"

export default function Dashboard({ profile }) {
  const { update } = useSession()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const fields = [
    { name: "name", label: "Name", type: "text", maxLength: 60 },
    { name: "email", label: "Email", type: "email", readOnly: true, hint: "Comes from your GitHub account." },
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      pattern: "[A-Za-z0-9_\\-]{3,30}",
      hint: "3 to 30 letters, numbers, - or _. Your page lives at /username.",
    },
    { name: "profilepic", label: "Profile picture link", type: "url", placeholder: "https://..." },
    { name: "coverpic", label: "Cover picture link", type: "url", placeholder: "https://..." },
    {
      name: "razorpayid",
      label: "Razorpay Key ID",
      type: "text",
      pattern: "rzp_(test|live)_[A-Za-z0-9]+",
      placeholder: "rzp_test_...",
    },
    {
      name: "razorpaysecret",
      label: "Razorpay Key Secret",
      type: "password",
      autoComplete: "new-password",
      placeholder: profile.hasSecret ? "Saved. Leave blank to keep it." : "",
      hint: "Stored encrypted on the server and never shown again.",
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const result = await updateProfile(new FormData(e.currentTarget))
      if (result?.error) {
        toast.error(result.error)
        return
      }
      toast.success("Profile updated")
      await update() 
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-10">
      <h1 className="mb-2 text-center text-2xl font-bold sm:text-3xl">Welcome to your dashboard</h1>
      <p className="mb-8 text-center text-sm text-slate-300">
        Your page:{" "}
        <Link href={`/${profile.username}`} className="text-purple-400 underline underline-offset-2">
          /{profile.username}
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
        {fields.map(({ name, label, hint, ...input }) => (
          <div key={name}>
            <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-200">
              {label}
            </label>
            <input
              id={name}
              name={name}
              defaultValue={name === "razorpaysecret" ? "" : (profile[name] ?? "")}
              className={inputCls}
              {...input}
            />
            {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
          </div>
        ))}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-blue-500 p-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  )
}