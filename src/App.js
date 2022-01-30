import './App.css';

import CourseList from "./components/CourseList/CourseList";
import {Helmet} from "react-helmet";

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
    Box,
    Divider,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue as mode,
    // useColorModeValue as mode
} from "@chakra-ui/react";

import appleTouchIcon from './images/fav/apple-touch-icon.png'
import favIcon32 from './images/fav/favicon-32x32.png'
import favIcon16 from './images/fav/favicon-16x16.png'
import safariIcon from './images/fav/safari-pinned-tab.svg'

function App(props) {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const {urls, currencies} = props;

    return (
        <>
            <Helmet>
                <title>Dollaruz.biz курс доллара в Узбекистане сегодня</title>
                <meta
                    name="description"
                    content="Курс доллара онлайн в реальном времени по банкам"
                    data-react-helmet="true"
                />
            </Helmet>

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
                <Tabs isFitted>
                    <Flex direction="column" align="stretch" minH="100vh">
                        <Box bg={mode('gray.50', 'gray.800')} px={{base: '4', md: '8'}} pt="8">
                            <Box maxW="7xl" mx="auto">
                                <Flex justify="space-between" align="flex-start">
                                    <TabList border="0" position="relative" zIndex={1} w={{base: '100%', md: 'auto'}}>
                                        <Tab textAlign={'left'} justifyContent="flex-start" fontWeight="semibold" w={{
                                            base: 'auto',
                                            md: '250px'
                                        }}>Банк покупает</Tab>
                                        <Tab textAlign={'left'} justifyContent={'flex-start'} fontWeight="semibold" w={{
                                            base: 'auto',
                                            md: '250px'
                                        }}>Банк продает</Tab>
                                    </TabList>


                                </Flex>
                            </Box>
                        </Box>
                        <Box pos="relative" zIndex={0}>
                            <Divider borderBottomWidth="2px" opacity={1} borderColor={mode('gray.100', 'gray.700')}/>
                        </Box>
                        <Box flex="1">
                            <Box mx="auto">
                                <TabPanels h="full">
                                    <TabPanel>
                                        <CourseList
                                            title={'Банки покупают'}
                                            toCurency={currencies.master.toUpperCase()}
                                            fromCurency={currencies.slave.toUpperCase()}
                                            url={urls.sell}
                                            onCalcOpen={onOpen}
                                            onHistOpen={onOpen}
                                        />
                                    </TabPanel>
                                    <TabPanel>

                                        <CourseList
                                            title={'Банки продают'}
                                            toCurency={currencies.master.toUpperCase()}
                                            fromCurency={currencies.slave.toUpperCase()}
                                            url={urls.buy}
                                            onCalcOpen={onOpen}
                                            onHistOpen={onOpen}
                                        />

                                    </TabPanel>
                                </TabPanels>
                            </Box>
                        </Box>
                    </Flex>
                </Tabs>

            </main>
        </>
    );
}

export default App;
