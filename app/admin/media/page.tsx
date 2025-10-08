"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"

export default function AdminMediaPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
    }
  }, [router])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const token = localStorage.getItem("adminToken")
      if (!token) return

      // Upload logic would go here
      console.log("[v0] Uploading file:", file.name)
      // const response = await uploadMedia(file, token)
    } catch (error) {
      console.error("[v0] Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Media Library</h1>
          <p className="text-muted-foreground">Upload and manage images and videos</p>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Upload className="text-primary" size={40} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2">Upload Media</h3>
              <p className="text-muted-foreground mb-6">Upload images and videos to Cloudinary</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <Button asChild className="bg-primary hover:bg-primary/90" disabled={uploading}>
                <label htmlFor="file-upload" className="cursor-pointer">
                  {uploading ? "Uploading..." : "Choose File"}
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
