
import * as React from 'react'
import {
    IconButton,
    useColorMode
  } from "@chakra-ui/react";

  export default function ModeSwitcher() {
    const { toggleColorMode } = useColorMode()
    
      return(
        <IconButton onClick={toggleColorMode} variant="link" colorScheme="black" p="5" aria-label='Search database' icon={<MoonIcon />} />

      )
  }

