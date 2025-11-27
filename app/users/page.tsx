import { User, UsersProvider } from '../services/users-provider';
import { UsersList } from './components/UsersList';

const UsersPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });
  const users: User[] = await res.json();
  return (
    <UsersProvider users={users}>
      <div className='p-4 w-full border flex flex-col items-center'>
        <div>UsersPage</div>
        <p>{new Date().toLocaleTimeString()}</p>
        <UsersList />
      </div>
    </UsersProvider>
  );
};

export default UsersPage;
