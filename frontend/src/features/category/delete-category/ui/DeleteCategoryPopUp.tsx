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
} from '@chakra-ui/react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDeleteCategoryMutation } from '../api/deleteCategory';

interface IEditCategoryPopUp {
  category: ICategory;
}

export const DeleteCategoryPopUp = (props: IEditCategoryPopUp): JSX.Element => {
  const { category } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteCat, { data, isLoading, isError }] = useDeleteCategoryMutation();
  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="red"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<MdDelete />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Удалить категорию "{category.nameRU}" ?
          </ModalHeader>
          <ModalCloseButton />
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
