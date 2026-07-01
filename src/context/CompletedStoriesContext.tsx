import React, {createContext, useContext} from 'react';
import {useCompletedStories} from '../hooks/useCompletedStories';

type CompletedStoriesContextValue = ReturnType<typeof useCompletedStories>;

const CompletedStoriesContext =
  createContext<CompletedStoriesContextValue | null>(null);

export function CompletedStoriesProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const value = useCompletedStories();
  return (
    <CompletedStoriesContext.Provider value={value}>
      {children}
    </CompletedStoriesContext.Provider>
  );
}

export function useCompletedStoriesContext(): CompletedStoriesContextValue {
  const ctx = useContext(CompletedStoriesContext);
  if (!ctx) {
    throw new Error(
      'useCompletedStoriesContext must be used within CompletedStoriesProvider',
    );
  }
  return ctx;
}
