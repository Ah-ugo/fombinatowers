/** @format */

'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { requestPasswordReset } from '@/lib/api';
import { KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await requestPasswordReset(email);
      setIsSuccess(true);
    } catch (err) {
      console.error('[v0] Password reset request error:', err);
      setError('Failed to send reset email. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-muted/30 p-4'>
        <Card className='w-full max-w-md border-none shadow-2xl'>
          <CardHeader className='text-center pb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mx-auto mb-4'>
              <CheckCircle className='text-green-600' size={32} />
            </div>
            <CardTitle className='font-serif text-3xl'>
              Check Your Email
            </CardTitle>
            <CardDescription className='text-base'>
              We've sent password reset instructions to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className='text-center space-y-4'>
            <p className='text-sm text-muted-foreground'>
              If you don't see the email, check your spam folder or try again.
            </p>
            <Link href='/login'>
              <Button className='w-full bg-primary hover:bg-primary/90'>
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted/30 p-4'>
      <Card className='w-full max-w-md border-none shadow-2xl'>
        <CardHeader className='text-center pb-8'>
          <Link
            href='/login'
            className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors'
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4'>
            <KeyRound className='text-primary' size={32} />
          </div>
          <CardTitle className='font-serif text-3xl'>
            Forgot Password?
          </CardTitle>
          <CardDescription className='text-base'>
            Enter your email and we'll send you instructions to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                id='email'
                name='email'
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='john@example.com'
                className='mt-2'
              />
            </div>

            {error && (
              <div className='p-4 bg-destructive/10 text-destructive rounded-lg text-sm'>
                {error}
              </div>
            )}

            <Button
              type='submit'
              className='w-full bg-primary hover:bg-primary/90'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
