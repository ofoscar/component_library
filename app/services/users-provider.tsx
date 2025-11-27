'use client';

import { createContext, useContext, useState } from 'react';

export interface User {
  id: number;
  name: string;
}

interface UsersContextType {
  name?: string;
  users: User[];
}

const defaultUsersContext: UsersContextType = {
  name: '',
  users: [],
};
const UsersContext = createContext<UsersContextType>(defaultUsersContext);

export const UsersProvider = ({
  children,
  users,
}: {
  children: React.ReactNode;
  users: User[];
}) => {
  const [name, setName] = useState('');

  const value: UsersContextType = {
    name,
    users,
  };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
