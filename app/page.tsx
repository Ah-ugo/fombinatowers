/** @format */

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  Shield,
  Award,
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/real007.jpeg"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in text-balance drop-shadow-2xl">
            Fombina Tower
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 animate-fade-in text-balance drop-shadow-lg">
            Abuja's Next Landmark of Luxury
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto animate-fade-in leading-relaxed drop-shadow-lg">
            Premium offices, shops, and banking halls now selling in Nigeria's
            most prestigious skyscraper development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 shadow-2xl"
            >
              <Link href="/spaces">Buy Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/95 backdrop-blur-sm border-white text-foreground hover:bg-white hover:text-foreground text-lg px-8 shadow-2xl"
            >
              <Link href="/about">Explore the Vision</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                A Vision of Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Fombina Tower represents the pinnacle of modern architecture and
                sustainable development in West Africa. Rising majestically in
                Abuja's Central Business District, this iconic structure will
                redefine luxury commercial real estate.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With world-class amenities, cutting-edge technology, and
                unparalleled design, Fombina Tower offers an exclusive
                opportunity for forward-thinking businesses and investors to
                secure their place in history.
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="shadow-md hover:shadow-lg transition-shadow bg-transparent"
              >
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/real005.jpeg"
                alt="Fombina Tower Render"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Buy Now Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Why Buy Now?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Secure your space at exclusive launch pricing and enjoy
              unparalleled benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Best Pricing",
                description:
                  "Lock in launch rates up to 40% below future market value",
              },
              {
                icon: Building2,
                title: "Prime Location",
                description:
                  "Central Business District with unmatched accessibility",
              },
              {
                icon: Shield,
                title: "Secure Investment",
                description:
                  "Backed by proven developers with international standards",
              },
              {
                icon: Award,
                title: "Premium Amenities",
                description:
                  "World-class facilities and cutting-edge technology",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 bg-card"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <benefit.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-4 text-card-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Brochure Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Download Our Brochures
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get detailed information about Fombina Tower's offerings, floor
              plans, and investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 bg-card">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <FileText className="text-primary" size={32} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4 text-card-foreground">
                  Property Brochure
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Explore detailed specifications, amenities, and floor plans of
                  Fombina Tower
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                >
                  <a href="/bro1.pdf" download="Fombina-Tower-Brochure-1.pdf">
                    <Download className="mr-2" size={20} />
                    Download Brochure 1
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 bg-card">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <FileText className="text-primary" size={32} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4 text-card-foreground">
                  Investment Guide
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Discover pricing options, payment plans, and investment
                  benefits
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                >
                  <a href="/bro2.pdf" download="Fombina-Tower-Brochure-2.pdf">
                    <Download className="mr-2" size={20} />
                    Download Brochure 2
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/luxury-office-interior-with-city-view.jpg"
                alt="Premium Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
                Unmatched Luxury & Functionality
              </h2>
              <div className="space-y-6">
                {[
                  "24/7 security with advanced surveillance systems",
                  "High-speed elevators and smart building technology",
                  "Premium finishes and customizable interiors",
                  "Dedicated parking with EV charging stations",
                  "Rooftop gardens and recreational facilities",
                  "Conference centers and business lounges",
                  "Sustainable design with LEED certification",
                  "Fiber optic connectivity and backup power",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle2
                      className="text-primary flex-shrink-0 mt-1"
                      size={24}
                    />
                    <p className="text-lg text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance text-background">
            Ready to Secure Your Space?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-background/80">
            Join the elite businesses and investors who are shaping Abuja's
            skyline
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 shadow-2xl"
            >
              <Link href="/spaces">View Available Spaces</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-background text-background hover:bg-background hover:text-foreground text-lg px-8 bg-transparent shadow-2xl"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
