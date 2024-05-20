import { Button } from '@chakra-ui/react';
import NotificationSound from '../ui/notifications/bellring.mp3';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/shared/utils/hooks';

export const AudioNotificationProvider = (): JSX.Element => {
  const audioPlayer = useRef<HTMLAudioElement | null>(null);

  const incomingOrder = useAppSelector(
    (state) => state.socket.orders.incomingOrder
  );

  function playAudio() {
    if (audioPlayer.current) {
      audioPlayer.current.play();
    }
  }

  useEffect(() => {
    incomingOrder ? playAudio() : null;
  }, [incomingOrder]);

  return (
    <>
      <audio ref={audioPlayer} src={NotificationSound}></audio>
    </>
  );
};
