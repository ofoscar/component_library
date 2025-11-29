'use client';

import { useAuth } from '@/app/services/auth-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const MenuButton = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22px'
      height='22px'
      viewBox='0 0 24 24'
    >
      <rect width='24' height='24' fill='none' />
      <path fill='#D7D7D7' d='M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z' />
    </svg>
  );
};

export const LogoIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28px'
      height='28px'
      viewBox='0 0 24 24'
    >
      <rect width='24' height='24' fill='none' />
      <path
        fill='#C84649'
        d='M14.66 14.18c.03.11.04.22.04.32c.03.65-.26 1.35-.73 1.78c-.22.19-.58.39-.86.47c-.88.31-1.76-.13-2.28-.64c.94-.22 1.49-.9 1.67-1.61c.12-.61-.13-1.12-.23-1.72c-.1-.58-.08-1.07.13-1.6c.15.29.31.59.5.82c.6.78 1.55 1.12 1.76 2.18M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-4.84.56l-.1-.2c-.16-.36-.61-.98-.61-.98c-.18-.23-.4-.44-.6-.64c-.53-.47-1.12-.8-1.63-1.29c-1.17-1.14-1.43-3.01-.68-4.45c-.75.18-1.4.58-1.96 1.03c-2.03 1.62-2.83 4.47-1.87 6.92c.03.08.06.16.06.26c0 .17-.12.32-.27.39c-.19.07-.37.03-.5-.1a.3.3 0 0 1-.13-.13c-.87-1.11-1.03-2.71-.44-3.98c-1.31 1.06-2.02 2.85-1.93 4.53c.06.39.1.78.24 1.17c.11.47.32.91.56 1.35c.84 1.34 2.31 2.31 3.89 2.5c1.68.21 3.48-.09 4.77-1.24c1.44-1.3 1.94-3.37 1.2-5.14'
      />
    </svg>
  );
};

const AppBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    if (isMenuOpen || isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isDrawerOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push('/');
  };

  return (
    <>
      {/* Drawer overlay */}
      {isDrawerOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-40'
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 bg-[#1a1a1a] text-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-6'>
          <div className='flex items-center gap-2 mb-8'>
            <LogoIcon />
            <h2 className='text-xl font-bold'>Menu</h2>
          </div>
          <nav>
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-400 mb-3'>
                UI Components
              </h3>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/components/ui/button'
                    className='block px-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors cursor-pointer'
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Button
                  </Link>
                </li>
                <li>
                  <Link
                    href='/components/ui/input'
                    className='block px-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors cursor-pointer'
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Input
                  </Link>
                </li>
                <li>
                  <Link
                    href='/components/ui/modal'
                    className='block px-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors cursor-pointer'
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Modal
                  </Link>
                </li>
                <li>
                  <Link
                    href='/components/ui/card'
                    className='block px-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors cursor-pointer'
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Card
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <header className='bg-[#0B090A] text-white shadow-md relative z-50'>
        <div className='px-4 py-4 flex items-center justify-between'>
          <div className='flex flex-row gap-2 items-center'>
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className='md:hidden cursor-pointer hover:opacity-80 transition-opacity'
              aria-label='Toggle menu'
            >
              <MenuButton />
            </button>
            <div className='flex flex-row gap-2 items-center cursor-pointer hover:opacity-80 transition-opacity'>
              <Link href='/' aria-label='Go to home'>
                <LogoIcon />
              </Link>
              <h1 className='font-bold text-lg hidden md:flex'>CL</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex flex-row gap-8 items-center'>
            <div className='flex flex-row gap-6 items-center'>
              {/* UI Components Group */}
              <div className='relative group'>
                <button className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
                  UI Components
                </button>
                <div className='absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                  <Link
                    href='/components/ui/button'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Button
                  </Link>
                  <Link
                    href='/components/ui/input'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Input
                  </Link>
                  <Link
                    href='/components/ui/modal'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Modal
                  </Link>
                  <Link
                    href='/components/ui/card'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Card
                  </Link>
                </div>
              </div>

              {/* Charts Group */}
              <div className='relative group'>
                <button className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
                  Charts
                </button>
                <div className='absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                  <Link
                    href='/components/charts/barchart'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Bar Chart
                  </Link>
                  <Link
                    href='/components/charts/piechart'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Pie Chart
                  </Link>
                  <Link
                    href='/components/charts/radarchart'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Radar Chart
                  </Link>
                </div>
              </div>

              {/* Auth Group */}
              <div className='relative group'>
                <button className='text-sm font-medium text-gray-300 hover:text-white transition-colors'>
                  Authorization
                </button>
                <div className='absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
                  <Link
                    href='/login'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Login
                  </Link>
                  <Link
                    href='/register'
                    className='block px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors'
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </nav>

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
            <div className='h-5 w-0.3 border border-gray-300/50' />
            {/* User avatar button */}
            <div className='relative' ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='w-8 h-8 rounded-full overflow-hidden hover:opacity-80 transition-opacity cursor-pointer border border-gray-300 flex items-center justify-center bg-[#1a1a1a]'
                aria-label='User menu'
              >
                {isAuthenticated ? (
                  <img
                    src='https://images.unsplash.com/photo-1750535135696-4421c9a90746?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='User avatar'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#D7D7D7'
                      d='M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z'
                    />
                  </svg>
                )}
              </button>

              {/* Floating menu */}
              {isMenuOpen && (
                <div
                  className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'
                  onClick={(e) => e.stopPropagation()}
                >
                  {isAuthenticated ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          router.push('/login');
                        }}
                        className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer'
                      >
                        Login
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMenuOpen(false);
                          router.push('/register');
                        }}
                        className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer'
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppBar;
