import { createContext, useContext } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

// Custom hook to use the LoadingContext
export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
