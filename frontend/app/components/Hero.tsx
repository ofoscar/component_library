'use client';

import React, { useEffect } from 'react';
import { subscribeAPI } from '../services/subscribeAPI';
import Button from './Button';
import Input from './Input';

const Hero = () => {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [subscriberCount, setSubscriberCount] = React.useState<number | null>(
    null,
  );
  const [isLoadingCount, setIsLoadingCount] = React.useState(true);

  // Fetch subscriber count on component mount
  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const { count } = await subscribeAPI.getSubscriberCount();
        setSubscriberCount(count);
      } catch (error) {
        console.error('Failed to fetch subscriber count:', error);
        setSubscriberCount(0);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchSubscriberCount();
  }, []);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setMessage('Please enter your email address');
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await subscribeAPI.subscribe({ email });
      setMessage('Successfully subscribed! Thank you for joining us.');
      setIsSuccess(true);
      setEmail('');

      // Refresh subscriber count after successful subscription
      try {
        const { count } = await subscribeAPI.getSubscriberCount();
        setSubscriberCount(count);
      } catch (error) {
        console.error('Failed to refresh subscriber count:', error);
      }
    } catch (error: any) {
      setMessage(error.message || 'Failed to subscribe. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-96 '>
      {/* Subscription Form */}
      <div className='flex flex-col items-center justify-center h-96 p-4 relative w-full'>
        <div className='flex flex-col gap-6 w-full max-w-3xl items-center'>
          <h1 className='text-2xl md:text-5xl font-bold text-center text-white'>
            Receive more information about this component library
          </h1>
          <div className='w-full max-w-sm gap-4 flex flex-col'>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address'
              fullWidth
              startIcon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                >
                  <rect width='24' height='24' fill='none' />
                  <path
                    fill='#d7d7d7'
                    d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z'
                  />
                </svg>
              }
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSubscribe}
              variant='primary'
              size='lg'
              fullWidth
              disabled={isSubmitting}
              className='font-semibold'
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          {message && (
            <div
              className={`text-sm text-center p-2 rounded backdrop-blur-sm ${
                isSuccess
                  ? 'text-green-100 bg-green-900/30 border border-green-500/50'
                  : 'text-red-100 bg-red-900/30 border border-red-500/50'
              }`}
            >
              {message}
            </div>
          )}
        </div>
        <div className='absolute bottom-0 right-0 h-full flex items-end p-4'>
          <div className='bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 cursor-default'>
            {isLoadingCount ? (
              <span className='text-white text-sm'>...</span>
            ) : (
              <>
                <span className='text-white text-lg font-bold'>
                  {subscriberCount?.toLocaleString() || '0'}
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <rect width='24' height='24' fill='none' />
                  <path
                    fill='#D7D7D7'
                    d='M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4'
                  />
                </svg>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
