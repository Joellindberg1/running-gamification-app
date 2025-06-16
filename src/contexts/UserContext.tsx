import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id: string;
  name: string;
  level: number;
  xp: number;
};

type UserContextType = {
  users: User[];
  activeUserId: string | null;
  setActiveUser: (id: string) => void;
  addUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  // Ladda från AsyncStorage
  useEffect(() => {
    const load = async () => {
      const storedUsers = await AsyncStorage.getItem('users');
      const storedActiveId = await AsyncStorage.getItem('activeUserId');
      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedActiveId) setActiveUserId(storedActiveId);
    };
    load();
  }, []);

  // Spara till AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (activeUserId) {
      AsyncStorage.setItem('activeUserId', activeUserId);
    }
  }, [activeUserId]);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const setActiveUser = (id: string) => {
    setActiveUserId(id);
  };

  return (
    <UserContext.Provider value={{ users, activeUserId, setActiveUser, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
