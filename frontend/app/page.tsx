'use client';

import LoginForm from './components/LoginForm';
import ProductCard from './components/ProductCard';
import AppBar from './components/AppBar';
import { useAuth } from './services/auth-context';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <AppBar />
      
      {/* Main Content */}
      <div className='p-4'>
        <ProductCard />
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

  return (
    <main>
      {isAuthenticated ? <HomePage /> : <LoginForm />}
    </main>
  );
}
