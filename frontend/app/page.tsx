'use client';

import Link from 'next/link';
import LoginForm from './components/LoginForm';
import ProductCard from './components/ProductCard';
import UserProfile from './components/UserProfile';
import { useAuth } from './services/auth-context';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main>
        <div className='p-4 flex flex-col items-center'>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className='p-4 flex flex-col items-center'>
        <h1>Welcome</h1>
        {isAuthenticated ? (
          <>
            <UserProfile />
            <div style={{ marginTop: '20px' }}>
              <Link href='/users'>Go to Users</Link>
            </div>
            <ProductCard />
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </main>
  );
}
