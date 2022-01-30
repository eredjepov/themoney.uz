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
    useColorModeValue as mode
} from "@chakra-ui/react";

//icons
import {AiOutlineCalculator} from "react-icons/ai";
import {BiStats} from "react-icons/bi";
import {GrMap} from "react-icons/gr";


function importAll(r) {
    let images = {};
    r.keys().map((item) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));


export default function CourseList(props) {

    const {url, direction, toCurency, fromCurency, onCalcOpen, onHistOpen} = props;

    const [data, setData] = useState(null)

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
            <Box maxW={{base: '3xl', lg: '7xl',}} mx="auto" px={{base: '4', md: '6', lg: '8',}} py={{
                base: '6',
                md: '8',
                lg: '12',
            }}>
                <div>Жди, я загружаю данные...</div>
            </Box>
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
                <Box maxW={{base: '3xl', lg: '7xl',}} mx="auto" px={{base: '0', md: '2', lg: '4',}} py={{
                    base: '6',
                    md: '8',
                    lg: '12',
                }}>
                    <Stack direction={{base: 'column', lg: 'row',}} align={{lg: 'flex-start',}} spacing={{
                        base: '8',
                        md: '16',
                    }}>
                        <Stack spacing={{base: '8', md: '10',}} flex="2">
                            <Heading fontSize="2xl" fontWeight="extrabold">
                                Курс доллара в Узбекистане в реальном времени
                            </Heading>

                            <h2>
                                {direction === 'buy' ? 'Банк у тебя купит по такому курсу' : 'Банк тебе продаст по такому курсу'}
                            </h2>

                            <SimpleGrid columns={[1, null, 2]} gap={6}>

                                {data.sort((a, b) =>
                                    (
                                        direction === 'buy'
                                            ? parseFloat(b.rate) - parseFloat(a.rate)
                                            : parseFloat(a.rate) - parseFloat(b.rate)
                                    ))
                                    .map(({name, date, rate}, id) => (

                                        <Box direction={{base: 'column', md: 'row'}} w='100%'>
                                            <Stack direction="row" spacing="5" width="full">
                                                <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} target={'_blank'}>
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
                                                            <a href={`https://yandex.uz/maps/10335/tashkent/search/${name}`} target={'_blank'}><Icon as={GrMap} boxSize="4" ml="1"/></a></Text>
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