'use client';

import { useAuth } from '@/app/services/auth-context';
import { useRouter } from 'next/navigation';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.info}>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.email}>{user.email}</p>
      </div>
      <button onClick={handleLogout} className={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
}
