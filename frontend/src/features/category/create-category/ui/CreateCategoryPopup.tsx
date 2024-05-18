import { ICategory } from '@/entities/category/model/types';
import {
  Button,
  FormControl,
  FormHelperText,
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
import { ChangeEvent, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';
import { useCreateCategoryMutation } from '../api/createCategory';
import { useAppDispatch } from '@/shared/utils/hooks';
import { addCategory } from '@/entities/category';

interface ICreateCategoryPopUp {
  // category: ICategory;
}

export const CreateCategoryPopUp = (
  props: ICreateCategoryPopUp
): JSX.Element => {
  //  const { category } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({
    nameRU: '',
    nameEN: '',
    nameAM: '',
  });
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [createCat, { data, isLoading, isError }] = useCreateCategoryMutation();

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
    createCat(formValues);
  }

  useEffect(() => {
    handleFormValidity();
  }, [formValues]);

  useEffect(() => {
    if (data) {
      onClose();
      setFormValues({
        nameRU: '',
        nameEN: '',
        nameAM: '',
      });
      dispatch(addCategory(data));
    }
  }, [data]);

  useEffect(() => {
    !isOpen
      ? setFormValues({
          nameRU: '',
          nameEN: '',
          nameAM: '',
        })
      : null;
  }, [isOpen]);

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
      <Button
        variant="solid"
        colorScheme="darkGreen"
        size={'sm'}
        leftIcon={<FaPlus />}
        onClick={onOpen}
      >
        Создать категорию
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создать категорию</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as={'form'}
            onSubmit={handleSubmit}
            id="createCatForm"
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
              form="createCatForm"
              type="submit"
              isLoading={isLoading}
              loadingText={'Загрузка...'}
            >
              Создать
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
