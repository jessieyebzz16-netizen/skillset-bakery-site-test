import { Button } from "@/components/ui/button"
import Image from "next/image"

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Sourdough Loaf",
    image: "/artisan-sourdough-loaf.png",
    category: "Bread",
  },
  {
    id: "7",
    name: "Banana Bread",
    image: "/banana-bread.jpg",
    category: "Bread",
  },
  {
    id: "2",
    name: "Croissants",
    image: "/golden-buttery-croissants-pastry.jpg",
    category: "Pastries",
  },
  {
    id: "8",
    name: "Spring Rolls",
    image: "/spring-rolls.jpg",
    category: "Pastries",
  },
  {
    id: "9",
    name: "Samosa",
    image: "/samosa.jpg",
    category: "Pastries",
  },
  {
    id: "3",
    name: "Chocolate Cake",
    image: "/rich-chocolate-layer-cake-dessert.jpg",
    category: "Cakes",
  },
  {
    id: "10",
    name: "Cupcakes",
    image: "/cupcakes.jpg",
    category: "Cakes",
  },
  {
    id: "4",
    name: "Bagels",
    image: "/fresh-bagels-assorted.jpg",
    category: "Bread",
  },
  {
    id: "5",
    name: "Donuts",
    image: "/glazed-donuts-pastries.jpg",
    category: "Pastries",
  },
  {
    id: "6",
    name: "Cheesecake",
    image: "/creamy-new-york-cheesecake.jpg",
    category: "Cakes",
  },
]

const sortedProducts = [...FEATURED_PRODUCTS].sort((a, b) => a.name.localeCompare(b.name))

export default function Hero() {
  return (
    <>
      {/* Home Section with Background Image */}
      <section 
        id="home"
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/golden-buttery-croissants-pastry.jpg')",
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white mb-6 text-pretty">
            Freshly Baked Goodness, Every Day
          </h1>
          <p className="text-xl sm:text-2xl text-gray-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Welcome to Bakerra — your home for wholesome breads, delicate pastries, and sweet treats made with love. Baked fresh each day so you can enjoy flavor, warmth, and quality in every bite.
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-16 text-center">Bakerra Picks</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative w-full h-64 bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif font-bold text-foreground">{product.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
