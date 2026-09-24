import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white flex flex-col sm:flex-row items-center justify-center gap-1 px-4 py-4 md:py-0 md:h-16 border-t border-white/10'>
        <p className='text-center text-xs sm:text-sm md:text-base transition-colors duration-300 hover:text-purple-400'>
          Copyright &copy; {currentYear} Get me A Samosa - All rights reserved!
        </p>
    </footer>
  )
}

export default Footer