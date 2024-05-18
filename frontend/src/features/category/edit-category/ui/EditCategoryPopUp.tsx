import { updateCategory } from '@/entities/category';
import { ICategory } from '@/entities/category/model/types';
import { useAppDispatch } from '@/shared/utils/hooks';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { useUpdateCategoryMutation } from '../api/editCategory';

interface IEditCategoryPopUp {
  category: ICategory;
}

export const EditCategoryPopUp = (props: IEditCategoryPopUp): JSX.Element => {
  const { category } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({
    nameRU: category.nameRU,
    nameEN: category.nameEN,
    nameAM: category.nameAM,
  });
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [updateCat, { data, isLoading, isError }] = useUpdateCategoryMutation();

  function handleInputChange(e: any) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleFormValidity() {
    const isValid = Object.values(formValues).every(
      (value) => value.trim() !== ''
    );
    setIsFormValid(isValid);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    updateCat({ id: category._id, body: formValues });
  }

  useEffect(() => {
    handleFormValidity();
  }, [formValues]);

  useEffect(() => {
    if (data) {
      onClose();
      setFormValues({
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        nameAM: data.nameAM,
      });
      dispatch(updateCategory(data));
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
        colorScheme="darkGreen"
        size={'sm'}
        aria-label="Call Sage"
        fontSize="20px"
        icon={<MdEdit />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактировать категорию</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as={'form'}
            onSubmit={handleSubmit}
            id="updateCatForm"
            noValidate
          >
            <FormControl isRequired>
              <FormLabel>Название RU</FormLabel>
              <Input
                type="text"
                name="nameRU"
                onChange={handleInputChange}
                value={formValues.nameRU}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Название EN</FormLabel>
              <Input
                type="text"
                name="nameEN"
                onChange={handleInputChange}
                value={formValues.nameEN}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Название AM</FormLabel>
              <Input
                type="text"
                name="nameAM"
                onChange={handleInputChange}
                value={formValues.nameAM}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              isDisabled={!isFormValid}
              form="updateCatForm"
              type="submit"
              isLoading={isLoading}
              loadingText={'Загрузка...'}
            >
              Сохранить
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Отменить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
