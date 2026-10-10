export const MAX_AMOUNT = 50000

export const USERNAME_RE = /^[a-z0-9_-]{3,30}$/

export const RESERVED_USERNAMES = new Set([
  "api",
  "login",
  "dashboard",
  "about",
  "admin",
  "settings",
  "_next",
])

export function cleanUsername(seed = "") {
  const s = String(seed).toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30)
  return s.length >= 3 ? s : (s + "user").slice(0, 8)
}