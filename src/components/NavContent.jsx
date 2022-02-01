import {
    Box,
    Button,
    Flex,
    HStack,
    useColorModeValue as mode,
    useDisclosure,
} from '@chakra-ui/react'
import * as React from 'react'
import {Logo} from './Logo'
import {NavLink} from './NavLink'
import {NavMenu} from './NavMenu'
import {Submenu} from './Submenu'
import {ToggleButton} from './ToggleButton'
import TelegramIcon from './TelegramIcon'
const links = [
    {
        label: 'Курс доллара',
        href: '/',
    },
    {
        label: 'Курс евро'
    },
    {
        label: 'Курс фунта стерлинга',
    },
    {
        label: 'Курс рубля',
    },
]


const MobileNavContext = (props) => {
    const {isOpen, onToggle} = useDisclosure()
    return (
        <>
            <Flex align="center" justify="space-between" className="nav-content__mobile" {...props}>
                <Box>
                    <ToggleButton isOpen={isOpen} onClick={onToggle}/>
                </Box>
                <Box flexGrow={'1'} as="a" href="/" rel="home" mx="auto">
                    <Logo h="36px"/>
                </Box>
                <Box flexBasis="6rem" visibility={{ base: 'hidden', sm: 'visible'}}>
                    <Button as="a" colorScheme="blue" href="//t.me/dollaruzbiz">
                        Телеграм &nbsp;  <TelegramIcon/>
                    </Button>
                </Box>
            </Flex>
            <NavMenu animate={isOpen ? 'open' : 'closed'}>
                {links.map((link, idx) =>
                    link.children ? (
                        <Submenu.Mobile key={idx} link={link}/>
                    ) : (
                        <NavLink.Mobile key={idx} href={link.href}>
                            {link.label}
                        </NavLink.Mobile>
                    ),
                )}


            </NavMenu>
        </>
    )
}

const DesktopNavContent = (props) => {
    return (
        <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
            <Box as="a" href="/" rel="home">
                <Logo h="36px" iconColor="blue.500"/>
            </Box>

            <HStack as="ul" id="nav__primary-menu" aria-label="Навигация" listStyleType="none">
                {links.map((link, idx) => (
                    <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
                        {link.children ? (
                            <Submenu.Desktop link={link}/>
                        ) : (
                            <NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>
                        )}
                    </Box>
                ))}
            </HStack>
            <HStack spacing="8" minW="240px" justify="flex-end">

                <Button as="a" href="//t.me/dollaruzbiz" colorScheme="blue" fontWeight="bold">
                    Telegram &nbsp;
                    <TelegramIcon/>
                </Button>
            </HStack>
        </Flex>
    )
}

export const NavContent = {
    Mobile: MobileNavContext,
    Desktop: DesktopNavContent,
}