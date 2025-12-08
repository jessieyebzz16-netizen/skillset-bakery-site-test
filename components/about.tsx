interface AboutProps {
  onBookingClick?: () => void
}

export default function About({ onBookingClick }: AboutProps) {
  return (
    <section id="about" className="bg-secondary py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-8">About Bakerra</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              At Bakerra, we believe every bite should feel like home. Our bakery was born from a love for simple, honest ingredients and a passion for creating treats that bring people together. From soft breads to our signature pastries, everything we make is handcrafted with care, freshness, and a whole lot of heart.
            </p>
            
            <p className="text-lg text-foreground leading-relaxed mb-8">
              Whether you're grabbing a morning loaf, celebrating a special moment, or simply craving something sweet, Bakerra is here to serve you warm goodness daily.
            </p>

            {onBookingClick && (
              <button
                onClick={onBookingClick}
                className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Book a Pre-Order or Reservation
              </button>
            )}
          </div>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-4">🌾</div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-2">Quality Ingredients</h3>
            <p className="text-muted-foreground">We use only the finest, freshest ingredients in every recipe</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-4">🤝</div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-2">Handcrafted Care</h3>
            <p className="text-muted-foreground">Each item is made with love and attention to detail</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-4">⚡</div>
            <h3 className="text-xl font-serif font-bold text-foreground mb-2">Fresh Daily</h3>
            <p className="text-muted-foreground">Baked fresh every day for your enjoyment</p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-card rounded-lg p-8 mb-20">
          <h3 className="text-3xl font-serif font-bold text-foreground mb-6">Our Mission & Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-primary mb-3">Our Mission</h4>
              <p className="text-foreground leading-relaxed">
                To craft exceptional baked goods that nourish both body and soul, bringing families and communities together through the warmth of freshly baked treats made with passion and integrity.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-primary mb-3">Our Core Values</h4>
              <ul className="text-foreground space-y-2">
                <li>✓ Authenticity in every recipe</li>
                <li>✓ Commitment to quality and freshness</li>
                <li>✓ Community-focused service</li>
                <li>✓ Honest, transparent practices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Specialties */}
        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">Our Specialties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-6">
              <h4 className="text-xl font-bold text-primary mb-3">Signature Recipes</h4>
              <p className="text-foreground mb-4">
                Our artisan breads are made using traditional methods with slow fermentation to develop rich flavors. Each loaf is a testament to time-honored baking techniques.
              </p>
              <p className="text-muted-foreground text-sm">Featuring sourdough, whole wheat, and specialty grain breads</p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h4 className="text-xl font-bold text-primary mb-3">Dietary Options</h4>
              <p className="text-foreground mb-4">
                We cater to various dietary preferences with gluten-free, vegan, and sugar-free options available. Quality never compromises, regardless of dietary needs.
              </p>
              <p className="text-muted-foreground text-sm">Ask about seasonal specials and custom orders</p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h4 className="text-xl font-bold text-primary mb-3">Seasonal Offerings</h4>
              <p className="text-foreground mb-4">
                We celebrate each season with limited-edition flavors and special creations using locally sourced, seasonal ingredients.
              </p>
              <p className="text-muted-foreground text-sm">Follow us for updates on seasonal favorites</p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h4 className="text-xl font-bold text-primary mb-3">Custom Orders</h4>
              <p className="text-foreground mb-4">
                Planning a special event? We create custom cakes, pastry platters, and bespoke orders tailored to your celebration.
              </p>
              <p className="text-muted-foreground text-sm">Contact us at least 48 hours in advance</p>
            </div>
          </div>
        </div>

        {/* Community & Sustainability */}
        <div className="bg-card rounded-lg p-8 mb-20">
          <h3 className="text-3xl font-serif font-bold text-foreground mb-6">Community & Sustainability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold text-primary mb-3">🌱 Local Sourcing</h4>
              <p className="text-foreground">We partner with local suppliers and farmers whenever possible, supporting our community while ensuring the freshest ingredients.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-3">♻️ Eco-Friendly Practices</h4>
              <p className="text-foreground">Our packaging is biodegradable and recyclable. We minimize waste and continuously seek sustainable baking practices.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-3">🤲 Community Involvement</h4>
              <p className="text-foreground">We believe in giving back. A portion of our profits supports local food banks and community organizations.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary mb-3">💚 Fair Practices</h4>
              <p className="text-foreground">We maintain ethical sourcing practices and ensure fair compensation for all our suppliers and team members.</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                "Bakerra's bread is the best I've ever had. Fresh, delicious, and delivered right to my door!"
              </p>
              <p className="font-semibold text-foreground">— Sarah M.</p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                "The croissants are incredibly flaky and buttery. I'm obsessed! Worth every penny."
              </p>
              <p className="font-semibold text-foreground">— James T.</p>
            </div>

            <div className="bg-card rounded-lg p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-foreground mb-4 italic">
                "My custom cake was stunning and tasted even better than it looked. Highly recommend!"
              </p>
              <p className="font-semibold text-foreground">— Emma R.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
