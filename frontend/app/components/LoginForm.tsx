'use client';

import { useAuth } from '@/app/services/auth-context';
import { cn } from '@sglara/cn';
import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

      <div className={cn(styles.formGroup, 'min-w-[300px]')}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
          placeholder='mail@example.com'
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
          placeholder='********'
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
        Don't have an account?{' '}
        <a href='/register' className={styles.link}>
          Sign up here
        </a>
      </p>
    </form>
  );
}
