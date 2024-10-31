import { useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastContext';
import Toast from '../components/Toast';
import { IToast, ToastType } from '../types/common.type';

type Props = {
  children: React.ReactNode;
};

export const ToastProvider = (props: Props) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const showToast = (type: ToastType, message: string) => {
    const newToast: IToast = { id: Date.now(), type, message };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const hideToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => hideToast(toasts[0].id), 3000); // Show each toast for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {props.children}
      <div className='fixed z-50 top-10 right-2  space-y-2'>
        {toasts &&
          toasts.map((toast) => (
            <Toast
              message={toast.message}
              key={toast.id}
              id={toast.id}
              className={`${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            />
          ))}
      </div>
    </ToastContext.Provider>
  );
};
