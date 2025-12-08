"use client"

import { useState } from "react"
import { X, CreditCard, MapPin, Phone, User } from "lucide-react"
import { useNotification } from "./notification-system"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cart: any[]
  subtotal: number
  deliveryFee: number
  total: number
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  subtotal,
  deliveryFee,
  total,
}: CheckoutModalProps) {
  const { addNotification } = useNotification()
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      addNotification("Please fill in all shipping details", "warning")
      return
    }
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
      addNotification("Please enter valid payment details", "warning")
      return
    }
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep("confirmation")
    }, 1500)
  }

  const handleFinish = () => {
    addNotification("Order placed successfully! You'll receive a confirmation email shortly.", "success")
    onClose()
    setStep("shipping")
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex justify-between items-center border-b border-primary/20">
          <h2 className="text-2xl font-serif font-bold">
            {step === "shipping" && "Delivery Information"}
            {step === "payment" && "Payment Details"}
            {step === "confirmation" && "Order Confirmed!"}
          </h2>
          {step !== "confirmation" && (
            <button
              onClick={onClose}
              className="hover:bg-primary/80 p-1 rounded transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        {step !== "confirmation" && (
          <div className="flex gap-4 p-4 border-b border-border">
            {(["shipping", "payment"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s
                      ? "bg-primary text-primary-foreground"
                      : s === "shipping"
                        ? "bg-secondary text-foreground"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-foreground">{s === "shipping" ? "Delivery" : "Payment"}</span>
                {i < 1 && <div className="flex-1 h-0.5 bg-border mx-2"></div>}
              </div>
            ))}
          </div>
        )}

        <div className="p-6">
          {/* Shipping Form */}
          {step === "shipping" && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <User className="inline w-4 h-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          )}

          {/* Payment Form */}
          {step === "payment" && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <CreditCard className="inline w-4 h-4 mr-1" />
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Expiry Date *</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CVC *</label>
                  <input
                    type="text"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength={3}
                    className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-secondary rounded p-4 space-y-2 text-sm">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground font-medium py-2 rounded transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-medium py-2 rounded transition-colors"
                >
                  {isProcessing ? "Processing..." : "Complete Purchase"}
                </button>
              </div>
            </form>
          )}

          {/* Confirmation */}
          {step === "confirmation" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Order Confirmed!</h3>
                <p className="text-muted-foreground">Thank you for your order. We'll prepare it fresh and have it ready for delivery.</p>
              </div>

              <div className="bg-secondary p-4 rounded space-y-2 text-sm text-foreground">
                <p>
                  <span className="font-semibold">Order Total:</span> ${total.toFixed(2)}
                </p>
                <p>
                  <span className="font-semibold">Delivery:</span> Tomorrow, between 10am - 2pm
                </p>
                <p className="text-xs text-muted-foreground">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
