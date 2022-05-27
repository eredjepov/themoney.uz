
import * as React from 'react'
import {
    Button,
    useColorMode
  } from "@chakra-ui/react";

  export default function ModeSwitcher() {
    const { toggleColorMode } = useColorMode()
    
      return(
        <Button onClick={toggleColorMode} variant="link" colorScheme="black" p="5">Switch color mode</Button>
      )
  }

