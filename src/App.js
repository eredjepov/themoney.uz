import './App.css';

import CourseList from "./components/CourseList";
import {Helmet} from "react-helmet";

import * as React from 'react';
import {
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

function App(props) {
  const {urls, title, currencies} = props;

  return (
    <>
      <Helmet>
        <title>Dollaruz.biz курс {title && title[1]} в Узбекистане сегодня</title>
        <meta
          name="description"
          content="Курс  {title && title[1]} онлайн в реальном времени по банкам"
          data-react-helmet="true"
        />
      </Helmet>

      <main className="main-part">

        <Tabs isFitted>
          <Flex direction="column" align="stretch" minH="100vh">
            <Box bg={mode('gray.50', 'gray.800')} px={{base: '4', md: '8'}} pt="8">
              <Box maxW="7xl" mx="auto">
                <Flex justify="space-between" align="flex-start">
                  <TabList border="0" position="relative" zIndex={1} w={{base: '100%', md: 'auto'}}>
                    <Tab textAlign={'left'} justifyContent="flex-start" fontWeight="semibold" w={{
                      base: 'auto',
                      md: '250px'
                    }}>Банк покупает {title && title[0]} </Tab>
                    <Tab textAlign={'left'} justifyContent={'flex-start'} fontWeight="semibold" w={{
                      base: 'auto',
                      md: '250px'
                    }}>Банк продает {title && title[0]} </Tab>
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
                      title={`Курс ${title[1]} в Узбекистане в реальном времени`}
                      subTitle={`Банк у тебя купит ${title[0]} по такому курсу`}
                      toCurrency={currencies.master.toUpperCase()}
                      fromCurrency={currencies.slave.toUpperCase()}
                      direction={'buy'}
                      url={urls.buy}
                    />

                  </TabPanel>
                  <TabPanel>
                    <CourseList
                      title={`Курс ${title[1]} в Узбекистане в реальном времени`}
                      subTitle={`Банк тебе продаст ${title[0]} по такому курсу`}
                      toCurrency={currencies.master.toUpperCase()}
                      fromCurrency={currencies.slave.toUpperCase()}
                      direction={'sell'}
                      url={urls.sell}

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
