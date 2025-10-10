/** @format */

'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { CheckCircle2, Download, Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { verifyPayment } from '@/lib/api';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [verifying, setVerifying] = useState(true);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    if (reference) {
      verifyBooking(reference);
    }
  }, [reference]);

  const verifyBooking = async (ref: string) => {
    try {
      const data = await verifyPayment(ref);
      setBookingDetails(data);
    } catch (error) {
      console.error('[v0] Payment verification failed:', error);
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4' />
          <p className='text-lg text-muted-foreground'>
            Verifying your payment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <Navigation />

      <section className='py-24 bg-background min-h-[80vh] flex items-center'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='max-w-3xl mx-auto'>
            <Card className='border-none shadow-2xl'>
              <CardContent className='p-12 text-center'>
                <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6'>
                  <CheckCircle2 className='text-primary' size={48} />
                </div>

                <h1 className='font-serif text-4xl md:text-5xl font-bold text-foreground mb-4'>
                  Purchase Confirmed!
                </h1>

                <p className='text-lg text-muted-foreground mb-8 leading-relaxed'>
                  Thank you for choosing Fombina Tower. Your space purchase has
                  been successfully confirmed and a confirmation email has been
                  sent to your inbox.
                </p>

                {bookingDetails && (
                  <div className='bg-muted/50 p-6 rounded-lg mb-8 text-left'>
                    <h3 className='font-semibold mb-4'>Purchase Details</h3>
                    <div className='space-y-3 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          Reference Number
                        </span>
                        <span className='font-medium'>
                          {bookingDetails.reference}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Space</span>
                        <span className='font-medium'>
                          {bookingDetails.spaceName}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>
                          Amount Paid
                        </span>
                        <span className='font-medium'>
                          {new Intl.NumberFormat('en-NG', {
                            style: 'currency',
                            currency: 'NGN',
                            minimumFractionDigits: 0,
                          }).format(bookingDetails.amount)}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Status</span>
                        <span className='font-medium text-primary'>
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className='space-y-4 mb-8'>
                  <div className='flex items-start space-x-3 text-left'>
                    <Mail
                      className='text-primary flex-shrink-0 mt-1'
                      size={20}
                    />
                    <div>
                      <h4 className='font-semibold mb-1'>Check Your Email</h4>
                      <p className='text-sm text-muted-foreground'>
                        We've sent a detailed confirmation with next steps to
                        your email address.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start space-x-3 text-left'>
                    <Download
                      className='text-primary flex-shrink-0 mt-1'
                      size={20}
                    />
                    <div>
                      <h4 className='font-semibold mb-1'>Download Receipt</h4>
                      <p className='text-sm text-muted-foreground'>
                        Your payment receipt is available for download in the
                        confirmation email.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Button
                    asChild
                    size='lg'
                    className='bg-primary hover:bg-primary/90'
                  >
                    <Link href='/'>Return Home</Link>
                  </Button>
                  <Button asChild size='lg' variant='outline'>
                    <Link href='/spaces'>Browse More Spaces</Link>
                  </Button>
                </div>

                <p className='text-sm text-muted-foreground mt-8'>
                  Our team will contact you within 24 hours to discuss the next
                  steps.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
