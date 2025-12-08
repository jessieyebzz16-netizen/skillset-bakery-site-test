"use client"

import { ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "products", "about"]
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if section is in viewport (top 100px for better detection)
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getLinkClass = (section: string) => {
    const baseClass = "transition-all duration-200"
    const isActive = activeSection === section
    return isActive
      ? `${baseClass} text-primary font-semibold border-b-2 border-primary pb-1`
      : `${baseClass} text-foreground hover:text-primary`
  }
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Modern Bakery Logo */}
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" className="text-primary"/>
              <path d="M16 8V24M10 16H22" stroke="currentColor" strokeWidth="1.5" className="text-primary" strokeLinecap="round"/>
              <circle cx="16" cy="12" r="2" fill="currentColor" className="text-primary"/>
              <circle cx="16" cy="20" r="2" fill="currentColor" className="text-primary"/>
              <circle cx="12" cy="16" r="2" fill="currentColor" className="text-primary"/>
              <circle cx="20" cy="16" r="2" fill="currentColor" className="text-primary"/>
            </svg>
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground hidden sm:block">Bakerra</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className={getLinkClass("home")}>
            Home
          </a>
          <a href="#products" className={getLinkClass("products")}>
            Products
          </a>
          <a href="#about" className={getLinkClass("about")}>
            About
          </a>
        </nav>

        <button
          onClick={onCartClick}
          className="relative p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
