"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { fetchSpaces } from "@/lib/api"
import type { Space } from "@/lib/types"

export default function AdminSpacesPage() {
  const router = useRouter()
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    loadSpaces()
  }, [router])

  const loadSpaces = async () => {
    try {
      const data = await fetchSpaces()
      setSpaces(data)
    } catch (error) {
      console.error("[v0] Failed to load spaces:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2">Manage Spaces</h1>
            <p className="text-muted-foreground">Add, edit, or remove available spaces</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2" size={20} />
            Add New Space
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <Card key={space._id} className="border-none shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                <img
                  src={space.imageUrl || "/placeholder.svg"}
                  alt={space.name}
                  className="w-full h-full object-cover"
                />
                {space.available ? (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">Available</Badge>
                ) : (
                  <Badge className="absolute top-4 right-4 bg-muted text-muted-foreground">Reserved</Badge>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2">{space.name}</h3>
                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div>Type: {space.type}</div>
                  <div>Floor: {space.floor}</div>
                  <div>Size: {space.size} sqm</div>
                  <div className="font-semibold text-foreground">{formatPrice(space.price)}/month</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
