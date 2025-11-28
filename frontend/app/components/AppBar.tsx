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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className='bg-gray-800 text-white shadow-md'>
      <div className='px-4 py-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Component Library</h1>

        {/* User avatar button */}
        <div className='relative' ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center font-semibold transition-colors cursor-pointer'
            aria-label='User menu'
          >
            {user ? getInitials(user.name) : 'U'}
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
    </header>
  );
};

export default AppBar;
