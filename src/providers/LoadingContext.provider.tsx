import React, { useState } from 'react'
import { LoadingContext } from '../contexts/LoadingContext'

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const showLoading = () => {
    setIsLoading(true);
  }

  const hideLoading = () => {
    setIsLoading(false);
  }

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
