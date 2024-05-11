import { useState, useEffect } from 'react';
//import { socket } from '../../shared/socket/socket';
import { useAppDispatch } from '@/shared/utils/hooks';
// import { ISocketResponse } from '@/entities/todo/models/types';

import { useToast } from '@chakra-ui/react';
import { socket } from '@/app/store/socket-slice';

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const isAdmin =
    window.localStorage.getItem('admin') === 'true' ? true : false;

  const [fooEvents, setFooEvents] = useState<any>([]);
  const dispatch = useAppDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(socket.connect());
    return () => {
      dispatch(socket.disconnect());
    };
  }, []);

  return <>{children}</>;
};

// function onConnect() {
//   setIsConnected(true);
//   console.log(socket.id);
//   if (isAdmin) {
//     socket.emit('joinAdminRoom');
//   }
// }

// function onDisconnect() {
//   setIsConnected(false);
//   toast({
//     title: 'No connection with the server',
//     description: 'Please start the server or try to refresh the page',
//     status: 'error',
//     duration: 9000,
//     isClosable: true,
//     position: 'top-right',
//   });
// }

// function onFooEvent(value: any) {
//   setFooEvents((previous: any) => [...previous, value]);
// }

// socket.on('connect', onConnect);
// socket.on('disconnect', onDisconnect);
// socket.on('foo', onFooEvent);
// socket.on('createdOrders', (data) => console.log(data));

// return () => {
//   socket.off('connect', onConnect);
//   socket.off('disconnect');
//   socket.off('foo', onFooEvent);
//   socket.off('createdOrders');
//   // if (isAdmin) {
//   //   console.log('This user is admin');
//   //   socket.off('createdOrders');
//   // }
// };
