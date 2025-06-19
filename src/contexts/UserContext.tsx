// contexts/UserContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './RunContext';

type UserContextType = {
  users: User[];
  activeUserId: string | null;
  setActiveUser: (id: string) => void;
  addUser: (user: User) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const storedUsers = await AsyncStorage.getItem('users');
      const storedActiveId = await AsyncStorage.getItem('activeUserId');

      if (storedUsers && JSON.parse(storedUsers).length > 0) {
        setUsers(JSON.parse(storedUsers));
      } else {
        const defaultUsers: User[] = [
          { id: 'kipchoge', name: 'Eliud Kipchoge', level: 1, xp: 0 },
          { id: 'haile', name: 'Haile Gebrselassie', level: 1, xp: 0 },
          { id: 'sifan', name: 'Sifan Hassan', level: 1, xp: 0 },
          { id: 'joel', name: 'Joel Lindberg', level: 1, xp: 0 }
        ];
        setUsers(defaultUsers);
        await AsyncStorage.setItem('users', JSON.stringify(defaultUsers));
      }

      if (storedActiveId) {
        setActiveUserId(storedActiveId);
      } else {
        setActiveUserId('kipchoge');
        await AsyncStorage.setItem('activeUserId', 'kipchoge');
      }
    };

    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (activeUserId) {
      AsyncStorage.setItem('activeUserId', activeUserId);
    }
  }, [activeUserId]);

  const setActiveUser = (id: string) => setActiveUserId(id);
  const addUser = (user: User) => setUsers(prev => [...prev, user]);

  return (
    <UserContext.Provider value={{ users, activeUserId, setActiveUser, addUser, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
export { User };

