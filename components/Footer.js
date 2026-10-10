export default function Footer() {
  return (
    <footer className="flex items-center justify-center border-t border-white/10 bg-gray-900 px-4 py-4 text-white">
      <p className="text-center text-xs sm:text-sm">
        Copyright &copy; {new Date().getFullYear()} Get Me a Samosa - All rights reserved!
      </p>
    </footer>
  )
}