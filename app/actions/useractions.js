"use server"

import Razorpay from "razorpay"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "@/lib/auth"
import { decryptSecret, encryptSecret } from "@/lib/crypto"
import connectDb from "@/db/connectDb"
import User from "@/models/User"
import Payment from "@/models/Payment"
import { MAX_AMOUNT, RESERVED_USERNAMES, USERNAME_RE } from "@/lib/validation"

const text = (value, max) => String(value ?? "").trim().slice(0, max)

const url = (value) => {
  const s = text(value, 500)
  if (!s) return ""
  try {
    return ["http:", "https:"].includes(new URL(s).protocol) ? s : null
  } catch {
    return null
  }
}

export async function initiate(amount, toUsername, form = {}) {
  const rupees = Number(amount)
  if (!Number.isInteger(rupees) || rupees < 1 || rupees > MAX_AMOUNT) {
    return { error: `Enter a whole amount between ₹1 and ₹${MAX_AMOUNT}.` }
  }

  await connectDb()
  const creator = await User.findOne({ username: text(toUsername, 30).toLowerCase() }).select(
    "+razorpaysecret"
  )
  if (!creator?.razorpayid || !creator?.razorpaysecret) {
    return { error: "This creator hasn't set up payments yet." }
  }

  try {
    const instance = new Razorpay({
      key_id: creator.razorpayid,
      key_secret: decryptSecret(creator.razorpaysecret),
    })
    const order = await instance.orders.create({ amount: rupees * 100, currency: "INR" })

    await Payment.create({
      oid: order.id,
      amount: rupees,
      to_user: creator.username,
      name: text(form.name, 50) || "Anonymous",
      message: text(form.message, 200),
    })

    return { orderId: order.id, amount: order.amount, key: creator.razorpayid }
  } catch (error) {
    console.error("Could not create order:", error)
    return { error: "Could not start the payment. Please try again." }
  }
}

export async function updateProfile(formData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return { error: "Please log in again." }

  const username = text(formData.get("username"), 30).toLowerCase()
  if (!USERNAME_RE.test(username) || RESERVED_USERNAMES.has(username)) {
    return { error: "Username must be 3 to 30 letters, numbers, - or _, and can't be a reserved word." }
  }

  const profilepic = url(formData.get("profilepic"))
  const coverpic = url(formData.get("coverpic"))
  if (profilepic === null || coverpic === null) {
    return { error: "Picture links must start with http:// or https://" }
  }

  const razorpayid = text(formData.get("razorpayid"), 60)
  if (razorpayid && !/^rzp_(test|live)_[A-Za-z0-9]+$/.test(razorpayid)) {
    return { error: "Razorpay Key ID looks like rzp_test_... or rzp_live_..." }
  }

  await connectDb()
  const me = await User.findOne({ email: session.user.email })
  if (!me) return { error: "Account not found. Please log in again." }

  const oldUsername = me.username
  if (username !== oldUsername && (await User.exists({ username }))) {
    return { error: "That username is already taken." }
  }

  me.name = text(formData.get("name"), 60)
  me.username = username
  me.profilepic = profilepic
  me.coverpic = coverpic
  me.razorpayid = razorpayid

  try {
    const secret = text(formData.get("razorpaysecret"), 100)
    if (secret) me.razorpaysecret = encryptSecret(secret)

    await me.save()
  } catch (error) {
    if (error.code === 11000) return { error: "That username is already taken." }
    console.error("Profile update failed:", error)
    return { error: "Could not save your profile. Please try again." }
  }

  if (oldUsername !== username) {
    await Payment.updateMany({ to_user: oldUsername }, { to_user: username })
    revalidatePath(`/${oldUsername}`)
  }
  revalidatePath(`/${username}`)

  return { success: true }
}