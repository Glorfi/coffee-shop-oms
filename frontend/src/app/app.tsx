import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ChakraProvider } from '@chakra-ui/react';
import { SocketProvider } from './socket/socket-provider.tsx';
import { theme } from '@/shared/ui/theme.ts';
import { AppRouter } from './config/AppRouter.tsx';
import { AudioNotificationProvider } from '@/shared/utils/AudioNotificationProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <ChakraProvider theme={theme}>
          <AppRouter />
          <AudioNotificationProvider />
        </ChakraProvider>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
