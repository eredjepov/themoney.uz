import './App.css';

import CourseList from "./components/CourseList/CourseList";
import {useState} from "react";

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
    useDisclosure,
    useColorModeValue as mode
} from "@chakra-ui/react";

function App(props) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isHistOpen, onHistOpen, onHistClose} = useDisclosure()
    const {urls, currencies} = props;

    const [direction, setDirection] = useState('buy')

    const onSetDirection = (e, d) => {
        e.preventDefault();
        d === 'buy' ? setDirection('buy') : setDirection('sell');
    }

    return (
        <>
            <main className="main-part">

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>В разработке.</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            Данный функционал в разработке
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Закрыть
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <CourseList
                    title={'Банки покупают'}
                    toCurency={currencies.master.toUpperCase()}
                    fromCurency={currencies.slave.toUpperCase()}
                    buyUrl={urls.buy}
                    sellUrl={urls.sell}
                    onSetDirection={onSetDirection}
                    direction={direction}
                    onCalcOpen={onOpen}
                    onHistOpen={onOpen}
                />
            </main>
        </>
    );
}

export default App;
