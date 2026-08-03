import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'

const links = [
  { id: 'about', label: 'Giới thiệu' },
  { id: 'skills', label: 'Kỹ năng' },
  { id: 'experience', label: 'Kinh nghiệm' },
  { id: 'projects', label: 'Dự án' },
  { id: 'contact', label: 'Liên hệ' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="hover:scale-105 transition-transform duration-300">
          <Logo withText className="w-9 h-9" />
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-haze">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="hover:text-white transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="text-sm font-medium px-4 py-2 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          Kết nối
        </a>
      </div>
    </motion.nav>
  )
}
