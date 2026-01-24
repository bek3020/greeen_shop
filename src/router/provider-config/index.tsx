import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Modol from '../../components/moodels/Modol';
import { Provider } from 'react-redux';
import { store } from '../../redux';
import { Toaster } from 'react-hot-toast';

const ProviderConfig = ({ children }: { children: React.ReactNode }) => {
    const queryClinemt = new QueryClient();
  return (
      <>
          <Provider store={store }>
          <QueryClientProvider client={queryClinemt}>
              {children}
                  <Modol />
                  <Toaster/>
          </QueryClientProvider>
          </Provider>
      </>
  )
}

export default ProviderConfig