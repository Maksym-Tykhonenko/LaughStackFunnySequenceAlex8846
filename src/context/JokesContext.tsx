import React, {createContext, useContext} from 'react';
import {useJokes} from '../hooks/useJokes';

type JokesContextValue = ReturnType<typeof useJokes>;

const JokesContext = createContext<JokesContextValue | null>(null);

export function JokesProvider({children}: {children: React.ReactNode}) {
  const value = useJokes();
  return (
    <JokesContext.Provider value={value}>{children}</JokesContext.Provider>
  );
}

export function useJokesContext(): JokesContextValue {
  const ctx = useContext(JokesContext);
  if (!ctx) {
    throw new Error('useJokesContext must be used within JokesProvider');
  }
  return ctx;
}
