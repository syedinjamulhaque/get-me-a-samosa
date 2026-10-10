"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import { initiate } from "@/app/actions/useractions"
import { MAX_AMOUNT } from "@/lib/validation"

const PRESET_AMOUNTS = [10, 20, 30]

const inputCls =
  "w-full rounded-lg bg-slate-800 p-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
const panelCls = "rounded-lg bg-slate-900 p-4 text-white sm:p-6 md:p-8"

export default function PaymentPage({ profile, supporters, count, total }) {
  const { username, profilepic, coverpic, paymentsReady } = profile
  const [form, setForm] = useState({ name: "", message: "", amount: "" })
  const [paying, setPaying] = useState(false)
  const router = useRouter()
  const paymentStatus = useSearchParams().get("paymentdone")

  useEffect(() => {
    if (!paymentStatus) return
    if (paymentStatus === "true") {
      toast.success("Thanks for your support!", { toastId: "payment-status" })
    } else {
      toast.error("The payment didn't go through. You have not been charged.", { toastId: "payment-status" })
    }
    router.replace(`/${username}`, { scroll: false })
  }, [paymentStatus, router, username])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const amount = Number(form.amount)
  const amountOk = Number.isInteger(amount) && amount >= 1 && amount <= MAX_AMOUNT
  const canPay = paymentsReady && amountOk && !paying

  const pay = async () => {
    if (!canPay) return
    if (!window.Razorpay) {
      toast.error("The payment window is still loading. Try again in a moment.")
      return
    }

    setPaying(true)
    try {
      const order = await initiate(amount, username, form)
      if (order.error) {
        toast.error(order.error)
        return
      }

      const checkout = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: "INR",
        name: "Get Me a Samosa",
        description: `Support @${username}`,
        order_id: order.orderId,
        callback_url: `${window.location.origin}/api/razorpay`,
        prefill: { name: form.name },
        theme: { color: "#7c3aed" },
      })
      checkout.on("payment.failed", () => toast.error("Payment failed. Please try again."))
      checkout.open()
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setPaying(false)
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="relative">
        <div className="h-40 w-full bg-gradient-to-br from-purple-900 to-blue-900 sm:h-56 md:h-80">
          {coverpic && <img src={coverpic} alt="" className="h-full w-full object-cover" />}
        </div>
        <img
          src={profilepic || "/avatar.gif"}
          alt={`${username}'s profile picture`}
          className="absolute -bottom-14 left-1/2 size-28 -translate-x-1/2 rounded-full border-2 border-white bg-slate-800 object-cover sm:-bottom-16 sm:size-32"
        />
      </div>

      <div className="mx-auto mt-20 flex w-full max-w-5xl flex-col items-center gap-2 px-4 pb-16 sm:mt-24">
        <h1 className="break-all text-lg font-bold">@{username}</h1>
        <p className="text-center text-slate-400">Let&apos;s help {username} get a samosa!</p>
        <p className="text-center text-slate-400">
          {count} {count === 1 ? "payment" : "payments"} · ₹{total.toLocaleString("en-IN")} raised
        </p>

        <div className="mt-8 grid w-full gap-4 md:grid-cols-2">
          <section className={panelCls}>
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">Top 10 supporters</h2>
            <ul className="space-y-4">
              {supporters.length === 0 && <li className="text-slate-300">No supporters yet. Be the first!</li>}
              {supporters.map((p) => (
                <li key={p._id} className="flex items-start gap-3">
                  <img src="/avatar.gif" width={32} height={32} alt="" className="size-8 shrink-0" />
                  <p className="min-w-0 break-words text-sm sm:text-base">
                    {p.name} donated <span className="font-bold">₹{p.amount}</span>
                    {p.message && <> with a message &quot;{p.message}&quot;</>}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className={panelCls}>
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">Buy {username} a samosa</h2>

            {!paymentsReady && (
              <p className="mb-4 rounded-lg bg-slate-800 p-3 text-sm text-slate-300">
                {username} hasn&apos;t set up payments yet.
              </p>
            )}

            <div className="flex flex-col gap-2">
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                maxLength={50}
                placeholder="Your name (optional)"
                autoComplete="name"
                className={inputCls}
              />
              <input
                name="message"
                type="text"
                value={form.message}
                onChange={handleChange}
                maxLength={200}
                placeholder="Message (optional)"
                className={inputCls}
              />
              <input
                name="amount"
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_AMOUNT}
                step={1}
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount in ₹"
                className={inputCls}
              />
              {form.amount && !amountOk && (
                <p className="text-xs text-red-400">Enter a whole number from 1 to {MAX_AMOUNT}.</p>
              )}

              <button
                type="button"
                onClick={pay}
                disabled={!canPay}
                className="rounded-lg bg-gradient-to-br from-purple-700 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {paying ? "Opening payment..." : "Pay"}
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {PRESET_AMOUNTS.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, amount: String(value) }))}
                  className={`rounded-lg px-4 py-2.5 text-sm hover:bg-slate-700 ${
                    amount === value ? "bg-purple-700" : "bg-slate-800"
                  }`}
                >
                  ₹{value}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}