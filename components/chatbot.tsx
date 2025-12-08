"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, MessageCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

const suggestedQuestions = [
  "What products do you offer?",
  "Do you have vegan options?",
  "What are your delivery options?",
  "How can I place a custom order?",
  "What are your operating hours?",
  "Do you offer gluten-free items?",
]

// Simple chatbot responses
const getBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase()

  if (message.includes("product") || message.includes("offer")) {
    return "At Bakerra, we offer fresh artisan breads, delicate pastries, cakes, cupcakes, and more! All handcrafted daily with the finest ingredients. Visit our Bakerra Picks section to see our full selection!"
  }
  if (message.includes("vegan")) {
    return "Yes! We offer vegan options for many of our products. Please check our menu or contact us at hello@bakerra.com for specific vegan items available."
  }
  if (message.includes("delivery")) {
    return "We offer Standard Delivery (24 hours) for $3.99 and Express Delivery (6 hours) for +$5. You can add items to your cart and select your delivery preference during checkout!"
  }
  if (message.includes("custom") || message.includes("order")) {
    return "We'd love to create a custom order for you! Please contact us at hello@bakerra.com or call (555) 123-4567 at least 48 hours in advance for custom cakes and pastry platters."
  }
  if (message.includes("hour") || message.includes("open") || message.includes("time")) {
    return "Our hours are: Mon-Fri: 7am - 7pm, Sat-Sun: 8am - 6pm. Feel free to reach out if you have any questions!"
  }
  if (message.includes("gluten")) {
    return "Yes! We have gluten-free options available. Please check our Bakerra Ranges section or contact us for details on our gluten-free offerings."
  }
  if (message.includes("hello") || message.includes("hi")) {
    return "Hello! Welcome to Bakerra 👋 How can I help you today? Feel free to ask about our products, delivery, or anything else!"
  }

  return "Thanks for your question! For detailed information, please visit our About section or contact us at hello@bakerra.com. We're here to help!"
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! Welcome to Bakerra 👋 How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message: string = inputValue) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(message),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 500)
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-card rounded-lg shadow-2xl flex flex-col border border-border">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-serif font-bold">Bakerra Chat</h3>
              <p className="text-sm text-primary-foreground/80">We're here to help!</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/80 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm mb-4">Here are some popular questions:</p>
                <div className="space-y-2">
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left text-sm p-2 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors text-xs leading-relaxed"
                    >
                      • {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (when showing initial state) */}
          {messages.length > 2 && messages[messages.length - 1].type === "bot" && (
            <div className="px-4 py-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {suggestedQuestions.slice(0, 4).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs p-2 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors text-left leading-tight"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-background rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-card border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded px-3 py-2 transition-colors"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
