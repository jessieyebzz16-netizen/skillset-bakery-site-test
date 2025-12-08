"use client"

import { Button } from "@/components/ui/button"
import { X, Minus, Plus } from "lucide-react"
import { useState } from "react"
import CheckoutModal from "./checkout-modal"
import { useNotification } from "./notification-system"

interface CartProps {
  cart: any[]
  onRemove: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onClose: () => void
}

export default function Cart({ cart, onRemove, onUpdateQuantity, onClose }: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  const { addNotification } = useNotification()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 0 ? 3.99 : 0
  const total = subtotal + deliveryFee

  const handleRemoveItem = (id: string) => {
    const item = cart.find((i) => i.id === id)
    onRemove(id)
    addNotification(`${item?.name} removed from cart`, "info")
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id)
    } else {
      onUpdateQuantity(id, quantity)
      const item = cart.find((i) => i.id === id)
      addNotification(`${item?.name} quantity updated`, "info")
    }
  }

  if (cart.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg p-8 max-w-md w-full border border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold">Shopping Cart</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          <p className="text-center text-muted-foreground py-12">Your cart is empty</p>
          <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg p-8 max-w-md w-full max-h-screen overflow-y-auto border border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold">Shopping Cart ({cart.length})</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-border">
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-secondary rounded"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-secondary rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-6 pb-6 border-t border-border pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-bold">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t border-border">
              <span className="font-serif font-bold">Total</span>
              <span className="font-serif font-bold text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
          >
            Checkout
          </Button>
        </div>
      </div>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => {
          setShowCheckout(false)
          onClose()
        }}
        cart={cart}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        total={total}
      />
    </>
  )
}
