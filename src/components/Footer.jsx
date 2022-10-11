import * as React from "react";
import {Link} from 'react-router-dom'
import {
  Box,
  Stack,
  Text,
  ButtonGroup,
  IconButton,
  useColorModeValue as mode
} from "@chakra-ui/react";

import {FaTelegram} from 'react-icons/fa'
import {Logo} from "./Logo";

export default function Footer() {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{base: '4', md: '8'}}>
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">
          <Link to="/"><Logo h="36px" fill={mode('blue.600', 'blue.300')}/></Link>

          {/*<ButtonGroup variant="ghost" color="gray.600">*/}
          {/*  <IconButton as="a" href="//t.me/dollaruzbiz" aria-label="Telegram" icon={*/}
          {/*    <FaTelegram fontSize="20px"/>}/>*/}
          {/*</ButtonGroup>*/}
        </Stack>

        <Text fontSize="sm" alignSelf={{base: 'start', sm: 'start'}}>
          &copy; {new Date().getFullYear()} <a href="//">dollaruz.biz</a>, Coded with ❤️.
        </Text>
      </Stack>
    </Box>
  );
}
