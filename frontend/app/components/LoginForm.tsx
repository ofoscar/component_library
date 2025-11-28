'use client';

import { useAuth } from '@/app/services/auth-context';
import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      await login(email, password);
    } catch (err) {
      setLocalError(error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>

      {(localError || error) && (
        <div className={styles.error}>{localError || error}</div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p className={styles.note}>
        Test credentials: test@example.com / password123
      </p>
    </form>
  );
}
