import * as React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import {RateHistory} from "./RateHistory";

export default function ModalHistory({content, title, openTxt, ...rest}) {

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
            <RateHistory {...rest}/>
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