export interface Space {
  _id?: string
  name: string
  type: "office" | "mall" | "event-hall"
  floor: number
  size: number // in square meters
  price: number // monthly price in Naira
  features: string[]
  available: boolean
  imageUrl: string
  description: string
}

export interface Booking {
  _id?: string
  userId: string
  spaceId: string
  userName: string
  userEmail: string
  userPhone: string
  companyName?: string
  bookingDate: string
  status: "pending" | "confirmed" | "cancelled"
  paymentStatus: "pending" | "completed" | "failed"
  paymentReference?: string
  amount: number
  createdAt: string
}

export interface Transaction {
  _id?: string
  bookingId: string
  reference: string
  amount: number
  status: "pending" | "success" | "failed"
  paystackResponse: any
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  _id?: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
  status: "new" | "read" | "responded"
}

export interface MediaItem {
  _id?: string
  title: string
  type: "image" | "video"
  url: string
  category: "render" | "interior" | "exterior" | "floor-plan" | "construction"
  uploadedAt: string
}

export interface TimelineEvent {
  _id?: string
  title: string
  description: string
  date: string
  status: "completed" | "in-progress" | "upcoming"
  imageUrl?: string
}
