import * as React from "react";
import {useEffect, useState} from "react";
import {
  Box,
  SimpleGrid,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue as mode,
  useDisclosure,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from "@chakra-ui/react";

//icons
import {AiOutlineCalculator} from "react-icons/ai";
import {BiStats} from "react-icons/bi";

import {HiLocationMarker} from "react-icons/hi";
// import ModalHistory from "./ModalHistory";
import ModalCalc from "./ModalCalc";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";
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


  const {isOpen, onOpen, onClose} = useDisclosure()
  const {isHistoryOpen, onHistoryOpen, onHistoryClose} = useDisclosure()

  const {url, direction, title, subTitle, toCurrency, fromCurrency} = props;

  const [data, setData] = useState(null)
  const [histData, setHistData] = useState(null)
  const [histUrl, setHistUrl] = useState(null)

  useEffect(() => {
    fetch(`${url}`)
      .then(d => d.json())
      .then(r => {
        setData(r);
      })
      .catch((err) => console.log(err))
  }, [url])

  useEffect(() => {
    fetch(`${histUrl}`)
      .then(d => d.json())
      .then(r => {
        setHistData(r);
      })
      .catch((err) => console.log(err))
  }, [histUrl])

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

  const topCourseBank = direction === 'buy' ? data.filter((item) => new Date(item.date).getDate() === new Date().getDate()).reduce((prev, current) => (prev.rate > current.rate) ? prev : current) : data.filter((item) => new Date(item.date).getDate() === new Date().getDate()).reduce((prev, current) => (prev.rate < current.rate) ? prev : current)

  return (<>

    <Modal isOpen={isHistoryOpen} size={'2xl'} onClose={onHistoryClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          History modal
          {/*<RateHistory {...rest}/>*/}
          {<div>


            <AreaChart
              width={500}
              height={400}
              data={histData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date" interval="preserveStartEnd"/>
              <YAxis/>
              <Tooltip/>
              <Area type="monotone" dataKey="rate" name="Курс (UZS)" stroke="#8884d8" fill="#8884d8"/>
            </AreaChart>


          </div>}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onHistoryClose}>
            Закрыть
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Link onClick={() => {
      onHistoryOpen();
      console.log(12312312)
    }}
          color={'gray.400'}
          fontSize="sm"
          textDecoration="underline">
      История курса
    </Link>
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
                  <Box direction={{base: 'column', md: 'row'}} w='100%' key={bankId}>
                    <Stack direction="row" spacing="5" width="full">
                      <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} rel="noreferrer"
                         target={'_blank'}>
                        <Image
                          rounded="lg"
                          border={'1px'}
                          backgroundColor={'white'}
                          borderColor={'gray.200'}
                          width="100px"
                          height="100px"
                          fit="cover"
                          src={images[name.replaceAll(' ', '').toLowerCase() + '.png']}
                          alt={name}
                          draggable="false"
                          loading="lazy"
                        />
                      </a>
                      <Box>

                        <Stack spacing="0.5">
                          <Text fontWeight="bold">{name} &nbsp;
                            <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} rel="noreferrer"
                               target={'_blank'}>
                              <Icon as={HiLocationMarker} boxSize="4" ml="1"
                                    color={mode('gray.600', 'gray.400')}/>
                            </a></Text>
                          <Text as="span" fontWeight="b">
                            {topCourseBank.rate === rate ? '🔥 ' : null}
                            {direction === 'buy' ? `1 ${toCurrency} > ${rate} ${fromCurrency}` : `${rate} ${fromCurrency} >  1 ${toCurrency}`}
                          </Text>
                          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                            Обновлено {buildDateString(date)}
                          </Text>
                        </Stack>

                        <p>
                          <Icon as={AiOutlineCalculator} color={'gray.400'} boxSize="4" mr="1"/>
                          <ModalCalc content={'Калькулятор для id ' + bankId}
                                     title={'Калькулятор для ' + name}
                                     openTxt={'Калькулятор'}
                                     fromCurrency={fromCurrency}
                                     toCurrency={toCurrency.toLowerCase()}
                                     direction={direction}
                                     id={bankId}
                                     rate={rate}
                          />
                        </p>

                        <p>
                          <Icon color={'gray.400'} as={BiStats} boxSize="4" mr="1"/>

                          <Link onClick={() => {
                            onOpen();
                            setHistUrl(`https://upd.dollaruz.biz/history/rates/${direction}/${toCurrency.toLowerCase()}/${bankId}`)
                          }}
                                color={'gray.400'}
                                fontSize="sm"
                                textDecoration="underline">
                            История курса
                          </Link>
                        </p>
                      </Box>
                    </Stack>
                  </Box>))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Box>
    </>}
  </>)
}