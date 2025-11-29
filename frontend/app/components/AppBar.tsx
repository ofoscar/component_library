'use client';

import { useAuth } from '@/app/services/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const AppBar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push('/');
  };

  return (
    <header className='bg-[#0B090A] text-white shadow-md'>
      <div className='px-4 py-4 flex items-center justify-between'>
        <div className='flex flex-row gap-2 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <rect width='24' height='24' fill='none' />
            <path fill='#D7D7D7' d='M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z' />
          </svg>
          <h1 className='text-xl font-bold'>Menu</h1>
        </div>
        <div className='flex flex-row gap-4 items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <rect width='24' height='24' fill='none' />
            <g fill='#D7D7D7'>
              <path d='M12 16a4 4 0 0 0 0-8z' />
              <path
                fillRule='evenodd'
                d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m0 2v4a4 4 0 1 0 0 8v4a8 8 0 1 0 0-16'
                clipRule='evenodd'
              />
            </g>
          </svg>
          {/* User avatar button */}
          <div className='relative' ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity cursor-pointer border border-gray-300'
              aria-label='User menu'
            >
              <img
                src='https://images.unsplash.com/photo-1750535135696-4421c9a90746?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='User avatar'
                className='w-full h-full object-cover'
              />
            </button>

            {/* Floating menu */}
            {isMenuOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
                <div className='px-4 py-2 border-b border-gray-200'>
                  <p className='text-sm font-semibold text-gray-900'>
                    {user?.name}
                  </p>
                  <p className='text-xs text-gray-500'>{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
