'use client';

import { useAuth } from '@/app/services/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function RegisterForm() {
  const { register, isLoading, error } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validation
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(email, password, name);
      // Redirect to home page after successful registration
      router.push('/');
    } catch (err) {
      setLocalError(error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Create Account</h2>

      {(localError || error) && (
        <div className={styles.error}>{localError || error}</div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          placeholder='Your name'
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder='your@email.com'
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
          placeholder='Min. 6 characters'
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          placeholder='Re-enter password'
          required
        />
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className={styles.submitButton}
      >
        {isLoading ? 'Creating account...' : 'Sign Up'}
      </button>

      <p className={styles.note}>
        Already have an account?{' '}
        <a href='/' className={styles.link}>
          Login here
        </a>
      </p>
    </form>
  );
}
