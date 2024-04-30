import { ICategory } from '@/entities/category/model/types';
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useId, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { useAppDispatch, useAppSelector } from '@/shared/utils/hooks';

import { addDrink, updateDrink } from '@/entities/category';
import { useEditDrinkMutation } from '../api/editDrink';
import { IDrink } from '@/entities/drink';
import { MdEdit } from 'react-icons/md';

interface IEditDrinkPopUp {
  drink: IDrink;
}

interface IDrinkForm {
  nameRU: string;
  nameEN: string;
  nameAM: string;
  categoryId: string;
  variant: string[];
  size: ISize[];
}

interface ISize {
  name: string;
  price: number;
}

export const EditDrinkPopUp = (props: IEditDrinkPopUp): JSX.Element => {
  const { drink } = props;
  const formId = useId();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState<IDrinkForm>({
    nameRU: drink.nameRU,
    nameEN: drink.nameEN,
    nameAM: drink.nameAM,
    categoryId: drink.categoryId,
    variant: drink.variant,
    size: drink.size,
  });
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector((state) => state.categoryList);
  const toast = useToast();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [editDrink, { data, isLoading, isError }] = useEditDrinkMutation();

  function handleInputChange(e: any) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function handleVariantChange(values: string[]) {
    setFormValues({ ...formValues, variant: values });
  }

  function handleSizeChange(values: any) {
    const newSizeObj = values.map((sizeName: string) => {
      const existingSize = formValues.size.find(
        (size) => size.name === sizeName
      );
      if (existingSize) {
        return existingSize;
      } else {
        return {
          name: sizeName,
          price: '',
        };
      }
    });

    setFormValues({ ...formValues, size: newSizeObj });
  }

  function handlePriceChange(e: any) {
    const { name, value } = e.target;
    const objIndex = formValues.size.findIndex(
      (size: ISize) => size.name === name
    );
    if (objIndex === -1) return;
    const updateSize = { ...formValues.size[objIndex], price: value };
    const updatedSizeArr = [
      ...formValues.size.slice(0, objIndex),
      updateSize,
      ...formValues.size.slice(objIndex + 1),
    ];

    setFormValues({ ...formValues, size: updatedSizeArr });
  }
  function handleFormValidity() {
    const areInputsFilled = Object.values(formValues).every(
      (value) => value.length > 0
    );
    const arePricesInlcuded = formValues.size.every(
      (item) => item.price.toString().length > 0
    );
    const validityArr = [areInputsFilled, arePricesInlcuded].every(
      (item) => item
    );
    setIsFormValid(validityArr);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    editDrink({ id: drink._id, body: formValues });
  }

  useEffect(() => {
    handleFormValidity();
  }, [formValues]);

  useEffect(() => {
    !isOpen
      ? setFormValues({
          nameRU: drink.nameRU,
          nameEN: drink.nameEN,
          nameAM: drink.nameAM,
          categoryId: drink.categoryId,
          variant: drink.variant,
          size: drink.size,
        })
      : null;
  }, [isOpen]);

  useEffect(() => {
    if (data) {
      onClose();
      dispatch(updateDrink(data));
      // заменить экшен
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
        colorScheme="teal"
        size={'xs'}
        aria-label="Call Sage"
        fontSize="20px"
        icon={<MdEdit />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактировать "{drink.nameRU}"</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as={'form'}
            onSubmit={handleSubmit}
            id={`createDrinkForm${formId}`}
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
            <FormControl isRequired>
              <FormLabel>Категория</FormLabel>
              <Select
                name="categoryId"
                defaultValue={drink.categoryId}
                onChange={handleInputChange}
              >
                {categoryList.map((cat) => (
                  <option key={`catOption-${cat._id}`} value={cat._id}>
                    {cat.nameRU}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired display={'flex'} flexDirection={'column'}>
              <FormLabel as={'div'}>Вариант</FormLabel>
              <CheckboxGroup
                onChange={handleVariantChange}
                defaultValue={drink.variant}
              >
                <Checkbox
                  value={'cold'}
                  colorScheme="teal"
                  id={`coldCheckbox${drink._id}`}
                >
                  Холодный
                </Checkbox>
                <Checkbox
                  value={'hot'}
                  colorScheme="teal"
                  id={`hotCheckbox${drink._id}`}
                >
                  Горячий
                </Checkbox>
              </CheckboxGroup>
            </FormControl>
            <FormControl
              isRequired
              display={'flex'}
              flexDirection={'column'}
              gap={'0.5rem'}
            >
              <FormLabel m={0} as={'div'}>
                Размер
              </FormLabel>
              <CheckboxGroup
                onChange={handleSizeChange}
                defaultValue={drink.size.map((size) => size.name)}
              >
                <ButtonGroup
                  display={'grid'}
                  gridTemplateColumns={'100px 1fr'}
                  maxW={'200px'}
                >
                  <Checkbox
                    colorScheme="teal"
                    value={'regular'}
                    id={`regularCheckbox${drink._id}`}
                  >
                    Обычный
                  </Checkbox>
                  <InputGroup
                    size="sm"
                    colorScheme="teal"
                    w={'100px'}
                    opacity={
                      !formValues.size.some((size) => size.name === 'regular')
                        ? 0.2
                        : 1
                    }
                  >
                    <Input
                      type="number"
                      colorScheme="teal"
                      focusBorderColor="teal.600"
                      name="regular"
                      isDisabled={
                        !formValues.size.some((size) => size.name === 'regular')
                      }
                      onChange={handlePriceChange}
                      value={
                        formValues.size.find((size) => size.name === 'regular')
                          ? formValues.size.find(
                              (size) => size.name === 'regular'
                            )?.price
                          : ''
                      }
                      id={`regularPriceInput${drink._id}`}
                    />
                    <InputRightAddon>֏</InputRightAddon>
                  </InputGroup>
                </ButtonGroup>
                <ButtonGroup
                  display={'grid'}
                  gridTemplateColumns={'100px 1fr'}
                  maxW={'200px'}
                >
                  <Checkbox
                    colorScheme="teal"
                    value={'large'}
                    id={`bigCheckbox${drink._id}`}
                  >
                    Большой
                  </Checkbox>
                  <InputGroup
                    size="sm"
                    colorScheme="teal"
                    w={'100px'}
                    opacity={
                      !formValues.size.some((size) => size.name === 'large')
                        ? 0.2
                        : 1
                    }
                  >
                    <Input
                      type="number"
                      colorScheme="teal"
                      focusBorderColor="teal.600"
                      isDisabled={
                        !formValues.size.some((size) => size.name === 'large')
                      }
                      _disabled={{ opacity: 0.5 }}
                      name="large"
                      value={
                        formValues.size.find((size) => size.name === 'large')
                          ? formValues.size.find(
                              (size) => size.name === 'large'
                            )?.price
                          : ''
                      }
                      onChange={handlePriceChange}
                      id={`largePriceInput${drink._id}`}
                    />
                    <InputRightAddon>֏</InputRightAddon>
                  </InputGroup>
                </ButtonGroup>
              </CheckboxGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              isDisabled={!isFormValid}
              form={`createDrinkForm${formId}`}
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
