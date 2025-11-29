'use client';

import { useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import Button from './components/Button';
import { ButtonsCard } from './components/ButtonsCard';
import Card from './components/Card';
import BarChart from './components/charts/BarChart';
import PieChart from './components/charts/PieChart';
import RadarChart from './components/charts/RadarChart';
import Footer from './components/Footer';
import Hero from './components/Hero';
import { InputsCard } from './components/InputsCard';
import { ModalsCard } from './components/ModalsCard';
import { Modal } from './components/ui';
import { trackingAPI, TrackingStats } from './services/trackingAPI';

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
    <div className='min-h-screen w-full flex flex-col '>
      <AppBar />
      <Hero />
      <div className='max-w-7xl mx-auto px-4 py-8 w-full '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full '>
          <InputsCard />
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
            <div className='flex flex-col h-full gap-4 items-center flex-1'>
              <div className='w-full h-full flex-1 items-center flex'>
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
              <div className='w-full'>
                <Button
                  variant='primary'
                  size='md'
                  fullWidth
                  onClick={handleTestButtonClick}
                >
                  Send Petition
                </Button>
              </div>
            </div>
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
            <div className='flex flex-col h-full gap-4 items-center '>
              <div className='flex justify-center flex-1'>
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
              <Button fullWidth>Refresh Stats</Button>
            </div>
          </Card>
          <ButtonsCard />

          <ModalsCard onOpenModal={() => setIsModalOpen(true)} />
          <Card
            title='Beautiful Landscape'
            subtitle='Card with image example'
            variant='elevated'
            padding='md'
            image='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
            imageAlt='Mountain landscape'
            imageHeight={200}
          >
            <div>
              <p className='text-sm text-gray-600'>
                This card demonstrates the image feature with a beautiful
                landscape photo. The image automatically adjusts to fill the
                width while maintaining aspect ratio.
              </p>
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
            <div className='rounded-lg p-4'>
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
