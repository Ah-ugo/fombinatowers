/** @format */

'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Space } from '@/lib/types';
import { createBooking } from '@/lib/api';
import { X } from 'lucide-react';

interface BookingModalProps {
  space: Space;
  onClose: () => void;
}

export function BookingModal({ space, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    companyName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const bookingData = {
        spaceId: space._id,
        ...formData,
      };

      const response = await createBooking(bookingData);

      // Redirect to Paystack payment URL
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (err) {
      console.error('[v0] Booking error:', err);
      setError('Failed to create booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-start justify-between'>
            <div>
              <DialogTitle className='font-serif text-3xl mb-2'>
                Purchase Your Space
              </DialogTitle>
              <DialogDescription className='text-base'>
                Complete the form below to proceed with purchasing {space.name}
              </DialogDescription>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              className='flex-shrink-0'
            >
              <X size={20} />
            </Button>
          </div>
        </DialogHeader>

        <div className='border-t border-b border-border py-6 my-6'>
          <div className='flex justify-between items-start mb-4'>
            <div>
              <h3 className='font-serif text-xl font-semibold'>{space.name}</h3>
              <p className='text-sm text-muted-foreground'>
                Floor {space.floor} • {space.size} sqm
              </p>
            </div>
            <div className='text-right'>
              <div className='text-2xl font-bold'>
                {formatPrice(space.price)}
              </div>
              <div className='text-xs text-muted-foreground'>per month</div>
            </div>
          </div>
          <p className='text-sm text-muted-foreground'>
            A deposit of {formatPrice(space.price * 0.1)} is required to secure
            your purchase.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <Label htmlFor='userName'>Full Name *</Label>
              <Input
                id='userName'
                name='userName'
                type='text'
                required
                value={formData.userName}
                onChange={handleChange}
                placeholder='John Doe'
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='userEmail'>Email Address *</Label>
              <Input
                id='userEmail'
                name='userEmail'
                type='email'
                required
                value={formData.userEmail}
                onChange={handleChange}
                placeholder='john@example.com'
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='userPhone'>Phone Number *</Label>
              <Input
                id='userPhone'
                name='userPhone'
                type='tel'
                required
                value={formData.userPhone}
                onChange={handleChange}
                placeholder='+234 800 123 4567'
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='companyName'>Company Name (Optional)</Label>
              <Input
                id='companyName'
                name='companyName'
                type='text'
                value={formData.companyName}
                onChange={handleChange}
                placeholder='Your Company Ltd'
                className='mt-2'
              />
            </div>
          </div>

          {error && (
            <div className='p-4 bg-destructive/10 text-destructive rounded-lg text-sm'>
              {error}
            </div>
          )}

          <div className='bg-muted/50 p-4 rounded-lg'>
            <h4 className='font-semibold mb-2'>Payment Summary</h4>
            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Total Price</span>
                <span className='font-medium'>{formatPrice(space.price)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>
                  Initial Deposit (10%)
                </span>
                <span className='font-medium'>
                  {formatPrice(space.price * 0.1)}
                </span>
              </div>
              <div className='border-t border-border pt-2 mt-2 flex justify-between'>
                <span className='font-semibold'>Total Due Now</span>
                <span className='font-bold text-lg'>
                  {formatPrice(space.price * 0.1)}
                </span>
              </div>
            </div>
          </div>

          <div className='flex gap-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              className='flex-1 bg-transparent'
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1 bg-primary hover:bg-primary/90'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </div>

          <p className='text-xs text-muted-foreground text-center'>
            By proceeding, you agree to our terms and conditions. Your payment
            will be processed securely via Paystack.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
