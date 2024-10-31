import { createContext, useContext } from 'react';
import { ToastType } from '../types/common.type';

interface ToastContextProps {
  showToast: (type: ToastType, message: string) => void;
  hideToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
