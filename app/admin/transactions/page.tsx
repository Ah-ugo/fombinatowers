"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchTransactions } from "@/lib/api"
import type { Transaction } from "@/lib/types"

export default function AdminTransactionsPage() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    loadTransactions(token)
  }, [router])

  const loadTransactions = async (token: string) => {
    try {
      const data = await fetchTransactions(token)
      setTransactions(data)
    } catch (error) {
      console.error("[v0] Failed to load transactions:", error)
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
      hour: "2-digit",
      minute: "2-digit",
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

  const totalRevenue = transactions.reduce((sum, t) => (t.status === "success" ? sum + t.amount : sum), 0)

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Transactions</h1>
          <p className="text-muted-foreground">View all payment transactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalRevenue)}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{transactions.length}</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {transactions.length > 0
                  ? Math.round((transactions.filter((t) => t.status === "success").length / transactions.length) * 100)
                  : 0}
                %
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Reference</th>
                    <th className="text-left py-4 px-4 font-semibold">Amount</th>
                    <th className="text-left py-4 px-4 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-muted-foreground">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction) => (
                      <tr key={transaction._id} className="border-b border-border hover:bg-muted/30">
                        <td className="py-4 px-4 font-mono text-sm">{transaction.reference}</td>
                        <td className="py-4 px-4 font-medium">{formatCurrency(transaction.amount)}</td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              transaction.status === "success"
                                ? "bg-primary text-primary-foreground"
                                : transaction.status === "pending"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-destructive text-destructive-foreground"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{formatDate(transaction.createdAt)}</td>
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
