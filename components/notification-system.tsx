"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, CheckCircle, Info } from "lucide-react"

export type NotificationType = "success" | "error" | "info" | "warning"

interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string, type: NotificationType, duration?: number) => void
  removeNotification: (id: string) => void
}

// Store for global notification management
let notificationStore: Notification[] = []
let listeners: Set<(notifications: Notification[]) => void> = new Set()

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const listener = (updatedNotifications: Notification[]) => {
      setNotifications(updatedNotifications)
    }
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  const addNotification = (message: string, type: NotificationType = "info", duration = 4000) => {
    const id = Date.now().toString()
    const newNotification: Notification = { id, message, type, duration }

    notificationStore = [...notificationStore, newNotification]
    listeners.forEach((listener) => listener(notificationStore))

    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration)
    }
  }

  const removeNotification = (id: string) => {
    notificationStore = notificationStore.filter((n) => n.id !== id)
    listeners.forEach((listener) => listener(notificationStore))
  }

  return { notifications, addNotification, removeNotification }
}

export default function NotificationCenter() {
  const { notifications, removeNotification } = useNotification()

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />
      case "error":
        return <AlertCircle className="w-5 h-5" />
      case "warning":
        return <AlertCircle className="w-5 h-5" />
      case "info":
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "info":
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${getStyles(notification.type)} pointer-events-auto animate-slideIn shadow-lg`}
        >
          {getIcon(notification.type)}
          <span className="text-sm font-medium flex-1">{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-2 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
