"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchBookings } from "@/lib/api"
import type { Booking } from "@/lib/types"

export default function AdminBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    loadBookings(token)
  }, [router])

  const loadBookings = async (token: string) => {
    try {
      const data = await fetchBookings(token)
      setBookings(data)
    } catch (error) {
      console.error("[v0] Failed to load bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Bookings</h1>
          <p className="text-muted-foreground">View and manage all space bookings</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">All Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Customer</th>
                    <th className="text-left py-4 px-4 font-semibold">Space</th>
                    <th className="text-left py-4 px-4 font-semibold">Amount</th>
                    <th className="text-left py-4 px-4 font-semibold">Date</th>
                    <th className="text-left py-4 px-4 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 font-semibold">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-muted-foreground">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-4 px-4">
                          <div className="font-medium">{booking.userName}</div>
                          <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium">{booking.spaceId}</div>
                        </td>
                        <td className="py-4 px-4 font-medium">{formatCurrency(booking.amount)}</td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{formatDate(booking.createdAt)}</td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              booking.status === "confirmed"
                                ? "bg-primary text-primary-foreground"
                                : booking.status === "pending"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-destructive text-destructive-foreground"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              booking.paymentStatus === "completed"
                                ? "bg-primary text-primary-foreground"
                                : booking.paymentStatus === "pending"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-destructive text-destructive-foreground"
                            }
                          >
                            {booking.paymentStatus}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
