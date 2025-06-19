// contexts/RunContext.tsx
import React, { createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useUserContext } from './UserContext';
import 'react-native-get-random-values';

export type RunLog = {
  id: string;
  date: string;
  distance: number;
  xp: number;
};

export type User = {
  id: string;
  name: string;
  level: number;
  xp: number;
  runHistory?: RunLog[];
  rank?: number;
  title?: string;
};

type RunContextType = {
  addRunToUser: (userId: string, run: Omit<RunLog, 'id'>) => void;
  editRunForUser: (userId: string, runId: string, updatedRun: Omit<RunLog, 'id'>) => void;
  removeRunFromUser: (userId: string, runId: string) => void;
};

const RunContext = createContext<RunContextType | undefined>(undefined);

export const RunProvider = ({ children }: { children: React.ReactNode }) => {
  const { users, setUsers } = useUserContext();

  const addRunToUser = (userId: string, run: Omit<RunLog, 'id'>) => {
    const runWithId: RunLog = { ...run, id: uuidv4() };
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              xp: user.xp + runWithId.xp,
              runHistory: [...(user.runHistory || []), runWithId],
            }
          : user
      )
    );
  };

  const editRunForUser = (userId: string, runId: string, updatedRun: Omit<RunLog, 'id'>) => {
    setUsers(prev =>
      prev.map(user => {
        if (user.id !== userId) return user;
        const updatedHistory = user.runHistory?.map(run =>
          run.id === runId ? { ...run, ...updatedRun } : run
        ) || [];
        const updatedXP = updatedHistory.reduce((sum, run) => sum + run.xp, 0);
        return { ...user, runHistory: updatedHistory, xp: updatedXP };
      })
    );
  };

  const removeRunFromUser = (userId: string, runId: string) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              runHistory: user.runHistory?.filter(run => run.id !== runId)
            }
          : user
      )
    );
  };

  return (
    <RunContext.Provider value={{ addRunToUser, editRunForUser, removeRunFromUser }}>
      {children}
    </RunContext.Provider>
  );
};

export const useRunContext = () => {
  const context = useContext(RunContext);
  if (!context) throw new Error('useRunContext must be used within a RunProvider');
  return context;
};
