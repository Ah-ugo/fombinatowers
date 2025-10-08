import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Brand */}
          <div>
            <div className="font-serif text-3xl font-bold mb-6 text-background tracking-tight">
              FOMBINA<span className="text-primary">.</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed mb-8">
              Abuja's next landmark of luxury. Pre-lease premium office and mall spaces in Nigeria's most prestigious
              skyscraper development.
            </p>
            <div className="flex space-x-5">
              <a
                href="#"
                className="text-background/75 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#"
                className="text-background/75 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#"
                className="text-background/75 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter size={22} />
              </a>
              <a
                href="#"
                className="text-background/75 hover:text-primary transition-all duration-300 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-background tracking-tight">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-background/80 hover:text-primary transition-colors text-sm tracking-wide"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/spaces"
                  className="text-background/80 hover:text-primary transition-colors text-sm tracking-wide"
                >
                  Available Spaces
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-background/80 hover:text-primary transition-colors text-sm tracking-wide"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/timeline"
                  className="text-background/80 hover:text-primary transition-colors text-sm tracking-wide"
                >
                  Construction Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-background/80 hover:text-primary transition-colors text-sm tracking-wide"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-background tracking-tight">Services</h3>
            <ul className="space-y-4">
              <li className="text-background/80 text-sm tracking-wide">Office Space Leasing</li>
              <li className="text-background/80 text-sm tracking-wide">Mall Space Leasing</li>
              <li className="text-background/80 text-sm tracking-wide">Event Hall Booking</li>
              <li className="text-background/80 text-sm tracking-wide">Investment Opportunities</li>
              <li className="text-background/80 text-sm tracking-wide">Corporate Partnerships</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-background tracking-tight">Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-background/80 text-sm tracking-wide leading-relaxed">
                  Central Business District, Abuja, Nigeria
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-background/80 text-sm tracking-wide">+234 800 123 4567</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-background/80 text-sm tracking-wide">info@fombinatower.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-16 pt-10 text-center">
          <p className="text-background/70 text-sm tracking-wide">
            © {new Date().getFullYear()} Fombina Tower. All rights reserved. Developed with excellence.
          </p>
        </div>
      </div>
    </footer>
  )
}
