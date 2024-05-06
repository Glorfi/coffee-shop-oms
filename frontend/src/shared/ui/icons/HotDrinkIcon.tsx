import { Icon, IconProps, createIcon } from '@chakra-ui/react';

export const HotDrinkIcon = (props: IconProps): JSX.Element => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        id="Layer_1"
        data-name="Layer 1"
      > */}
      <path
        className="cls-1"
        d="M3.41,10.09H17.73a0,0,0,0,1,0,0v5.25a7.16,7.16,0,0,1-7.16,7.16h0a7.16,7.16,0,0,1-7.16-7.16V10.09A0,0,0,0,1,3.41,10.09Z"
      />
      <path
        className="cls-1"
        d="M17.73,12h1.43a3.35,3.35,0,0,1,3.34,3.34h0a3.34,3.34,0,0,1-3.34,3.34H16.77"
      />
      <line className="cls-1" x1="1.5" y1="22.5" x2="19.64" y2="22.5" />
      <path
        className="cls-1"
        d="M5.32,1.5l-.48,1a2.28,2.28,0,0,0,0,1.91h0a2.28,2.28,0,0,1,0,1.91l-.48,1"
      />
      <path
        className="cls-1"
        d="M11.05,1.5l-.48,1a2.28,2.28,0,0,0,0,1.91h0a2.28,2.28,0,0,1,0,1.91l-.48,1"
      />
      <path
        className="cls-1"
        d="M16.77,1.5l-.47,1a2.21,2.21,0,0,0,0,1.91h0a2.28,2.28,0,0,1,0,1.91l-.48,1"
      />
      {/* </svg> */}
    </Icon>
  );
};
