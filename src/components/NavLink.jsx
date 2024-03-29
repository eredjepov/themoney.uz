import {Link, useColorModeValue as mode} from '@chakra-ui/react'
import * as React from 'react'
import {Link as ReachLink} from "react-router-dom";

const DesktopNavLink = React.forwardRef((props, ref) => {
  const {active, ...rest} = props
  return (

    <Link
      as={ReachLink}
      ref={ref}
      display="inline-block"
      px="4"
      py="6"
      fontWeight="semibold"
      aria-current={active ? 'page' : undefined}
      color={mode('gray.600', 'gray.400')}
      transition="all 0.2s"
      {...rest}
      _hover={{
        color: 'gray.500',
      }}
      _active={{
        color: 'blue.600',
      }}
      _activeLink={{
        color: 'blue.600',
        fontWeight: 'bold',
      }}
    />
  )
})
DesktopNavLink.displayName = 'DesktopNavLink'

export const MobileNavLink = (props) => {
  const {active, ...rest} = props
  return (
    <Link
      as={ReachLink}
      aria-current={active ? 'page' : undefined}
      w="full"
      display="flex"
      alignItems="center"
      height="14"
      fontWeight="semibold"
      borderBottomWidth="1px"
      {...rest}
    />
  )
}
export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
}
