import * as React from "react";
import {useEffect, useState} from "react";
import {
    Box,
    SimpleGrid,
    Heading,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    useColorModeValue as mode
} from "@chakra-ui/react";

//icons
import {AiOutlineCalculator} from "react-icons/ai";
import {BiStats} from "react-icons/bi";

//imgs
import image from '../../assets/img/120x120.gif'

export default function CourseList(props) {

    const {buyUrl, sellUrl, direction, toCurency, fromCurency, onCalcOpen, onHistOpen} = props;

    const [data, setData] = useState(null)

    const [url, setUrl] = useState(buyUrl)

    useEffect(() => {
        direction === 'buy'
            ? setUrl(buyUrl)
            : setUrl(sellUrl)
    }, [buyUrl, sellUrl, direction])

    useEffect(() => {
        fetch(`${url}`)
            .then(d => d.json())
            .then(r => setData(r))
            .catch((err) => console.log(err))
    }, [url])

    const buildDateString = (date) => {
        const time = new Date(date)
        time.setHours(time.getHours() - 3)
        return time.toLocaleString();
    }

    if (!data) {
        return (
            <section>
                <div>Жди, я загружаю данные...</div>
            </section>
        )
    }

    if (data.length === 0) {
        return (
            <section>
                <div>Что то пошло не так, попробуй лучше позднее...</div>
            </section>
        )
    }

    const topCourseBank = direction === 'buy'
        ? data.reduce((prev, current) => (prev.rate > current.rate) ? prev : current)
        : data.reduce((prev, current) => (prev.rate < current.rate) ? prev : current)

    return (
        <>
            {data &&
            <>
                <Box
                    maxW={{
                        base: '3xl',
                        lg: '7xl',
                    }}
                    mx="auto"
                    px={{
                        base: '4',
                        md: '8',
                        lg: '12',
                    }}
                    py={{
                        base: '6',
                        md: '8',
                        lg: '12',
                    }}
                >
                    <Stack
                        direction={{
                            base: 'column',
                            lg: 'row',
                        }}
                        align={{
                            lg: 'flex-start',
                        }}
                        spacing={{
                            base: '8',
                            md: '16',
                        }}
                    >
                        <Stack
                            spacing={{
                                base: '8',
                                md: '10',
                            }}
                            flex="2"
                        >
                            <Heading fontSize="2xl" fontWeight="extrabold">
                                Курс доллара в Узбекистане
                            </Heading>

                            <h2>
                                {
                                    direction === 'buy'
                                        ? 'Банк у тебя купит по такому курсу'
                                        : 'Банк тебе продаст по такому курсу'
                                }
                            </h2>

                            <SimpleGrid columns={[1, null, 2]}
                                        gap={6}>
                                {data.sort((a, b) =>
                                    (
                                        direction === 'buy'
                                            ? parseFloat(b.rate) - parseFloat(a.rate)
                                            : parseFloat(a.rate) - parseFloat(b.rate)
                                    ))
                                    .map(({name, date, rate}, id) => (

                                        <Box
                                            direction={{
                                                base: 'column',
                                                md: 'row',

                                            }}
                                            w='100%'
                                        >
                                            <Stack direction="row" spacing="5" width="full">
                                                <Image
                                                    rounded="lg"
                                                    width="100px"
                                                    height="100px"
                                                    fit="cover"
                                                    src={image}
                                                    alt={name}
                                                    draggable="false"
                                                    loading="lazy"
                                                />

                                                <Box>

                                                    <Stack spacing="0.5">
                                                        <Text fontWeight="bold">{name}</Text>
                                                        <Text
                                                            as="span"
                                                            fontWeight="b"
                                                        >
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
                                                        <Link onClick={onHistOpen}  color={'gray.400'} fontSize="sm" textDecoration="underline">
                                                            История курса
                                                        </Link>
                                                    </p>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    ))}
                            </SimpleGrid>
                        </Stack>
                    </Stack>
                </Box>
            </>
            }
        </>
    )
}