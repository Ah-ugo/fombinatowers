/** @format */

'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Building2, Maximize2, MapPin, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchSpaces } from '@/lib/api';
import type { Space } from '@/lib/types';

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    'all' | 'office' | 'mall' | 'event-hall'
  >('all');

  useEffect(() => {
    loadSpaces();
  }, []);

  const loadSpaces = async () => {
    try {
      const data = await fetchSpaces();
      setSpaces(data);
    } catch (error) {
      console.error('[v0] Failed to load spaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSpaces =
    filter === 'all' ? spaces : spaces.filter((space) => space.type === filter);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className='min-h-screen'>
      <Navigation />

      <section className='relative h-[50vh] flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='/modern-office-space-with-city-view.jpg'
            alt='Spaces Hero'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-foreground/75 to-foreground/60' />
        </div>
        <div className='relative z-10 container mx-auto px-4 text-center'>
          <h1 className='font-serif text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in text-balance drop-shadow-2xl'>
            Available Spaces
          </h1>
          <p className='text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg'>
            Discover your perfect space in Abuja's most prestigious address
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className='py-12 bg-background border-b border-border'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={
                filter === 'all'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                  : ''
              }
            >
              All Spaces
            </Button>
            <Button
              variant={filter === 'office' ? 'default' : 'outline'}
              onClick={() => setFilter('office')}
              className={
                filter === 'office'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                  : ''
              }
            >
              Office Spaces
            </Button>
            <Button
              variant={filter === 'mall' ? 'default' : 'outline'}
              onClick={() => setFilter('mall')}
              className={
                filter === 'mall'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                  : ''
              }
            >
              Mall Spaces
            </Button>
            <Button
              variant={filter === 'event-hall' ? 'default' : 'outline'}
              onClick={() => setFilter('event-hall')}
              className={
                filter === 'event-hall'
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                  : ''
              }
            >
              Event Halls
            </Button>
          </div>
        </div>
      </section>

      {/* Spaces Grid */}
      <section className='py-24 bg-background'>
        <div className='container mx-auto px-4 lg:px-8'>
          {loading ? (
            <div className='text-center py-16'>
              <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary' />
              <p className='mt-4 text-muted-foreground'>Loading spaces...</p>
            </div>
          ) : filteredSpaces.length === 0 ? (
            <div className='text-center py-16'>
              <p className='text-xl text-muted-foreground'>
                No spaces available in this category.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredSpaces.map((space) => (
                <Card
                  key={space._id}
                  className='group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 duration-300 bg-card'
                >
                  <div className='relative aspect-[4/3] overflow-hidden'>
                    <img
                      src={
                        space.imageUrl ||
                        '/placeholder.svg?height=400&width=600&query=luxury office space'
                      }
                      alt={space.name}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                    {space.available ? (
                      <Badge className='absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg'>
                        Available
                      </Badge>
                    ) : (
                      <Badge className='absolute top-4 right-4 bg-muted text-muted-foreground shadow-lg'>
                        Reserved
                      </Badge>
                    )}
                  </div>
                  <CardContent className='p-6'>
                    <div className='mb-4'>
                      <h3 className='font-serif text-2xl font-semibold mb-2 text-card-foreground'>
                        {space.name}
                      </h3>
                      <p className='text-muted-foreground line-clamp-2'>
                        {space.description}
                      </p>
                    </div>

                    <div className='space-y-3 mb-6'>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <Building2 size={16} className='mr-2 text-primary' />
                        <span className='capitalize'>
                          {space.type.replace('-', ' ')}
                        </span>
                      </div>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <MapPin size={16} className='mr-2 text-primary' />
                        <span>Floor {space.floor}</span>
                      </div>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <Maximize2 size={16} className='mr-2 text-primary' />
                        <span>{space.size} sqm</span>
                      </div>
                    </div>

                    <div className='border-t border-border pt-4 mb-6'>
                      <div className='text-sm text-muted-foreground mb-1'>
                        Price
                      </div>
                      <div className='text-3xl font-bold text-foreground'>
                        {formatPrice(space.price)}
                      </div>
                    </div>

                    <Button
                      asChild
                      className='w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md'
                      disabled={!space.available}
                    >
                      <Link href={`/spaces/${space._id}`}>
                        {space.available ? 'View Details & Buy' : 'Sold Out'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-24 bg-muted/50'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance'>
              What's Included
            </h2>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
              Every space comes with premium amenities and services
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {[
              '24/7 Security & Surveillance',
              'High-Speed Internet',
              'Climate Control',
              'Dedicated Parking',
              'Maintenance Services',
              'Smart Building Technology',
              'Conference Room Access',
              'Rooftop Garden Access',
              'Professional Reception',
            ].map((benefit, index) => (
              <div key={index} className='flex items-center space-x-3'>
                <CheckCircle2
                  className='text-primary flex-shrink-0'
                  size={24}
                />
                <span className='text-foreground'>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
