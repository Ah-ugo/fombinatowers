import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    title: "Project Conception & Design",
    date: "Q1 2023",
    status: "completed",
    description:
      "Initial concept development, architectural design, and feasibility studies completed with international partners.",
  },
  {
    id: 2,
    title: "Regulatory Approvals",
    date: "Q3 2023",
    status: "completed",
    description:
      "All necessary permits, environmental clearances, and government approvals secured.",
  },
  {
    id: 3,
    title: "Site Preparation",
    date: "Q4 2023",
    status: "completed",
    description:
      "Land clearing, soil testing, and site preparation completed ahead of schedule.",
  },
  {
    id: 4,
    title: "Foundation & Groundbreaking",
    date: "Q1 2024",
    status: "completed",
    description:
      "Official groundbreaking ceremony and foundation work commenced with advanced engineering.",
  },
  {
    id: 5,
    title: "Structural Framework",
    date: "Q2 2024 - Q4 2024",
    status: "in-progress",
    description:
      "Core structure and steel framework construction currently underway with 40% completion.",
  },
  {
    id: 6,
    title: "Facade & Exterior",
    date: "Q1 2025 - Q3 2025",
    status: "upcoming",
    description:
      "Installation of premium glass facade and exterior finishing with sustainable materials.",
  },
  {
    id: 7,
    title: "Interior Build-Out",
    date: "Q4 2025 - Q2 2026",
    status: "upcoming",
    description:
      "Interior construction, MEP systems, and luxury finishes installation.",
  },
  {
    id: 8,
    title: "Final Inspections & Handover",
    date: "Q3 2026",
    status: "upcoming",
    description: "Final inspections, certifications, and handover to tenants.",
  },
  {
    id: 9,
    title: "Grand Opening",
    date: "Q4 2026",
    status: "upcoming",
    description:
      "Official grand opening ceremony and commencement of operations.",
  },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/real005.jpeg"
            alt="Timeline Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 to-foreground/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-in text-balance">
            Construction Timeline
          </h1>
          <p className="text-xl md:text-2xl text-background/90 max-w-3xl mx-auto leading-relaxed">
            Track our journey from vision to reality
          </p>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">40%</div>
              <div className="text-lg opacity-90">Overall Completion</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Q4 2026</div>
              <div className="text-lg opacity-90">Expected Completion</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">On Track</div>
              <div className="text-lg opacity-90">Project Status</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />

              {/* Timeline Events */}
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`relative ${
                      index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:ml-auto"
                    }`}
                  >
                    <div
                      className={`flex items-start ${
                        index % 2 === 0 ? "" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Icon */}
                      <div className="absolute left-8 -translate-x-1/2 md:left-1/2">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-border">
                          {event.status === "completed" && (
                            <CheckCircle2 className="text-primary" size={28} />
                          )}
                          {event.status === "in-progress" && (
                            <Clock
                              className="text-primary animate-pulse"
                              size={28}
                            />
                          )}
                          {event.status === "upcoming" && (
                            <Circle
                              className="text-muted-foreground"
                              size={28}
                            />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`ml-24 md:ml-0 ${
                          index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                        } bg-card p-8 rounded-lg shadow-lg border border-border`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              event.status === "completed"
                                ? "bg-primary/10 text-primary"
                                : event.status === "in-progress"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {event.status === "completed"
                              ? "Completed"
                              : event.status === "in-progress"
                              ? "In Progress"
                              : "Upcoming"}
                          </span>
                          <span className="text-sm text-muted-foreground font-medium">
                            {event.date}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold mb-3">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Construction Updates */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Latest Construction Updates
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Follow our progress with regular photo and video updates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: "/placeholder.svg?height=400&width=600",
                title: "Foundation Complete",
                date: "March 2024",
              },
              {
                image: "/placeholder.svg?height=400&width=600",
                title: "Steel Framework Rising",
                date: "June 2024",
              },
              {
                image: "/placeholder.svg?height=400&width=600",
                title: "40% Completion Milestone",
                date: "October 2024",
              },
            ].map((update, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={update.image || "/placeholder.svg"}
                    alt={update.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="bg-card p-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {update.date}
                  </div>
                  <h3 className="font-serif text-xl font-semibold">
                    {update.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
