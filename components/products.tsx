"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "./product-card"

const PRODUCTS = [
  {
    id: "1",
    name: "Sourdough Loaf",
    price: 6.99,
    image: "/artisan-sourdough-loaf.png",
    description: "Traditional sourdough with perfect crust",
    category: "Bread",
  },
  {
    id: "7",
    name: "Banana Bread",
    price: 5.99,
    image: "/banana-bread.jpg",
    description: "Moist and delicious homemade banana bread",
    category: "Bread",
  },
  {
    id: "2",
    name: "Croissants",
    price: 4.99,
    image: "/golden-buttery-croissants-pastry.jpg",
    description: "Buttery, flaky French croissants",
    category: "Pastries",
  },
  {
    id: "8",
    name: "Spring Rolls",
    price: 3.99,
    image: "/spring-rolls.jpg",
    description: "Crispy golden spring rolls",
    category: "Pastries",
  },
  {
    id: "9",
    name: "Samosa",
    price: 2.99,
    image: "/samosa.jpg",
    description: "Savory triangular pastries",
    category: "Pastries",
  },
  {
    id: "3",
    name: "Chocolate Cake",
    price: 24.99,
    image: "/rich-chocolate-layer-cake-dessert.jpg",
    description: "Decadent multi-layer chocolate cake",
    category: "Cakes",
  },
  {
    id: "10",
    name: "Cupcakes",
    price: 3.99,
    image: "/cupcakes.jpg",
    description: "Individual-sized frosted cupcakes",
    category: "Cakes",
  },
  {
    id: "4",
    name: "Bagels",
    price: 3.99,
    image: "/fresh-bagels-assorted.jpg",
    description: "Classic New York style bagels",
    category: "Bread",
  },
  {
    id: "5",
    name: "Donuts",
    price: 2.99,
    image: "/glazed-donuts-pastries.jpg",
    description: "Glazed and filled donuts",
    category: "Pastries",
  },
  {
    id: "6",
    name: "Cheesecake",
    price: 18.99,
    image: "/creamy-new-york-cheesecake.jpg",
    description: "Signature New York cheesecake",
    category: "Cakes",
  },
]

interface ProductsProps {
  onAddToCart: (product: any) => void
}

export default function Products({ onAddToCart }: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Bread", "Pastries", "Cakes"]
  const filtered = selectedCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory)

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-4xl font-serif font-bold text-foreground mb-4 text-center">Bakerra Ranges</h2>
      <p className="text-center text-muted-foreground mb-12">Carefully crafted with the finest ingredients</p>

      <div className="flex gap-2 mb-12 justify-center flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "bg-primary text-primary-foreground" : ""}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}
