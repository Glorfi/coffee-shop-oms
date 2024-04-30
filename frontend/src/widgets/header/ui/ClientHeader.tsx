import { SearchIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';

export const ClientHeader = (): JSX.Element => {
  return (
    <HStack w={'100%'} justifyContent={'space-between'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} color={"primary"}>
        Заказать кофе
      </Text>
      <IconButton
        aria-label="Search database"
        icon={<GiHamburgerMenu />}
        size={'md'}
        variant={'ghost'}
        colorScheme="teal"
      />
    </HStack>
  );
};
