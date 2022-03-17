import * as React from "react";
import {
  Box,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode
} from "@chakra-ui/react";


//icons
import {AiOutlineCalculator} from "react-icons/ai";
import {BiStats} from "react-icons/bi";
import {GrMap} from "react-icons/gr";


const buildDateString = (date) => {
  const time = new Date(date)
  time.setHours(time.getHours() - 3)
  return time.toLocaleString();
}

function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace('./', '')] = r(item);
    return null
  });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));


const CourseListItem = ({direction, topCourseBank, toCurency, fromCurency, onCalcOpen, onHistOpen, date, id, name, rate}) => {

  return (
    <Box direction={{base: 'column', md: 'row'}} w='100%' key={id}>
      <Stack direction="row" spacing="5" width="full">
        <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} rel="noreferrer" target={'_blank'}>
          <Image
            rounded="lg"
            border={'1px'}
            borderColor={'gray.200'}
            width="100px"
            height="100px"
            fit="cover"
            // src={images[name.replaceAll(' ', '').toLowerCase() + '.png']}
            alt={name}
            draggable="false"
            loading="lazy"
          />
        </a>
        <Box>

          <Stack spacing="0.5">
            <Text fontWeight="bold">{name} &nbsp;
              <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} rel="noreferrer" target={'_blank'}><Icon as={GrMap} boxSize="4" ml="1"/></a>
            </Text>
            <Text as="span" fontWeight="b">
              {topCourseBank
                .rate === rate ? '🔥 ' : null}
              {
                direction === 'buy'
                  ? `1 ${toCurency} > ${rate} ${fromCurency}`
                  : `${rate} ${fromCurency} >  1 ${toCurency}`
              }
            </Text>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              Обновлено {buildDateString(date)}
            </Text>

          </Stack>

          <p>
            <Icon as={AiOutlineCalculator} color={'gray.400'} boxSize="4" mr="1"/>
            <Link onClick={onCalcOpen} color={'gray.400'} fontSize="sm" textDecoration="underline">
              Калькулятор
            </Link>
          </p>

          <p>
            <Icon color={'gray.400'} as={BiStats} boxSize="4" mr="1"/>
            <Link onClick={onHistOpen} color={'gray.400'} fontSize="sm" textDecoration="underline">
              История курса
            </Link>
          </p>
        </Box>
      </Stack>
    </Box>
  )
}


export default CourseListItem;