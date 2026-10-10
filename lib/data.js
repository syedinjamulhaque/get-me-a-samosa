import connectDb from "@/db/connectDb"
import User from "@/models/User"
import Payment from "@/models/Payment"

const plain = (doc) => JSON.parse(JSON.stringify(doc))

export async function getPublicProfile(username) {
  await connectDb()
  const u = await User.findOne({ username })
    .select("username profilepic coverpic razorpayid +razorpaysecret")
    .lean()
  if (!u) return null

  return {
    username: u.username,
    profilepic: u.profilepic || "",
    coverpic: u.coverpic || "",
    paymentsReady: Boolean(u.razorpayid && u.razorpaysecret),
  }
}

export async function getSupporters(username) {
  await connectDb()
  const match = { to_user: username, done: true }

  const [top, totals] = await Promise.all([
    Payment.find(match)
      .sort({ amount: -1, createdAt: -1 })
      .limit(10)
      .select("name message amount")
      .lean(),
    Payment.aggregate([
      { $match: match },
      { $group: { _id: null, count: { $sum: 1 }, total: { $sum: "$amount" } } },
    ]),
  ])

  return {
    supporters: plain(top),
    count: totals[0]?.count ?? 0,
    total: totals[0]?.total ?? 0,
  }
}

export async function getMyProfile(email) {
  await connectDb()
  const u = await User.findOne({ email }).select("+razorpaysecret").lean()
  if (!u) return null

  const { razorpaysecret, _id, __v, createdAt, updatedAt, ...rest } = u
  return plain({ ...rest, hasSecret: Boolean(razorpaysecret) })
}