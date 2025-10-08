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
import { userLogin } from '@/lib/api';
import { LogIn, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await userLogin(formData);
      localStorage.setItem('userToken', response.token);

      // Redirect based on role
      if (response.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/spaces');
      }
    } catch (err) {
      console.error('[v0] Login error:', err);
      setError('Invalid email or password');
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
            <LogIn className='text-primary' size={32} />
          </div>
          <CardTitle className='font-serif text-3xl'>Welcome Back</CardTitle>
          <CardDescription className='text-base'>
            Sign in to your Fombina Tower account
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
                value={formData.email}
                onChange={handleChange}
                placeholder='john@example.com'
                className='mt-2'
              />
            </div>

            <div>
              <div className='flex items-center justify-between mb-2'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='/forgot-password'
                  className='text-xs text-primary hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                name='password'
                type='password'
                required
                value={formData.password}
                onChange={handleChange}
                placeholder='••••••••'
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
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className='text-center text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <Link
                href='/register'
                className='text-primary hover:underline font-medium'
              >
                Create one
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
