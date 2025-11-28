'use client';

import Link from 'next/link';
import UserProfile from './UserProfile';

const AppBar = () => {
  return (
    <header className='bg-gray-800 text-white shadow-md'>
      <div className='px-4 py-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Component Library</h1>
        <nav className='flex gap-4 items-center'>
          <Link href='/users' className='hover:text-gray-300 transition-colors'>
            Users
          </Link>
          <UserProfile />
        </nav>
      </div>
    </header>
  );
};

export default AppBar;
