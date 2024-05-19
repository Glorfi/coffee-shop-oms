import { useAppSelector } from '@/shared/utils/hooks';
import { Text, VStack, Link, Box, HStack } from '@chakra-ui/react';
import { DEVELOPED_BY } from '../model/locolized-titles';

export const Footer = (): JSX.Element => {
  const lang = useAppSelector((state) => state.lang.value);
  return (
    <HStack
      as={'footer'}
      backgroundColor={'whiteAlpha.600'}
      p={'10px'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
      backdropFilter={'blur(2px)'}
      gap={0}
      width={'100%'}
      position={'relative'}
      borderRadius={'10px 10px 0'}
      flexShrink={0}
      //mt={"auto"}
      //zIndex={-1}
    >
      <Text color={'primary'} fontSize={'xs'}>
        © 2024 CoffeShop App
      </Text>
      <Box display="inline-flex">
        <Text color={'primary'} fontSize={'xs'}>
          {`${DEVELOPED_BY[lang]} `}
          <Link
            href="https://github.com/Glorfi"
            target="blank"
            color={'primary'}
            fontSize={'xs'}
          >
            @Glorfi
          </Link>
        </Text>
      </Box>
    </HStack>
  );
};
