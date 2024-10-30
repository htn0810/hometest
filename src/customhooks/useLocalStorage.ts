import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get stored value from local storage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update local storage whenever the stored value changes
  useEffect(() => {
    try {
      const valueToStore = storedValue instanceof Function ? storedValue() : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const; // Return the stored value and setter
}

export default useLocalStorage;
