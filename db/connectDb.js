import dns from "node:dns"

if (process.env.NODE_ENV === "development") {
  dns.setServers(["8.8.8.8", "1.1.1.1"])
}

import mongoose from "mongoose"

const cache = (globalThis._mongoose ??= { conn: null, promise: null })

export default async function connectDb() {
  if (cache.conn) return cache.conn

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set. Add it to .env.local")
  }

  cache.promise ??= mongoose.connect(process.env.MONGO_URI, { bufferCommands: false })

  try {
    cache.conn = await cache.promise
  } catch (error) {
    cache.promise = null
    throw error
  }
  return cache.conn
}