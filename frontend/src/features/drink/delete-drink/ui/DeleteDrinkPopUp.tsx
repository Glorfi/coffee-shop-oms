import { ICategory } from '@/entities/category/model/types';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

import { useEffect } from 'react';

import { useAppDispatch } from '@/shared/utils/hooks';

import { useDeleteDrinkMutation } from '../api/deleteDrink';
import { IDrink } from '@/entities/drink';
import { removeDrink } from '@/entities/category';

interface IDeleteDrinkPopUp {
  drink: IDrink;
}

export const DeleteDrinkyPopUp = (props: IDeleteDrinkPopUp): JSX.Element => {
  const { drink } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [deleteDrink, { data, isLoading, isError }] = useDeleteDrinkMutation();

  useEffect(() => {
    if (data) {
      dispatch(removeDrink(data));
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Что-то пошло не так, попробуйте еще раз!',
        status: 'error',
        duration: 9000,
        position: 'top-right',
        isClosable: true,
      });
    }
  }, [isError]);
  return (
    <>
      <IconButton
        variant="ghost"
        size={'xs'}
        colorScheme="red"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<MdDelete />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Удалить напиток "{drink.nameRU}" ?</ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody>
            <Text fontSize={'medium'}>
              Категория удалится со всеми напитками в ней
            </Text>
          </ModalBody> */}
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => deleteDrink(drink._id)}
            >
              Да
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Нет
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
