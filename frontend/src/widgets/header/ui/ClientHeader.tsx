import { LanguageSwitcher } from '@/shared/ui/languageSwitcher/LanguageSwitcher';
import { useAppSelector } from '@/shared/utils/hooks';
import { SearchIcon } from '@chakra-ui/icons';
import { ButtonGroup, HStack, IconButton, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HEADER_TITLE } from '../model/locolized-titles';

export const ClientHeader = (): JSX.Element => {
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  const lang = useAppSelector((state) => state.lang.value);
  return (
    <HStack w={'100%'} justifyContent={'space-between'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} color={'primary'}>
        {HEADER_TITLE[lang]}
      </Text>
      <ButtonGroup alignItems={'center'}>
        <LanguageSwitcher />
        <IconButton
          aria-label="Search database"
          icon={<GiHamburgerMenu color="darkGreen.base" />}
          size={'md'}
          variant={'outline'}
          colorScheme="darkGreen"
          border={'none'}
          // onMouseEnter={() => setIsButtonHovered(true)}
          // onMouseLeave={() => setIsButtonHovered(false)}
        />
      </ButtonGroup>
    </HStack>
  );
};
