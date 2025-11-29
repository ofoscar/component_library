'use client';

import React, { useState } from 'react';
import AppBar from '../../AppBar';
import Button from '../../Button';
import Card from '../../Card';
import Footer from '../../Footer';
import Input from '../../Input';

export default function CardShowcase() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setSubmitStatus('success');
        setTimeout(() => {
          setSubmitStatus('idle');
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      }, 500);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setSubmitStatus('idle');
  };

  return (
    <div className='flex flex-col zmin-h-screen bg-[#0A0A0A]'>
      <AppBar />
      <div className='max-w-7xl mx-auto p-6 lg:p-8 w-full'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white mb-4'>Card</h1>
          <p className='text-gray-400 text-lg'>
            Displays a card with header, body content, and optional action
            buttons
          </p>
        </div>

        <div className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-300 mb-4'>Usage</h2>
          <div className='bg-[#161A1D] rounded-lg p-6'>
            <code className='text-sm text-gray-300'>
              import &#123; Card &#125; from
              &quot;./app/components/Card.tsx&quot;
            </code>
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-300 mb-4'>Examples</h2>
          <p className='text-gray-400 text-lg mb-6'>
            Demonstrating Card with form content and action buttons
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Contact Form Card */}
          <Card
            title='Contact Us'
            subtitle="Fill out the form below and we'll get back to you"
            variant='elevated'
            padding='lg'
          >
            <div className='space-y-4'>
              {/* Form Fields */}
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Name
                </label>
                <Input
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Enter your name'
                  fullWidth
                />
                {errors.name && (
                  <p className='text-red-400 text-sm mt-1'>{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Email
                </label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='your.email@example.com'
                  fullWidth
                />
                {errors.email && (
                  <p className='text-red-400 text-sm mt-1'>{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Enter your message'
                  rows={4}
                  className='w-full px-4 py-2 bg-[#1A1A1A] border border-[#464646] rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                />
                {errors.message && (
                  <p className='text-red-400 text-sm mt-1'>{errors.message}</p>
                )}
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className='bg-green-500/20 border border-green-500/50 rounded-md p-3'>
                  <p className='text-green-400 text-sm'>
                    ✓ Message sent successfully!
                  </p>
                </div>
              )}

              {/* Footer Actions */}
              <div className='flex gap-3 pt-4 border-t border-[#464646]'>
                <Button
                  variant='outline'
                  size='md'
                  onClick={handleReset}
                  className='flex-1'
                >
                  Reset
                </Button>
                <Button
                  variant='primary'
                  size='md'
                  onClick={handleSubmit}
                  className='flex-1'
                  disabled={submitStatus === 'success'}
                >
                  {submitStatus === 'success' ? 'Sent!' : 'Submit'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Newsletter Signup Card */}
          <Card
            title='Subscribe to Newsletter'
            subtitle='Get weekly updates and exclusive content'
            variant='outlined'
            padding='lg'
          >
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='newsletter-name'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Full Name
                </label>
                <Input id='newsletter-name' placeholder='John Doe' fullWidth />
              </div>

              <div>
                <label
                  htmlFor='newsletter-email'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Email Address
                </label>
                <Input
                  id='newsletter-email'
                  type='email'
                  placeholder='john@example.com'
                  fullWidth
                />
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Interests
                </label>
                <div className='space-y-2'>
                  {['Development', 'Design', 'Marketing', 'Business'].map(
                    (interest) => (
                      <label
                        key={interest}
                        className='flex items-center cursor-pointer'
                      >
                        <input
                          type='checkbox'
                          className='w-4 h-4 bg-[#1A1A1A] border border-[#464646] rounded text-blue-600 focus:ring-2 focus:ring-blue-500'
                        />
                        <span className='ml-2 text-sm text-gray-300'>
                          {interest}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className='flex gap-3 pt-4 border-t border-[#464646]'>
                <Button variant='primary' size='lg' fullWidth>
                  Subscribe Now
                </Button>
              </div>
            </div>
          </Card>

          {/* Login Card */}
          <Card
            title='Login'
            subtitle='Welcome back! Please login to your account'
            variant='elevated'
            padding='md'
          >
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='login-email'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Email
                </label>
                <Input
                  id='login-email'
                  type='email'
                  placeholder='your.email@example.com'
                  fullWidth
                />
              </div>

              <div>
                <label
                  htmlFor='login-password'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Password
                </label>
                <Input
                  id='login-password'
                  type='password'
                  placeholder='Enter your password'
                  fullWidth
                />
              </div>

              <div className='flex items-center justify-between'>
                <label className='flex items-center cursor-pointer'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 bg-[#1A1A1A] border border-[#464646] rounded text-blue-600 focus:ring-2 focus:ring-blue-500'
                  />
                  <span className='ml-2 text-sm text-gray-300'>
                    Remember me
                  </span>
                </label>
                <a
                  href='#'
                  className='text-sm text-blue-400 hover:text-blue-300'
                >
                  Forgot password?
                </a>
              </div>

              {/* Footer Actions */}
              <div className='flex flex-col gap-3 pt-4 border-t border-[#464646]'>
                <Button variant='primary' size='lg' fullWidth>
                  Login
                </Button>
                <Button variant='outline' size='md' fullWidth>
                  Create Account
                </Button>
              </div>
            </div>
          </Card>

          {/* Payment Card */}
          <Card
            title='Payment Information'
            subtitle='Secure payment processing'
            variant='default'
            padding='md'
          >
            <div className='space-y-4'>
              <div>
                <label
                  htmlFor='card-number'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Card Number
                </label>
                <Input
                  id='card-number'
                  placeholder='1234 5678 9012 3456'
                  fullWidth
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='expiry'
                    className='block text-sm font-medium text-gray-300 mb-2'
                  >
                    Expiry Date
                  </label>
                  <Input id='expiry' placeholder='MM/YY' fullWidth />
                </div>
                <div>
                  <label
                    htmlFor='cvv'
                    className='block text-sm font-medium text-gray-300 mb-2'
                  >
                    CVV
                  </label>
                  <Input id='cvv' placeholder='123' fullWidth />
                </div>
              </div>

              <div>
                <label
                  htmlFor='cardholder'
                  className='block text-sm font-medium text-gray-300 mb-2'
                >
                  Cardholder Name
                </label>
                <Input id='cardholder' placeholder='JOHN DOE' fullWidth />
              </div>

              <div className='bg-blue-500/10 border border-blue-500/30 rounded-md p-3'>
                <p className='text-blue-400 text-sm'>
                  🔒 Your payment information is encrypted and secure
                </p>
              </div>

              {/* Footer Actions */}
              <div className='flex gap-3 pt-4 border-t border-[#464646]'>
                <Button variant='outline' size='md' className='flex-1'>
                  Cancel
                </Button>
                <Button variant='primary' size='md' className='flex-1'>
                  Pay $99.99
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
