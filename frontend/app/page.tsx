'use client';

import React, { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';
import LoginForm from './components/LoginForm';
import BarChart from './components/charts/BarChart';
import { useAuth } from './services/auth-context';
import { subscribeAPI } from './services/subscribeAPI';
import { trackingAPI, TrackingStats } from './services/trackingAPI';

export const Hero = () => {
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
    <div className='w-full h-96 bg-blue-200 flex flex-col items-center justify-center p-4'>
      {/* Subscriber Counter */}
      <div className='mb-6 text-center'>
        <div className='bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block'>
          <p className='text-blue-800 text-sm font-medium'>
            {isLoadingCount ? (
              'Loading subscribers...'
            ) : (
              <>
                <span className='text-2xl font-bold'>
                  {subscriberCount?.toLocaleString()}
                </span>
                <span className='ml-2'>
                  {subscriberCount === 1 ? 'subscriber' : 'subscribers'} joined
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Subscription Form */}
      <div className='flex flex-col gap-4 w-full max-w-md'>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email address'
          fullWidth
          disabled={isSubmitting}
        />
        <Button
          onClick={handleSubscribe}
          variant='primary'
          size='lg'
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
        {message && (
          <div
            className={`text-sm text-center p-2 rounded ${
              isSuccess
                ? 'text-green-800 bg-green-100 border border-green-200'
                : 'text-red-800 bg-red-100 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [trackingStats, setTrackingStats] = useState<TrackingStats | null>(
    null,
  );
  const [isTrackingLoading, setIsTrackingLoading] = useState(true);

  // Fetch tracking statistics
  useEffect(() => {
    const fetchTrackingStats = async () => {
      try {
        const stats = await trackingAPI.getTrackingStats();
        setTrackingStats(stats);
      } catch (error) {
        console.error('Failed to fetch tracking stats:', error);
      } finally {
        setIsTrackingLoading(false);
      }
    };

    fetchTrackingStats();
  }, []);

  // Handle test button click with tracking
  const handleTestButtonClick = async () => {
    try {
      await trackingAPI.trackButtonClick({
        buttonId: 'test-button-analytics-card',
        buttonText: 'Test Button',
        metadata: {
          variant: 'primary',
          size: 'md',
          page: 'home-analytics',
        },
      });

      console.log('Button click tracked successfully!');

      // Refresh stats after tracking
      try {
        const updatedStats = await trackingAPI.getTrackingStats();
        setTrackingStats(updatedStats);
      } catch (error) {
        console.error('Failed to refresh tracking stats:', error);
      }
    } catch (error) {
      console.error('Failed to track button click:', error);
    }
  };

  return (
    <div className='min-h-screen'>
      <AppBar />
      <Hero />
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card
            title='Component Analytics'
            subtitle='Real-time usage statistics'
            variant='elevated'
            padding='sm'
            className='flex flex-col items-center'
          >
            <BarChart
              data={[
                {
                  label: 'Button',
                  value: trackingStats?.totalCount || 0,
                  color: '#3B82F6',
                },
                { label: 'Input', value: 10, color: '#8B5CF6' },
                { label: 'Modal', value: 8, color: '#10B981' },
                { label: 'Card', value: 30, color: '#F59E0B' },
              ]}
              height={200}
              className='mb-4 w-full'
            />
            <Button variant='primary' size='md' onClick={handleTestButtonClick}>
              Test Button
            </Button>

            {/* Real-time click count */}
            <div className='mt-4 text-center'>
              <p className='text-sm text-gray-600'>
                {isTrackingLoading ? (
                  'Loading clicks...'
                ) : trackingStats ? (
                  <>
                    <span className='font-semibold text-blue-600'>
                      {trackingStats.totalCount}
                    </span>
                    <span className='ml-1'>total clicks tracked</span>
                  </>
                ) : (
                  'Click tracking enabled'
                )}
              </p>
            </div>
          </Card>
          <Card
            title='Features'
            subtitle='Everything you need'
            variant='outlined'
          >
            <ul className='text-gray-700 space-y-2'>
              <li>• Easy to use interface</li>
              <li>• Powerful search functionality</li>
              <li>• Responsive design</li>
              <li>• Modern components</li>
            </ul>
          </Card>
          <Card
            title='Support'
            subtitle='We are here to help'
            variant='default'
          >
            <p className='text-gray-700 mb-4'>
              Need help? Our support team is available 24/7 to assist you.
            </p>
            <Button variant='outline' size='sm' fullWidth>
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className='flex items-center justify-center min-h-screen'>
        <p>Loading...</p>
      </main>
    );
  }

  return <main>{isAuthenticated ? <HomePage /> : <LoginForm />}</main>;
}
