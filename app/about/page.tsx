import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Target, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/modern-architectural-blueprint-and-building.jpg"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 to-foreground/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in text-balance drop-shadow-2xl">
            Our Vision
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Building Africa's future, one landmark at a time
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8 text-balance">
              The Fombina Tower Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Fombina Tower is more than just a building—it's a testament to Nigeria's growing economic power and
                architectural ambition. Conceived by visionary developers and designed by award-winning international
                architects, this project represents the convergence of luxury, sustainability, and innovation.
              </p>
              <p>
                Located in the heart of Abuja's Central Business District, Fombina Tower will rise as a beacon of
                progress, offering premium office and retail spaces that meet the highest international standards. The
                tower's design draws inspiration from traditional African motifs while embracing cutting-edge modern
                architecture.
              </p>
              <p>
                Our commitment extends beyond construction. We're creating a thriving ecosystem where businesses
                flourish, communities connect, and sustainable practices set new benchmarks for commercial development
                in West Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Experience the Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Watch our architectural walkthrough and see the future of Abuja's skyline
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <video controls poster="/luxury-skyscraper-architectural-render.jpg" className="w-full h-full">
                <source src="/videos/tower-walkthrough.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "Sustainability",
                description:
                  "LEED-certified design with renewable energy, water conservation, and eco-friendly materials",
              },
              {
                icon: Users,
                title: "Community",
                description: "Creating spaces that foster collaboration, innovation, and meaningful connections",
              },
              {
                icon: Target,
                title: "Excellence",
                description: "Uncompromising quality in design, construction, and service delivery",
              },
              {
                icon: Globe,
                title: "Innovation",
                description: "Embracing smart technology and forward-thinking solutions for modern businesses",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 bg-card"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <value.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-4 text-card-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/professional-development-team-in-modern-office.jpg"
                alt="Development Team"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                World-Class Development Team
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Fombina Tower is developed by a consortium of Nigeria's leading real estate developers in partnership
                with international architectural firms renowned for their iconic skyscraper projects.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our team brings together decades of experience in luxury commercial development, sustainable
                construction, and property management. We've successfully delivered landmark projects across Africa,
                Europe, and the Middle East.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">15</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">$2B+</div>
                  <div className="text-sm text-muted-foreground">Assets Under Management</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
