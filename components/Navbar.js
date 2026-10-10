"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

const primaryBtn =
  "rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-gradient-to-bl hover:shadow-lg hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"

const menuItem = "block w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const username = session?.user?.username

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between gap-3 bg-gray-900 px-4 text-white shadow-xl shadow-white/20 sm:px-6">
      <Link href="/" className="flex items-center gap-2 font-bold transition-transform hover:scale-105">
        <img src="/samosa.gif" width={40} height={40} alt="" className="size-9 sm:size-10" />
        <span className="text-base sm:text-lg">Get Me a Samosa</span>
      </Link>

      {status === "loading" ? null : session ? (
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            className={`${primaryBtn} inline-flex items-center gap-2`}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            Account
            <svg
              className={`size-2.5 transition-transform ${open ? "rotate-180" : ""}`}
              viewBox="0 0 10 6"
              fill="none"
              aria-hidden="true"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg bg-slate-800 py-1 shadow-xl ring-1 ring-white/10"
            >
              <Link role="menuitem" href="/dashboard" className={menuItem} onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              {username && (
                <Link role="menuitem" href={`/${username}`} className={menuItem} onClick={() => setOpen(false)}>
                  Your page
                </Link>
              )}
              <button
                type="button"
                role="menuitem"
                className={menuItem}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className={primaryBtn}>
          Login
        </Link>
      )}
    </nav>
  )
}