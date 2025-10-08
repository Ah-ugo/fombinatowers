/** @format */

'use client';

import type React from 'react';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { confirmPasswordReset } from '@/lib/api';
import { Lock, CheckCircle } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Invalid reset link');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsSubmitting(false);
      return;
    }

    try {
      await confirmPasswordReset(token, formData.password);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      console.error('[v0] Password reset error:', err);
      setError(
        err.message || 'Failed to reset password. The link may have expired.'
      );
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
              Password Reset Successful
            </CardTitle>
            <CardDescription className='text-base'>
              Your password has been successfully reset. Redirecting to login...
            </CardDescription>
          </CardHeader>
          <CardContent className='text-center'>
            <Link href='/login'>
              <Button className='w-full bg-primary hover:bg-primary/90'>
                Go to Login
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
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4'>
            <Lock className='text-primary' size={32} />
          </div>
          <CardTitle className='font-serif text-3xl'>Reset Password</CardTitle>
          <CardDescription className='text-base'>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <Label htmlFor='password'>New Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                value={formData.password}
                onChange={handleChange}
                placeholder='••••••••'
                className='mt-2'
              />
              <p className='text-xs text-muted-foreground mt-1'>
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <Label htmlFor='confirmPassword'>Confirm New Password</Label>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='••••••••'
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
              disabled={isSubmitting || !token}
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </Button>

            <p className='text-center text-sm text-muted-foreground'>
              <Link href='/login' className='text-primary hover:underline'>
                Back to Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center'>
          Loading...
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
