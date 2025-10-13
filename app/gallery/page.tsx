"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Exterior",
  "Interior",
  "Floor Plans",
  "Construction",
];

const galleryItems = [
  {
    id: 1,
    type: "image",
    category: "Exterior",
    url: "/luxury-skyscraper-exterior-day-view.jpg",
    title: "Tower Exterior - Day View",
  },
  {
    id: 2,
    type: "image",
    category: "Exterior",
    url: "/luxury-skyscraper-exterior-night-illuminated.jpg",
    title: "Tower Exterior - Night View",
  },
  {
    id: 3,
    type: "image",
    category: "Interior",
    url: "/luxury-office-lobby-with-marble-floors.jpg",
    title: "Grand Lobby",
  },
  {
    id: 4,
    type: "image",
    category: "Interior",
    url: "/modern-office-space-with-city-view.jpg",
    title: "Premium Office Space",
  },
  {
    id: 5,
    type: "image",
    category: "Interior",
    url: "/luxury-retail-mall-interior.jpg",
    title: "Retail Mall Interior",
  },
  {
    id: 6,
    type: "image",
    category: "Floor Plans",
    url: "/architectural-floor-plan-office-layout.jpg",
    title: "Office Floor Plan",
  },
  {
    id: 7,
    type: "image",
    category: "Floor Plans",
    url: "/architectural-floor-plan-retail-layout.jpg",
    title: "Retail Floor Plan",
  },
  {
    id: 8,
    type: "image",
    category: "Construction",
    url: "/construction-foundation.png",
    title: "Foundation Work",
  },
  // {
  //   id: 9,
  //   type: "image",
  //   category: "Exterior",
  //   url: "/skyscraper-aerial-view-cityscape.jpg",
  //   title: "Aerial View",
  // },
  {
    id: 10,
    type: "image",
    category: "Interior",
    url: "/luxury-conference-room-modern-design.jpg",
    title: "Conference Center",
  },
  // {
  //   id: 11,
  //   type: "image",
  //   category: "Interior",
  //   url: "/placeholder.svg?height=600&width=800",
  //   title: "Rooftop Garden",
  // },
  // {
  //   id: 12,
  //   type: "image",
  //   category: "Exterior",
  //   url: "/placeholder.svg?height=600&width=800",
  //   title: "Entrance Plaza",
  // },
  {
    id: 13,
    type: "image",
    category: "Exterior",
    url: "/real001.jpeg",
    title: "Exterior View 1",
  },
  {
    id: 14,
    type: "image",
    category: "Exterior",
    url: "/real002.jpeg",
    title: "Exterior View 2",
  },
  {
    id: 15,
    type: "image",
    category: "Exterior",
    url: "/real003.jpeg",
    title: "Exterior View 3",
  },
  {
    id: 16,
    type: "image",
    category: "Exterior",
    url: "/real004.jpg",
    title: "Exterior View 4",
  },
  {
    id: 17,
    type: "image",
    category: "Exterior",
    url: "/real005.jpeg",
    title: "Exterior View 5",
  },
  {
    id: 18,
    type: "image",
    category: "Exterior",
    url: "/real006.jpeg",
    title: "Exterior View 6",
  },
  {
    id: 19,
    type: "image",
    category: "Exterior",
    url: "/real007.jpeg",
    title: "Exterior View 7",
  },
  {
    id: 20,
    type: "image",
    category: "Exterior",
    url: "/real008.jpeg",
    title: "Exterior View 8",
  },
  {
    id: 21,
    type: "image",
    category: "Exterior",
    url: "/real009.jpeg",
    title: "Exterior View 9",
  },
  {
    id: 22,
    type: "image",
    category: "Exterior",
    url: "/real010.jpeg",
    title: "Exterior View 10",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/real007.jpeg"
            alt="Gallery Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 to-foreground/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-in text-balance">
            Gallery
          </h1>
          <p className="text-xl md:text-2xl text-background/90 max-w-3xl mx-auto leading-relaxed">
            Explore the architectural excellence of Fombina Tower
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary hover:bg-primary/90"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-background">
                      <h3 className="font-serif text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-sm text-background/80">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Virtual Tour
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Take a cinematic journey through Fombina Tower
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                <video
                  controls
                  poster="/placeholder.svg?height=480&width=640"
                  className="w-full h-full"
                >
                  <source src="/videos/exterior-tour.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                <video
                  controls
                  poster="/placeholder.svg?height=480&width=640"
                  className="w-full h-full"
                >
                  <source src="/videos/interior-tour.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
