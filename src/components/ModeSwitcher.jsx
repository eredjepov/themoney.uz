
import * as React from 'react'
import {
    IconButton,
    useColorMode
  } from "@chakra-ui/react";

  import { MoonIcon, SunIcon } from '@chakra-ui/icons';

  export default function ModeSwitcher() {
    const { colorMode, toggleColorMode } = useColorMode()
    
      return(
        <IconButton 
        onClick={toggleColorMode} 
        variant="link" 
        colorScheme="gray"
        aria-label='Switch color mode' 
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />

      )
  }

