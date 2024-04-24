import { APP_PATHS } from '@/shared/constants/AppPaths';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

interface IAuthForm {
  login: string;
  password: string;
}

export const AuthPage = (): JSX.Element => {
  const [admin, setAdmin] = useState<string | boolean | null>(
    window.localStorage.getItem('admin')
  );
  const [formValues, setFormValues] = useState<IAuthForm>({
    login: '',
    password: '',
  });

  function handleButtonClick() {
    if (formValues.login === 'admin' && formValues.password === 'admin') {
      window.localStorage.setItem('admin', 'true');
      window.location.replace(APP_PATHS.ADMIN);
    }
  }

  return (
    <VStack alignItems={'center'} p={'20px'}>
      <VStack width={'100%'} maxW={'200px'}>
        <FormControl>
          <FormLabel>Логин</FormLabel>
          <Input
            type="email"
            onChange={(e) =>
              setFormValues({ ...formValues, login: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Пароль</FormLabel>
          <Input
            type="password"
            onChange={(e) => {
              setFormValues({ ...formValues, password: e.target.value });
            }}
          />
        </FormControl>
        <Button onClick={handleButtonClick}>Войти</Button>
      </VStack>
    </VStack>
  );
};
