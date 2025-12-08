"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNotification } from "./notification-system"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    description: string
  }
  onAddToCart: (product: any) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addNotification } = useNotification()

  const handleAddToCart = () => {
    onAddToCart(product)
    addNotification(`${product.name} added to cart!`, "success")
  }

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg">
      <div className="relative h-64 bg-secondary overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            size="icon"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
