import * as React from "react";
import {useEffect, useState} from "react";
import {
  Box, SimpleGrid, Heading, Icon, Image, Stack, Text, useColorModeValue as mode
} from "@chakra-ui/react";

//icons
import {AiOutlineCalculator} from "react-icons/ai";
import {BiStats} from "react-icons/bi";
import {GrMap} from "react-icons/gr";
import ModalHistory from "./ModalHistory";
import ModalCalc from "./ModalCalc";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

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

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`${url}`)
      .then(d => d.json())
      .then(r => {
        setData(r);
      })
      .catch((err) => console.log(err))
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

  const topCourseBank = direction === 'buy' ? data.filter((item) => new Date(item.date).getDate() === new Date().getDate()).reduce((prev, current) => (prev.rate > current.rate) ? prev : current) : data.filter((item) => new Date(item.date).getDate() === new Date().getDate()).reduce((prev, current) => (prev.rate < current.rate) ? prev : current)

  return (<>
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

              {data.filter((item) => new Date(item.date).getDate() === new Date().getDate())

                .sort((a, b) => (direction === 'buy' ? parseFloat(b.rate) - parseFloat(a.rate) : parseFloat(a.rate) - parseFloat(b.rate)))

                .map(({name, date, rate}, id) => (new Date(date).getDate() < new Date().getDate() ? 'ololo' :
                  <Box direction={{base: 'column', md: 'row'}} w='100%' key={id}>
                    <Stack direction="row" spacing="5" width="full">
                      <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} rel="noreferrer"
                         target={'_blank'}>
                        <Image
                          rounded="lg"
                          border={'1px'}
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
                               target={'_blank'}><Icon as={GrMap} boxSize="4" ml="1"/></a></Text>
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
                          <ModalCalc content={'Калькулятор для ' + id}
                                     title={'Калькулятор для ' + name}
                                     openTxt={'Калькулятор'}
                                     fromCurrency={fromCurrency}
                                     toCurrency={toCurrency}
                                     direction={direction}
                                     id={id}
                                     rate={rate}
                          />
                        </p>

                        <p>
                          <Icon color={'gray.400'} as={BiStats} boxSize="4" mr="1"/>
                          <ModalHistory content={'История для id ' + id}
                                        title={'История курса для ' + name}
                                        openTxt={'История курса'}
                                        toCurrency={toCurrency.toLowerCase()}
                                        direction={direction}
                                        id={id}
                          />
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