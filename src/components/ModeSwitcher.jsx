
import * as React from 'react'
import {
    IconButton,
    useColorMode
  } from "@chakra-ui/react";

  import { MoonIcon } from '@chakra-ui/icons';

  export default function ModeSwitcher() {
    const { toggleColorMode } = useColorMode()
    
      return(
        <IconButton onClick={toggleColorMode} variant="link" colorScheme="gray" p="5" aria-label='Search database' icon={<MoonIcon />}/>

      )
  }

