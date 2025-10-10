/** @format */

import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className='bg-foreground text-background'>
      <div className='container mx-auto px-4 lg:px-8 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16'>
          {/* Brand */}
          <div>
            <div className='font-serif text-3xl font-bold mb-6 text-background tracking-tight'>
              FOMBINA<span className='text-primary'>.</span>
            </div>
            <p className='text-background/80 text-sm leading-relaxed mb-8'>
              Abuja's next landmark of luxury. Premium offices, shops, and
              banking halls now selling in Nigeria's most prestigious skyscraper
              development.
            </p>
            <div className='flex space-x-5'>
              <a
                href='#'
                className='text-background/75 hover:text-primary transition-all duration-300 hover:-translate-y-1'
                aria-label='Facebook'
              >
                <Facebook size={22} />
              </a>
              <a
                href='#'
                className='text-background/75 hover:text-primary transition-all duration-300 hover:-translate-y-1'
                aria-label='Instagram'
              >
                <Instagram size={22} />
              </a>
              <a
                href='#'
                className='text-background/75 hover:text-primary transition-all duration-300 hover:-translate-y-1'
                aria-label='Twitter'
              >
                <Twitter size={22} />
              </a>
              <a
                href='#'
                className='text-background/75 hover:text-primary transition-all duration-300 hover:-translate-y-1'
                aria-label='LinkedIn'
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='font-serif text-xl font-semibold mb-6 text-background tracking-tight'>
              Quick Links
            </h3>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/about'
                  className='text-background/80 hover:text-primary transition-colors text-sm tracking-wide'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/spaces'
                  className='text-background/80 hover:text-primary transition-colors text-sm tracking-wide'
                >
                  Available Spaces
                </Link>
              </li>
              <li>
                <Link
                  href='/gallery'
                  className='text-background/80 hover:text-primary transition-colors text-sm tracking-wide'
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href='/timeline'
                  className='text-background/80 hover:text-primary transition-colors text-sm tracking-wide'
                >
                  Construction Timeline
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-background/80 hover:text-primary transition-colors text-sm tracking-wide'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className='font-serif text-xl font-semibold mb-6 text-background tracking-tight'>
              Services
            </h3>
            <ul className='space-y-4'>
              <li className='text-background/80 text-sm tracking-wide'>
                Office Space Sales
              </li>
              <li className='text-background/80 text-sm tracking-wide'>
                Shop & Mall Space Sales
              </li>
              <li className='text-background/80 text-sm tracking-wide'>
                Banking Hall Sales
              </li>
              <li className='text-background/80 text-sm tracking-wide'>
                Investment Opportunities
              </li>
              <li className='text-background/80 text-sm tracking-wide'>
                Corporate Partnerships
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='font-serif text-xl font-semibold mb-6 text-background tracking-tight'>
              Contact
            </h3>
            <ul className='space-y-5'>
              <li className='flex items-start space-x-4'>
                <MapPin size={20} className='text-primary mt-1 flex-shrink-0' />
                <span className='text-background/80 text-sm tracking-wide leading-relaxed'>
                  Plot 1839, Kur Muhd Avenue
                  <br />
                  CBD, FCT Abuja, Nigeria
                </span>
              </li>
              <li className='flex items-center space-x-4'>
                <Phone size={20} className='text-primary flex-shrink-0' />
                <div className='text-background/80 text-sm tracking-wide'>
                  <div>09028132452</div>
                  <div>08163686368</div>
                </div>
              </li>
              <li className='flex items-center space-x-4'>
                <Mail size={20} className='text-primary flex-shrink-0' />
                <span className='text-background/80 text-sm tracking-wide'>
                  info@fombinatower.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-background/20 mt-16 pt-10'>
          <div className='flex flex-col md:flex-row items-center justify-center gap-8 mb-8'>
            <div className='text-center'>
              <div className='text-background/60 text-xs uppercase tracking-wider mb-2'>
                Developed By
              </div>
              <div className='text-background font-semibold'>
                Eagle Track Local Content LTD
              </div>
            </div>
            <div className='hidden md:block w-px h-12 bg-background/20' />
            <div className='text-center'>
              <div className='text-background/60 text-xs uppercase tracking-wider mb-2'>
                Marketed By
              </div>
              <div className='text-background font-semibold'>
                Uloaku Ekwuribe & Partners
              </div>
            </div>
          </div>
          <p className='text-background/70 text-sm tracking-wide text-center'>
            © {new Date().getFullYear()} Fombina Tower. All rights reserved.
            Developed with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
