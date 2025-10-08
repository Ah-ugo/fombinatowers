"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, DollarSign, TrendingUp } from "lucide-react"
import { fetchBookings, fetchTransactions } from "@/lib/api"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalSpaces: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    loadDashboardData(token)
  }, [router])

  const loadDashboardData = async (token: string) => {
    try {
      const [bookings, transactions] = await Promise.all([fetchBookings(token), fetchTransactions(token)])

      const totalRevenue = transactions.reduce((sum: number, t: any) => sum + t.amount, 0)
      const pendingBookings = bookings.filter((b: any) => b.status === "pending").length

      setStats({
        totalSpaces: 12, // This would come from spaces API
        totalBookings: bookings.length,
        totalRevenue,
        pendingBookings,
      })
    } catch (error) {
      console.error("[v0] Failed to load dashboard data:", error)
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
          <h1 className="font-serif text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spaces</CardTitle>
              <Building2 className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalSpaces}</div>
              <p className="text-xs text-muted-foreground mt-1">Available for booking</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
              <Users className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.pendingBookings} pending approval</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <DollarSign className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground mt-1">From confirmed bookings</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Growth Rate</CardTitle>
              <TrendingUp className="text-primary" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+24%</div>
              <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-semibold">Office Space {i}</div>
                      <div className="text-sm text-muted-foreground">Floor {i + 5}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(5000000 + i * 1000000)}</div>
                      <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                  <div className="font-semibold">Manage Spaces</div>
                  <div className="text-sm text-muted-foreground">Add, edit, or remove spaces</div>
                </button>
                <button className="w-full p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                  <div className="font-semibold">View Transactions</div>
                  <div className="text-sm text-muted-foreground">Review payment history</div>
                </button>
                <button className="w-full p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                  <div className="font-semibold">Upload Media</div>
                  <div className="text-sm text-muted-foreground">Add new renders and photos</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
