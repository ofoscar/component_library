'use client';

import React, { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import Button from './components/Button';
import Card from './components/Card';
import BarChart from './components/charts/BarChart';
import PieChart from './components/charts/PieChart';
import RadarChart from './components/charts/RadarChart';
import Footer from './components/Footer';
import Input from './components/Input';
import { Modal } from './components/ui';
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
    <div className='w-full h-96 bg-[#660708]'>
      {/* Subscription Form */}
      <div className='flex flex-col items-center justify-center h-96 p-4 relative w-full'>
        <div className='flex flex-col gap-4 w-full max-w-md'>
          <h1 className='text-2xl font-bold text-center text-white'>
            Receive more information about this component library
          </h1>
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
          <div className='bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2'>
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

export const OpenModalButton = ({
  onClick,
  onTrackingUpdate,
}: {
  onClick: () => void;
  onTrackingUpdate?: () => void;
}) => {
  const handleClick = async () => {
    try {
      // Track the modal open button click
      await trackingAPI.trackButtonClick({
        buttonId: 'modal-open-button',
        buttonText: 'Open Modal',
        metadata: {
          variant: 'outline',
          size: 'sm',
          page: 'home-analytics',
          action: 'modal-click',
        },
      });

      // Update tracking stats after successful tracking
      if (onTrackingUpdate) {
        onTrackingUpdate();
      }
    } catch (error) {
      console.error('Failed to track modal button click:', error);
    }

    // Execute the original onClick handler
    onClick();
  };

  return (
    <Button
      className='border border-transparent'
      variant='outline'
      size='sm'
      onClick={handleClick}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <rect width='24' height='24' fill='none' />
        <path
          fill='#757575'
          d='M4 4V3H3v1zm7.293 8.707a1 1 0 0 0 1.414-1.414zM5 10V4H3v6zM4 5h6V3H4zm-.707-.293l8 8l1.414-1.414l-8-8z'
        />
        <path
          fill='#757575'
          d='M4 20v1H3v-1zm7.293-8.707a1 1 0 0 1 1.414 1.414zM5 14v6H3v-6zm-1 5h6v2H4zm-.707.293l8-8l1.414 1.414l-8 8z'
        />
        <path
          fill='#757575'
          d='M20 4V3h1v1zm-7.293 8.707a1 1 0 0 1-1.414-1.414zM19 10V4h2v6zm1-5h-6V3h6zm.707-.293l-8 8l-1.414-1.414l8-8z'
        />
        <path
          fill='#757575'
          d='M20 20v1h1v-1zm-7.293-8.707a1 1 0 0 0-1.414 1.414zM19 14v6h2v-6zm1 5h-6v2h6zm.707.293l-8-8l-1.414 1.414l8 8z'
        />
      </svg>
    </Button>
  );
};

const HomePage = () => {
  const [trackingStats, setTrackingStats] = useState<TrackingStats | null>(
    null,
  );
  const [isTrackingLoading, setIsTrackingLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      await refreshTrackingStats();
    } catch (error) {
      console.error('Failed to track button click:', error);
    }
  };

  // Refresh tracking stats function
  const refreshTrackingStats = async () => {
    try {
      const updatedStats = await trackingAPI.getTrackingStats();
      setTrackingStats(updatedStats);
    } catch (error) {
      console.error('Failed to refresh tracking stats:', error);
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
            subtitle='Track user interactions'
            variant='elevated'
            padding='sm'
            action={
              <OpenModalButton
                onClick={() => setIsModalOpen(true)}
                onTrackingUpdate={refreshTrackingStats}
              />
            }
          >
            <div className='flex flex-col gap-4 items-center'>
              <div className='w-full'>
                <BarChart
                  data={[
                    {
                      label: 'Button',
                      value: trackingStats?.totalCount || 0,
                      color: '#187DBA',
                    },
                    { label: 'Input', value: 15, color: '#BA181B' },
                    {
                      label: 'Modal',
                      value:
                        trackingStats?.clickCounts?.find(
                          (item) => item._id.buttonId === 'modal-open-button',
                        )?.count || 0,
                      color: '#C8C546',
                    },
                    { label: 'Card', value: 25, color: '#46C86A' },
                  ]}
                  height={200}
                  className='w-full'
                />
              </div>
              <Button
                variant='primary'
                size='md'
                fullWidth
                onClick={handleTestButtonClick}
              >
                Send Petition
              </Button>
            </div>

            {/* Real-time click count */}
            {/* <div className='mt-4 text-center'>
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
            </div> */}
          </Card>
          <Card
            title='Features'
            subtitle='Everything you need'
            variant='outlined'
            className='w-full'
            padding='sm'
          >
            <div className='w-full'>
              <PieChart
                data={[
                  {
                    label: 'Button',
                    value: trackingStats?.totalCount || 0,
                    color: '#3B82F6',
                  },
                  { label: 'Input', value: 15, color: '#8B5CF6' },
                  {
                    label: 'Modal',
                    value:
                      trackingStats?.clickCounts?.find(
                        (item) => item._id.buttonId === 'modal-open-button',
                      )?.count || 0,
                    color: '#10B981',
                  },
                  { label: 'Card', value: 25, color: '#F59E0B' },
                ]}
                size={250}
                className='w-full'
              />
            </div>
          </Card>
          <Card
            title='Radar Chart'
            subtitle='Performance radar view'
            variant='elevated'
            padding='sm'
          >
            <div className='flex justify-center'>
              <RadarChart
                data={[
                  {
                    label: 'Button',
                    value: trackingStats?.totalCount || 0,
                  },
                  { label: 'Input', value: 15 },
                  {
                    label: 'Modal',
                    value:
                      trackingStats?.clickCounts?.find(
                        (item) => item._id.buttonId === 'modal-open-button',
                      )?.count || 0,
                  },
                  { label: 'Card', value: 25 },
                ]}
                size={280}
                className='w-full'
              />
            </div>
          </Card>
          <Card
            title='Buttons'
            subtitle='Interactive button components'
            variant='elevated'
            padding='md'
          >
            <div className='flex flex-col gap-3'>
              <div className='flex flex-wrap gap-2'>
                <Button variant='primary' size='sm'>
                  Primary
                </Button>
                <Button variant='secondary' size='sm'>
                  Secondary
                </Button>
                <Button variant='outline' size='sm'>
                  Outline
                </Button>
                <Button variant='danger' size='sm'>
                  Danger
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button variant='primary' size='md'>
                  Medium
                </Button>
                <Button variant='secondary' size='md'>
                  Medium
                </Button>
              </div>
              <div className='flex gap-2'>
                <Button variant='primary' size='lg' fullWidth>
                  Large Full Width
                </Button>
              </div>
            </div>
          </Card>

          <Card
            title='Inputs'
            subtitle='Form input components'
            variant='outlined'
            padding='md'
          >
            <div className='flex flex-col gap-3'>
              <Input placeholder='Default input' />
              <Input placeholder='Disabled input' disabled />
              <Input
                placeholder='With value'
                value='Sample text'
                onChange={() => {}}
              />
              <Input
                placeholder='Search...'
                startIcon={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <rect width='24' height='24' fill='none' />
                    <path
                      fill='#d7d7d7'
                      d='m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14'
                    />
                  </svg>
                }
                fullWidth
              />
            </div>
          </Card>

          <Card
            title='Modals'
            subtitle='Dialog and overlay components'
            variant='default'
            padding='md'
          >
            <div className='space-y-4'>
              <p className='text-gray-700 text-sm'>
                Modals provide focused interaction surfaces for important
                content and actions.
              </p>
              <div className='flex flex-col gap-2'>
                <Button
                  variant='primary'
                  size='sm'
                  fullWidth
                  onClick={() => setIsModalOpen(true)}
                >
                  Open Analytics Modal
                </Button>
                <Button variant='outline' size='sm' fullWidth>
                  View More Examples
                </Button>
              </div>
              <div className='text-xs text-gray-500 bg-gray-50 p-2 rounded'>
                💡 Click the expand button on cards to see modals in action
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Analytics Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Component Analytics Details'
        size='lg'
        footer={
          <>
            <Button
              variant='outline'
              size='md'
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
            <Button variant='primary' size='md' onClick={handleTestButtonClick}>
              Track Another Click
            </Button>
          </>
        }
      >
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Real-time Usage Statistics
            </h3>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
                <BarChart
                  data={[
                    {
                      label: 'Button',
                      value: trackingStats?.totalCount || 0,
                      color: '#3B82F6',
                    },
                    { label: 'Input', value: 15, color: '#8B5CF6' },
                    {
                      label: 'Modal',
                      value:
                        trackingStats?.clickCounts?.find(
                          (item) => item._id.buttonId === 'modal-open-button',
                        )?.count || 0,
                      color: '#10B981',
                    },
                    { label: 'Card', value: 35, color: '#F59E0B' },
                  ]}
                  height={250}
                  className='w-full'
                />
                <PieChart
                  data={[
                    {
                      label: 'Button',
                      value: trackingStats?.totalCount || 0,
                      color: '#3B82F6',
                    },
                    { label: 'Input', value: 15, color: '#8B5CF6' },
                    {
                      label: 'Modal',
                      value:
                        trackingStats?.clickCounts?.find(
                          (item) => item._id.buttonId === 'modal-open-button',
                        )?.count || 0,
                      color: '#10B981',
                    },
                    { label: 'Card', value: 35, color: '#F59E0B' },
                  ]}
                  size={220}
                  className='w-full'
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-blue-50 rounded-lg p-4'>
              <h4 className='font-semibold text-blue-900 mb-2'>
                Total Interactions
              </h4>
              <p className='text-2xl font-bold text-blue-600'>
                {isTrackingLoading ? '...' : trackingStats?.totalCount || 0}
              </p>
              <p className='text-sm text-blue-700'>Button clicks tracked</p>
            </div>

            <div className='bg-green-50 rounded-lg p-4'>
              <h4 className='font-semibold text-green-900 mb-2'>
                Components Used
              </h4>
              <p className='text-2xl font-bold text-green-600'>4</p>
              <p className='text-sm text-green-700'>Different UI components</p>
            </div>
          </div>

          <div>
            <h4 className='font-semibold text-gray-900 mb-3'>
              Recent Activity
            </h4>
            <div className='space-y-2'>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm text-gray-700'>
                  Button click tracked
                </span>
                <span className='text-xs text-gray-500'>Just now</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm text-gray-700'>Modal opened</span>
                <span className='text-xs text-gray-500'>1 min ago</span>
              </div>
              <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <span className='text-sm text-gray-700'>Page loaded</span>
                <span className='text-xs text-gray-500'>2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Footer />
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
