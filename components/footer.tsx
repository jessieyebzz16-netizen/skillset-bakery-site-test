import { Mail, Phone, MapPin } from "lucide-react"

interface FooterProps {
  onBookingClick?: () => void
}

export default function Footer({ onBookingClick }: FooterProps) {
  return (
    <footer className="bg-secondary mt-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-4">Bakerra</h3>
            <p className="text-muted-foreground mb-4">Handcrafted baked goods delivered fresh to your door every day.</p>
            {onBookingClick && (
              <button
                onClick={onBookingClick}
                className="text-primary hover:text-primary/80 font-semibold transition-colors underline"
              >
                Book Now →
              </button>
            )}
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#products" className="hover:text-primary transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="mailto:hello@bakerra.com" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-4">Contact</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-primary" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                <span>hello@bakerra.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <span>123 Baker St, City, State</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Bakerra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
