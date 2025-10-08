"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Maximize2, MapPin, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { fetchSpace } from "@/lib/api"
import type { Space } from "@/lib/types"
import { BookingModal } from "@/components/booking-modal"

export default function SpaceDetailPage() {
  const params = useParams()
  const [space, setSpace] = useState<Space | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadSpace(params.id as string)
    }
  }, [params.id])

  const loadSpace = async (id: string) => {
    try {
      const data = await fetchSpace(id)
      setSpace(data)
    } catch (error) {
      console.error("[v0] Failed to load space:", error)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Space not found</h1>
          <Button asChild>
            <Link href="/spaces">Back to Spaces</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img src={space.imageUrl || "/placeholder.svg"} alt={space.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Button asChild variant="ghost" className="text-background hover:text-background/80 mb-4">
              <Link href="/spaces">
                <ArrowLeft className="mr-2" size={20} />
                Back to Spaces
              </Link>
            </Button>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-background mb-4 text-balance">
              {space.name}
            </h1>
            {space.available ? (
              <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">Available Now</Badge>
            ) : (
              <Badge className="bg-muted text-muted-foreground text-lg px-4 py-2">Reserved</Badge>
            )}
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Description</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{space.description}</p>
              </div>

              <div className="mb-12">
                <h2 className="font-serif text-3xl font-bold mb-6">Space Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Building2 className="mx-auto mb-4 text-primary" size={32} />
                      <div className="text-sm text-muted-foreground mb-1">Type</div>
                      <div className="text-lg font-semibold capitalize">{space.type.replace("-", " ")}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6 text-center">
                      <MapPin className="mx-auto mb-4 text-primary" size={32} />
                      <div className="text-sm text-muted-foreground mb-1">Floor</div>
                      <div className="text-lg font-semibold">Floor {space.floor}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Maximize2 className="mx-auto mb-4 text-primary" size={32} />
                      <div className="text-sm text-muted-foreground mb-1">Size</div>
                      <div className="text-lg font-semibold">{space.size} sqm</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {space.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="text-primary flex-shrink-0" size={20} />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-2xl sticky top-24">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Monthly Rate</div>
                    <div className="text-4xl font-bold text-foreground mb-1">{formatPrice(space.price)}</div>
                    <div className="text-sm text-muted-foreground">Exclusive pre-construction rate</div>
                  </div>

                  <div className="border-t border-border pt-6 mb-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Space Type</span>
                        <span className="font-medium capitalize">{space.type.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Floor Level</span>
                        <span className="font-medium">Floor {space.floor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Area</span>
                        <span className="font-medium">{space.size} sqm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Availability</span>
                        <span className={`font-medium ${space.available ? "text-primary" : "text-muted-foreground"}`}>
                          {space.available ? "Available" : "Reserved"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                    disabled={!space.available}
                    onClick={() => setShowBookingModal(true)}
                  >
                    {space.available ? "Book This Space" : "Not Available"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Secure your space with a refundable deposit
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && space && <BookingModal space={space} onClose={() => setShowBookingModal(false)} />}

      <Footer />
    </div>
  )
}
