import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id: string;
  name: string;
  level: number;
  xp: number;
  runHistory?: RunLog[];
  rank?: number;
  title?: string;
};

export type RunLog = {
    date: string;
    distance: number; 
    xp: number; 
}

type UserContextType = {
  users: User[];
  activeUserId: string | null;
  setActiveUser: (id: string) => void;
  addUser: (user: User) => void;
  addRunToUser: (userId: string, run: RunLog) => void;
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
      // Välj första användaren som aktiv
      setActiveUserId('kipchoge');
      await AsyncStorage.setItem('activeUserId', 'kipchoge');
    }
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

  const addRunToUser = (userId: string, run: RunLog) => {
  setUsers((prev) =>
    prev.map((user) =>
      user.id === userId
        ? {
            ...user,
            xp: user.xp + run.xp,
            runHistory: [...(user.runHistory || []), run],
          }
        : user
    )
  );
};

  const setActiveUser = (id: string) => {
    setActiveUserId(id);
  };

  return (
    <UserContext.Provider value={{ users, activeUserId, setActiveUser, addUser, addRunToUser }}>
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
