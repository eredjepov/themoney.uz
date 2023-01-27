import {
  Box,
  // Button,
  Flex,
  HStack,
  useColorModeValue as mode,
  useDisclosure,
} from '@chakra-ui/react'
import * as React from 'react'
import ModeSwitcher from './ModeSwitcher'
import {Logo} from './Logo'
import {NavLink} from './NavLink'
import {NavMenu} from './NavMenu'
import {Submenu} from './Submenu'
import {ToggleButton} from './ToggleButton'
// import TelegramIcon from './TelegramIcon'
import {Link as ReachLink} from "react-router-dom";


const links = [
  {
    label: 'Курс доллара',
    href: '/',
  },
  {
    label: 'Курс доллара ATM',
    href: '/usd_atm',
  },
  {
    label: 'Курс евро',
    href: '/eur',
  },
  {
    label: 'Курс рубля',
    href: '/rub',
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
        <Box flexGrow={'1'} as={ReachLink} to="/" rel="home" mx="auto">
          <Logo h="36px" fill={mode('#262626', '#eaeaea')}/>
        </Box>
        <Box>
          <ModeSwitcher p={'1'}/>
          {/*<Button as="a" colorScheme="blue" href="//t.me/dollaruzbiz">*/}
          {/*  <TelegramIcon/>*/}
          {/*</Button>*/}
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>

        {links.map((link, idx) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link}/>
          ) : (
            <NavLink.Mobile key={idx} to={link.href}>
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
      <Box as={ReachLink} to="/" rel="home">
        <Logo h="36px" fill={mode('#262626', '#eaeaea')}/>
      </Box>

      <HStack as="ul" id="nav__primary-menu" aria-label="Навигация" listStyleType="none">
        {links.map((link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.children ? (
              <Submenu.Desktop link={link}/>
            ) : (
              <NavLink.Desktop to={link.href}>{link.label}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="240px" justify="flex-end">
        <ModeSwitcher p={'5'}/>
        {/*<Button as="a" href="//t.me/dollaruzbiz" colorScheme="blue" fontWeight="bold">*/}
        {/*  <TelegramIcon/>*/}
        {/*</Button>*/}
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
}
