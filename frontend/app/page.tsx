'use client';

import React from 'react';
import AppBar from './components/AppBar';
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';
import LoginForm from './components/LoginForm';
import { useAuth } from './services/auth-context';

export const Hero = () => {
  const [value, setValue] = React.useState('');

  const handleSearch = () => {
    console.log('Searching for:', value);
    // Add your search logic here
  };

  return (
    <div className='w-full h-96 bg-blue-200 flex items-center justify-center p-4'>
      <div className='flex flex-col gap-4 w-full max-w-md'>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Search...'
          fullWidth
        />
        <Button onClick={handleSearch} variant='primary' size='lg' fullWidth>
          Search
        </Button>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <AppBar />
      <Hero />
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card
            title='Welcome'
            subtitle='Get started with our platform'
            variant='elevated'
            padding='lg'
          >
            <p className='text-gray-700 mb-4'>
              Discover amazing features and tools that will help you achieve
              your goals.
            </p>
            <Button variant='primary' size='md'>
              Get Started
            </Button>
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
