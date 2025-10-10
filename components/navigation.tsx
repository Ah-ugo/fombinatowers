/** @format */

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/spaces', label: 'Spaces' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/application', label: 'Application' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/98 backdrop-blur-xl shadow-xl border-b border-border/50'
          : 'bg-foreground/95 backdrop-blur-md'
      }`}
    >
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='flex items-center justify-between h-24'>
          <Link href='/' className='flex items-center space-x-2 group'>
            <div
              className={`font-serif text-3xl font-bold transition-all duration-300 tracking-tight ${
                isScrolled ? 'text-foreground' : 'text-background'
              }`}
            >
              FOMBINA
              <span className='text-primary group-hover:scale-110 inline-block transition-transform'>
                .
              </span>
            </div>
          </Link>

          <div className='hidden md:flex items-center space-x-10'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group tracking-wide ${
                    isActive
                      ? 'text-primary font-semibold'
                      : isScrolled
                      ? 'text-foreground/80'
                      : 'text-background/90'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
            <Button
              asChild
              className='bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 px-6'
            >
              <Link href='/spaces'>Buy Now</Link>
            </Button>
          </div>

          <button
            className={`md:hidden transition-colors ${
              isScrolled ? 'text-foreground' : 'text-background'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className='md:hidden py-8 border-t border-border bg-background/98 backdrop-blur-xl animate-fade-in'>
            <div className='flex flex-col space-y-6'>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium transition-colors px-2 py-2 tracking-wide ${
                      isActive
                        ? 'text-primary font-semibold border-l-2 border-primary pl-4'
                        : 'text-foreground/80 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button
                asChild
                className='bg-primary hover:bg-primary/90 text-primary-foreground w-full shadow-lg'
              >
                <Link href='/spaces' onClick={() => setIsMobileMenuOpen(false)}>
                  Buy Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
