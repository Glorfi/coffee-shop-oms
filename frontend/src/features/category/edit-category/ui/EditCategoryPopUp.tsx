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
import { MdEdit } from 'react-icons/md';

interface IEditCategoryPopUp {
  category: ICategory;
}

export const EditCategoryPopUp = (props: IEditCategoryPopUp): JSX.Element => {
  const { category } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="teal"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<MdEdit />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактировать категорию "{category.nameRU}"</ModalHeader>
          <ModalCloseButton />
          <ModalBody>bla bla</ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Save
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
