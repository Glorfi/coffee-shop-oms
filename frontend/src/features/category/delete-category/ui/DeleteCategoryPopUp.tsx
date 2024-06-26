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
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDeleteCategoryMutation } from '../api/deleteCategory';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/shared/utils/hooks';
import { removeCategory } from '@/entities/category';

interface IEditCategoryPopUp {
  category: ICategory;
}

export const DeleteCategoryPopUp = (props: IEditCategoryPopUp): JSX.Element => {
  const { category } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [deleteCat, { data, isLoading, isError }] = useDeleteCategoryMutation();

  useEffect(() => {
    if (data) {
      dispatch(removeCategory(data));
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
        size={'sm'}
        colorScheme="red"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<MdDelete />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Удалить категорию "{category.nameRU}" ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"medium"}>Категория удалится со всеми напитками в ней</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => deleteCat(category._id)}
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
