import * as React from "react";
import {Box, Icon, Image, Link, Stack, Text, useColorModeValue as mode} from "@chakra-ui/react";
import {HiLocationMarker} from "react-icons/hi";
import {AiOutlineCalculator} from "react-icons/ai";
import {BiStats} from "react-icons/bi";

function CourseItem({
                      name,
                      images,
                      toCurrency,
                      fromCurrency,
                      rate,
                      s,
                      topCourseBank,
                      direction,
                      onCalcClick,
                      onHistoryClick
                    }) {

  if (toCurrency === 'USD_ATM') {
    toCurrency = 'USD в банкомате';
  }
  return <Box direction={{base: "column", md: "row"}} w="100%">
    <Stack direction="row" spacing="5" width="full">
      <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} rel="noreferrer"
         target={"_blank"}>
        <Image
          rounded="lg"
          border={"1px"}
          backgroundColor={"white"}
          borderColor={"gray.200"}
          width="100px"
          height="100px"
          fit="cover"
          src={images[name.replaceAll(" ", "").toLowerCase() + ".png"]}
          alt={name}
          draggable="false"
          loading="lazy"
        />
      </a>
      <Box>

        <Stack spacing="0.5">
          <Text fontWeight="bold">{name} &nbsp;
            <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} rel="noreferrer"
               target={"_blank"}>
              <Icon as={HiLocationMarker} boxSize="4" ml="1"
                    color={mode("gray.600", "gray.400")}/>
            </a></Text>
          <Text as="span" fontWeight="b">
            {topCourseBank.rate === rate ? "🔥 " : null}
            {direction === "buy" ? `1 ${toCurrency} > ${rate} ${fromCurrency}` : `${rate} ${fromCurrency} >  1 ${toCurrency}`}
          </Text>
          <Text color={mode("gray.600", "gray.400")} fontSize="sm">
            Обновлено {s}
          </Text>
        </Stack>

        <p>
          <Icon as={AiOutlineCalculator} color={"gray.400"} boxSize="4" mr="1"/>

          <Link onClick={onCalcClick} color={'gray.400'} fontSize="sm" textDecoration="underline">
            Калькулятор
          </Link>

        </p>

        <p>
          <Icon color={"gray.400"} as={BiStats} boxSize="4" mr="1"/>

          <Link onClick={onHistoryClick}
                color={"gray.400"}
                fontSize="sm"
                textDecoration="underline">
            История курса
          </Link>
        </p>
      </Box>
    </Stack>
  </Box>;
}

export default CourseItem;