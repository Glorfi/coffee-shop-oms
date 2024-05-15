import { useAppSelector } from '@/shared/utils/hooks';
import { setLanguage } from '@/shared/utils/lang-slice';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const LanguageSwitcher = (): JSX.Element => {
  const lang = useAppSelector((state) => state.lang.value);
  const [label, setLabel] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (lang !== 'hy') {
      setLabel(lang.toUpperCase());
    } else {
      setLabel('AM');
    }
  }, [lang]);
  return (
    <Menu >
      <MenuButton
        as={Button}
        size={'sm'}
        variant={'outline'}
        colorScheme="darkGreen"
      >
        {label}
      </MenuButton>
      <MenuList minW={'30px'} zIndex={100}>
        <MenuItem maxW={'100px'} onClick={() => dispatch(setLanguage('hy'))}>
          AM
        </MenuItem>
        <MenuItem maxW={'100px'} onClick={() => dispatch(setLanguage('en'))}>
          EN
        </MenuItem>
        <MenuItem maxW={'100px'} onClick={() => dispatch(setLanguage('ru'))}>
          RU
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
