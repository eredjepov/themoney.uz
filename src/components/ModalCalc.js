import * as React from 'react';
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
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";

export default function ModalDialog({content, title, openTxt, rate, ...rest}) {


  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
      <Link onClick={onOpen} color={'gray.400'} fontSize="sm" textDecoration="underline">
        {openTxt}
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {content}
            <SimpleGrid columns={3} columnGap={3} rowGap={3} w='full'>

              <GridItem colSpan={1}>
                <FormLabel> USD
                  <Input placeholder='100'/>
                </FormLabel>
              </GridItem>

              <GridItem colSpan={1}>
                <FormLabel> USD
                  <Text>{rate}</Text>
                </FormLabel>
              </GridItem>

              <GridItem colSpan={1}>
                <FormLabel> RUB
                  <Input placeholder='6500'/>
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