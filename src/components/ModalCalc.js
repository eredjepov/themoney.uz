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
  useMediaQuery,
} from "@chakra-ui/react";


export default function ModalDialog({ content, title, openTxt, rate, fromCurrency, toCurrency, bankName, direction, ...rest }) {

  const [leftValue, setLeftValue] = useState(null);
  const [rightValue, setRightValue] = useState(null);
  console.log(leftValue)
  console.log(rightValue)
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery('(max-width: 320px)')
  

  return (
    <>
      <Link onClick={onOpen} color={'gray.400'} fontSize="sm" textDecoration="underline">
        {openTxt}
      </Link>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent> {direction}
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <SimpleGrid columns={isMobile ? '1' : '3'} columnGap={3} rowGap={3} w='full'>
            {/* левый */}
            <GridItem colSpan={1}>
                <FormLabel> У вас есть {direction === 'buy' ? toCurrency : fromCurrency}
                  <Input placeholder='900'
                    onChange={(event)=> {
                      setLeftValue(event.target.value); 
                      direction === 'buy' 
                      ? setRightValue(event.target.value * rate) 
                      : setRightValue((event.target.value / rate).toFixed(3))}}
                    value={leftValue}
                    type='number'
                    name='toCurrency' />
                </FormLabel>
              </GridItem>

              <GridItem colSpan={1}>
                <FormLabel> Курс {bankName}
                  <Text p='1'>{rate}</Text>
                </FormLabel>
              </GridItem>

            {/* правый */}
              <GridItem colSpan={1}>
                <FormLabel> Вы получите {direction === 'sell' ? toCurrency : fromCurrency}
                  <Input placeholder='100'
                  value={rightValue}
                    type='number'
                    onChange={(event)=> {setRightValue(event.target.value); 
                      direction === 'buy'
                      ? setLeftValue((event.target.value / rate).toFixed(3))
                      : setLeftValue((event.target.value * rate).toFixed(3))}}
                    name='fromCurrency' />
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