import * as React from "react";
import {Box, Icon, Image, Link, Stack, Text, useColorModeValue as mode} from "@chakra-ui/react";
import {HiLocationMarker} from "react-icons/hi";
import {AiOutlineCalculator} from "react-icons/ai";
import {BiStats} from "react-icons/bi";

function CourseItem(props) {
  return <Box direction={{base: "column", md: "row"}} w="100%">
    <Stack direction="row" spacing="5" width="full">
      <a href={`https://yandex.uz/maps/10335/tashkent/search/${props.name}`} rel="noreferrer"
         target={"_blank"}>
        <Image
          rounded="lg"
          border={"1px"}
          backgroundColor={"white"}
          borderColor={"gray.200"}
          width="100px"
          height="100px"
          fit="cover"
          src={props.images[props.name.replaceAll(" ", "").toLowerCase() + ".png"]}
          alt={props.name}
          draggable="false"
          loading="lazy"
        />
      </a>
      <Box>

        <Stack spacing="0.5">
          <Text fontWeight="bold">{props.name} &nbsp;
            <a href={`https://yandex.uz/maps/10335/tashkent/search/${props.name}`} rel="noreferrer"
               target={"_blank"}>
              <Icon as={HiLocationMarker} boxSize="4" ml="1"
                    color={mode("gray.600", "gray.400")}/>
            </a></Text>
          <Text as="span" fontWeight="b">
            {props.topCourseBank.rate === props.rate ? "🔥 " : null}
            {props.direction === "buy" ? `1 ${props.toCurrency} > ${props.rate} ${props.fromCurrency}` : `${props.rate} ${props.fromCurrency} >  1 ${props.toCurrency}`}
          </Text>
          <Text color={mode("gray.600", "gray.400")} fontSize="sm">
            Обновлено {props.s}
          </Text>
        </Stack>

        <p>
          <Icon as={AiOutlineCalculator} color={"gray.400"} boxSize="4" mr="1"/>

          <Link onClick={props.onCalcClick} color={'gray.400'} fontSize="sm" textDecoration="underline">
            Калькулятор
          </Link>

        </p>

        <p>
          <Icon color={"gray.400"} as={BiStats} boxSize="4" mr="1"/>

          <Link onClick={props.onHistoryClick}
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