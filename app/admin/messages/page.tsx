"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    // Load messages logic would go here
    setLoading(false)
  }, [router])

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
          <h1 className="font-serif text-4xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">View contact form submissions</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Contact Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">No messages yet</div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
