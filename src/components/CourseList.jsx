import * as React from "react";
import {useEffect, useState} from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  GridItem,
  FormLabel,
  Input,
  Text,
  useMediaQuery
} from "@chakra-ui/react";


//icons

import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
import CourseItem from "./CourseItem"
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";

function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace('./', '')] = r(item);
    return null
  });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

export default function CourseList(props) {

  const {url, direction, title, subTitle, toCurrency, fromCurrency} = props;

  const [leftValue, setLeftValue] = useState(null);
  const [rightValue, setRightValue] = useState(null);
  const [currentRate, setCurrentRate] = useState(null);
  const [currentBankName, setCurrentBankName] = useState(null);

  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const [data, setData] = useState(null)

  const fetchFn = (url, where) => {

    fetch(`${url}`)
      .then(d => d.json())
      .then(r => {
        where(r);
      })
      .catch((err) => console.log(err))
  }

  const fetchHistoryData = (histUrl) => {
    fetchFn(histUrl, setHistData)
  }

  const {isOpen: isHistoryOpen, onOpen: onHistoryOpen, onClose: onHistoryClose} = useDisclosure();
  const {isOpen: isCalcOpen, onOpen: onCalcOpen, onClose: onCalcClose} = useDisclosure();

  const [histData, setHistData] = useState(null)

  useEffect(() => {
    fetchFn(url, setData)
  }, [url])


  const buildDateString = (date) => {
    const time = new Date(date)
    time.setHours(time.getHours() - 3)
    return time.toLocaleString();
  }
// loading
  if (!data) {
    return (<LoadingMessage/>)
  }
// broken
  if (data.length === 0) {
    return <ErrorMessage/>
  }

  const topCourseBank = direction === 'buy' ? data
    .reduce((prev, current) => (prev.rate > current.rate) ? prev : current) : data
    .reduce((prev, current) => (prev.rate < current.rate) ? prev : current)

  return (<>

    <Modal isOpen={isHistoryOpen} size={'2xl'} onClose={onHistoryClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>История курса</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Box pb={30}>График изменения курса</Box>

          {!histData ? <LoadingMessage/> : <AreaChart
            width={500}
            height={400}
            data={histData}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date" interval="preserveStartEnd"/>
            <YAxis/>
            <Tooltip/>
            <Area type="monotone"
                  dataKey="rate"
                  name={`Курс 1 ${toCurrency} = ${fromCurrency}`}
                  stroke="#8884d8"
                  fill="#8884d8"/>
          </AreaChart>}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onHistoryClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    <Modal blockScrollOnMount={false} isOpen={isCalcOpen} onClose={onCalcClose} size='xl'>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Калькулятор валюты для {currentBankName}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Text pb={'20px'} fontWeight={700}>
            {direction === 'buy' ? 'Банк покупает ' : 'Банк продает '}
            {toCurrency} за {currentRate} {direction === 'sell' ? toCurrency : fromCurrency}
          </Text>
          <SimpleGrid columns={isMobile ? '1' : '2'} columnGap={3} rowGap={3} w='full'>
            {/* левый */}
            <GridItem colSpan={1}>
              <FormLabel> У вас есть {direction === 'buy' ? toCurrency : fromCurrency}
                <Input placeholder='Введите цифру'
                       onChange={(event) => {
                         setLeftValue(event.target.value);
                         direction === 'buy'
                           ? setRightValue(event.target.value * currentRate)
                           : setRightValue((event.target.value / currentRate).toFixed(2))
                       }}
                       value={leftValue}
                       type='number'
                       name='toCurrency'/>
              </FormLabel>
            </GridItem>

            {/* правый */}
            <GridItem colSpan={1}>
              <FormLabel> Вы получите {direction === 'sell' ? toCurrency : fromCurrency}
                <Input placeholder='Введите цифру'
                       value={rightValue}
                       type='number'
                       onChange={(event) => {
                         setRightValue(event.target.value);
                         direction === 'buy'
                           ? setLeftValue((event.target.value / currentRate).toFixed(2))
                           : setLeftValue((event.target.value * currentRate).toFixed(2))
                       }}
                       name='fromCurrency'/>
              </FormLabel>
            </GridItem>

          </SimpleGrid>

        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onCalcClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

    {data && <>
      <Box maxW={{base: '3xl', lg: '7xl',}} mx="auto" px={{base: '0', md: '2', lg: '4'}} py={{
        base: '6', md: '8', lg: '12'
      }}>
        <Stack direction={{base: 'column', lg: 'row',}} align={{lg: 'flex-start',}} spacing={{base: '8', md: '16'}}>
          <Stack spacing={{base: '8', md: '10',}} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              {title}
            </Heading>

            <h2>
              {subTitle}
            </h2>

            <SimpleGrid columns={[1, null, 2]} gap={6}>
              {data
                .sort((a, b) => (direction === 'buy' ? parseFloat(b.rate) - parseFloat(a.rate) : parseFloat(a.rate) - parseFloat(b.rate)))
                .map(({name, date, rate, bankId}) => (
                  <CourseItem images={images} key={bankId} name={name} topCourseBank={topCourseBank} rate={rate}
                              direction={direction}
                              toCurrency={toCurrency} fromCurrency={fromCurrency} s={buildDateString(date)}
                              bankId={bankId}
                              onHistoryClick={() => {
                                onHistoryOpen();
                                setHistData(null);
                                fetchHistoryData(`https://api2.dollaruz.biz/history/rates/${direction}/${toCurrency.toLowerCase()}/${bankId}`)
                              }}
                              onCalcClick={() => {
                                onCalcOpen();
                                setCurrentRate(rate);
                                setLeftValue('');
                                setRightValue('');
                                setCurrentBankName(name)
                              }}
                  />))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Box>
    </>}
  </>)
}