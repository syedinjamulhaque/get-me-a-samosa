import { NextResponse } from "next/server"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"
import connectDb from "@/db/connectDb"
import { decryptSecret } from "@/lib/crypto"
import Payment from "@/models/Payment"
import User from "@/models/User"

const redirectTo = (req, path) => {
  const base = process.env.NEXT_PUBLIC_URL || new URL(req.url).origin
  return NextResponse.redirect(new URL(path, base), 303)
}

export async function POST(req) {
  const body = Object.fromEntries(await req.formData())
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = body

  if (!orderId) return redirectTo(req, "/")

  await connectDb()
  const payment = await Payment.findOne({ oid: orderId })
  if (!payment) return redirectTo(req, "/")

  const back = (ok) => redirectTo(req, `/${payment.to_user}?paymentdone=${ok}`)

  if (!paymentId || !signature) return back(false)

  const creator = await User.findOne({ username: payment.to_user }).select("+razorpaysecret")
  if (!creator?.razorpaysecret) return back(false)

  let valid = false
  try {
    valid = validatePaymentVerification(
      { order_id: orderId, payment_id: paymentId },
      signature,
      decryptSecret(creator.razorpaysecret)
    )
  } catch (error) {
    console.error("Payment verification error:", error)
  }
  if (!valid) return back(false)

  if (!payment.done) {
    payment.done = true
    await payment.save()
  }
  return back(true)
}