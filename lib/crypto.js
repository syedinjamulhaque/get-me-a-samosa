import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto"

const PREFIX = "enc:v1:"

function getKey() {
  const hex = process.env.ENCRYPTION_KEY
  if (!hex || !/^[0-9a-fA-F]{64}$/.test(hex)) {
    throw new Error(
      "ENCRYPTION_KEY must be 64 hex characters. Generate one with: " +
        "node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
    )
  }
  return Buffer.from(hex, "hex")
}

export function encryptSecret(plain) {
  const iv = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv)
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()])
  return PREFIX + Buffer.concat([iv, cipher.getAuthTag(), data]).toString("base64")
}

export function decryptSecret(stored) {
  if (!stored) return ""
  if (!stored.startsWith(PREFIX)) return stored

  const raw = Buffer.from(stored.slice(PREFIX.length), "base64")
  const decipher = createDecipheriv("aes-256-gcm", getKey(), raw.subarray(0, 12))
  decipher.setAuthTag(raw.subarray(12, 28))
  return Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8")
}