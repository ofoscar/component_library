'use client';
import Link from 'next/link';
import { useUsers } from '../../services/users-provider';

export const UsersList = () => {
  const { users } = useUsers();
  return (
    <div className='border'>
      <ul>
        {users.map((user) => (
          <Link href={`users/${user.id}`} key={user.id}>
            <li>{user.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
