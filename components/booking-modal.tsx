"use client"

import { useState } from "react"
import { X, Calendar, Clock, User, Phone } from "lucide-react"
import { useNotification } from "./notification-system"

interface BookingForm {
  type: "preorder" | "custom" | "pickup"
  name: string
  email: string
  phone: string
  date: string
  time: string
  notes: string
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  bookingType?: "preorder" | "custom" | "pickup"
}

export default function BookingModal({ isOpen, onClose, bookingType = "preorder" }: BookingModalProps) {
  const { addNotification } = useNotification()
  const [activeTab, setActiveTab] = useState<"preorder" | "custom" | "pickup">(bookingType)
  const [formData, setFormData] = useState<BookingForm>({
    type: bookingType,
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      addNotification("Please fill in all required fields", "warning")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const typeLabel = {
        preorder: "Pre-order",
        custom: "Custom order",
        pickup: "Pick-up",
      }[activeTab]

      addNotification(
        `${typeLabel} confirmed! We'll contact you at ${formData.phone} to confirm details.`,
        "success"
      )

      setFormData({
        type: activeTab,
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        notes: "",
      })
      setIsSubmitting(false)
      onClose()
    }, 1000)
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex justify-between items-center border-b border-primary/20">
          <h2 className="text-2xl font-serif font-bold">Book with Bakerra</h2>
          <button
            onClick={onClose}
            className="hover:bg-primary/80 p-1 rounded transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-border">
          {(["preorder", "custom", "pickup"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {tab === "preorder" && "Pre-Order"}
              {tab === "custom" && "Custom"}
              {tab === "pickup" && "Pick-up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Description */}
          <div className="bg-secondary p-3 rounded text-sm text-foreground">
            {activeTab === "preorder" &&
              "Reserve your favorite items in advance and pick them up fresh on your chosen date."}
            {activeTab === "custom" &&
              "Create a custom order for special occasions. We'll contact you to finalize details."}
            {activeTab === "pickup" && "Schedule a convenient time to pick up your items from our location."}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Phone Number *
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

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Preferred Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={getMinDate()}
              className="w-full bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Preferred Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full bg-background border border-border rounded px-3 py-2 text-foreground focus:outline-none focus:border-primary"
            >
              <option value="">Select a time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
              <option value="18:00">6:00 PM</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Special Requests</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any special requests or items you'd like to pre-order?"
              rows={3}
              className="w-full bg-background border border-border rounded px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-medium py-2 rounded transition-colors"
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            We'll contact you within 2 hours to confirm your booking.
          </p>
        </form>
      </div>
    </div>
  )
}
