/** @format */

'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { registerUser } from '@/lib/api';
import { UserPlus, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
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
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      localStorage.setItem('userToken', response.token);
      router.push('/spaces');
    } catch (err: any) {
      console.error('[v0] Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-muted/30 p-4'>
      <Card className='w-full max-w-md border-none shadow-2xl'>
        <CardHeader className='text-center pb-8'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors'
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4'>
            <UserPlus className='text-primary' size={32} />
          </div>
          <CardTitle className='font-serif text-3xl'>Create Account</CardTitle>
          <CardDescription className='text-base'>
            Join Fombina Tower's exclusive community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                name='name'
                type='text'
                required
                value={formData.name}
                onChange={handleChange}
                placeholder='John Doe'
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='email'>Email Address</Label>
              <Input
                id='email'
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleChange}
                placeholder='john@example.com'
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                name='phone'
                type='tel'
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder='+234 800 000 0000'
                className='mt-2'
              />
            </div>

            <div>
              <Label htmlFor='password'>Password</Label>
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
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>

            <p className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='text-primary hover:underline font-medium'
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
