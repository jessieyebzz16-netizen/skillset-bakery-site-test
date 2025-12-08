"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Products from "@/components/products"
import About from "@/components/about"
import Cart from "@/components/cart"
import Footer from "@/components/footer"
import Chatbot from "@/components/chatbot"
import NotificationCenter from "@/components/notification-system"
import BookingModal from "@/components/booking-modal"

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<any[]>([])
  const [bookingOpen, setBookingOpen] = useState(false)

  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <NotificationCenter />
      <Header cartCount={cart.length} onCartClick={() => setCartOpen(!cartOpen)} />
      {cartOpen && (
        <Cart
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClose={() => setCartOpen(false)}
        />
      )}
      <Hero />
      <Products onAddToCart={addToCart} />
      <About onBookingClick={() => setBookingOpen(true)} />
      <Footer onBookingClick={() => setBookingOpen(true)} />
      <Chatbot />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  )
}
