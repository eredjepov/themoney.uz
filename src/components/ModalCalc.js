import * as React from 'react';
import { useState } from 'react';

import {
  Button,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Link,
  SimpleGrid,
  GridItem,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";

export default function ModalDialog({ content, title, openTxt, rate, fromCurrency, toCurrency, ...rest }) {

  const [inputValue, setInputValue] = useState(null);
  // const [total, setTotal] = useState(null);
  
  // const result = () => {
  //   toCurrency = (inputValue * {rate}.toFixed(2))
  // }
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Link onClick={onOpen} color={'gray.400'} fontSize="sm" textDecoration="underline">
        {openTxt}
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {content}
            <SimpleGrid columns={3} columnGap={3} rowGap={3} w='full'>

              <GridItem colSpan={1}>
                <FormLabel> {fromCurrency}
                  <Input placeholder='100'
                    type='number'
                    onChange={(event)=> setInputValue(event.target.value)}
                    name='fromCurrency' />
                </FormLabel>
              </GridItem>

              <GridItem colSpan={1}>
                <FormLabel> Курс {fromCurrency}
                  <Text p='2'>{rate}</Text>
                </FormLabel>
              </GridItem>

              <GridItem colSpan={1}>
                <FormLabel> {toCurrency}
                  {/* TODO: не забыть про toFixed(1).  */}

                  <Input placeholder='6500'
                    // value={()=> setTotal(inputValue * {rate}.toFixed(2))}
                    type='number'
                    name='toCurrency' />
                </FormLabel>
              </GridItem>

            </SimpleGrid>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}